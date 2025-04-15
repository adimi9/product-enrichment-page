from fastapi import APIRouter, Depends, HTTPException, Body
from app.models.product_model import ProductCreate, ProductUpdate
from app.core.auth import get_current_user
from app.core.database import products_collection
from bson import ObjectId
from pydantic import BaseModel
from .ai_enrichment.AttributeEnricher import AttributeEnricher
from fastapi.responses import JSONResponse

router = APIRouter()

class DeleteProductsRequest(BaseModel):
    """
    Pydantic model for handling product deletion requests.
    """
    ids: list[str]

class EnrichProductsRequest(BaseModel):
    """
    Pydantic model for handling product enrichment requests.
    Accepts a list of full Product objects to be enriched.
    """
    products: list[ProductUpdate]

@router.post("/products/")
async def create_product(
    product: ProductCreate, 
    user: dict = Depends(get_current_user)
):
    """
    Endpoint to create a new product.

    Args:
        product (ProductCreate): Product data to be inserted.
        user (dict): The current authenticated user.

    Returns:
        JSONResponse: A response containing a success message and the product ID.
    """
    product_dict = product.model_dump()
    product_dict["user_id"] = user["sub"]

    result = await products_collection.insert_one(product_dict)
    if result.inserted_id:
        return {"message": "Product created", "id": str(result.inserted_id)}
    
    raise HTTPException(status_code=500, detail="Failed to create product")

@router.get("/products/")
async def get_products(user: dict = Depends(get_current_user)):
    """
    Endpoint to get all products for the authenticated user.

    Args:
        user (dict): The current authenticated user.

    Returns:
        list: A list of products associated with the user.
    """
    products_cursor = products_collection.find({"user_id": user["sub"]})
    products = []
    async for product in products_cursor:
        product["id"] = str(product["_id"])  # Convert ObjectId to string for JSON
        del product["_id"]  # Optional: remove _id if not needed
        products.append(product)

    return products

@router.delete("/products/bulk-delete")
async def delete_products(
    ids: DeleteProductsRequest, 
    user: dict = Depends(get_current_user)
):
    """
    Endpoint to delete products in bulk by their IDs.

    Args:
        ids (DeleteProductsRequest): A list of product IDs to be deleted.
        user (dict): The current authenticated user.

    Returns:
        JSONResponse: A response containing the number of deleted products.
    """
    object_ids = [ObjectId(id) for id in ids.ids]

    result = await products_collection.delete_many({
        "_id": {"$in": object_ids},
        "user_id": user["sub"]  # ensures users can only delete their own products
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No products found to delete")

    return {"message": f"Deleted {result.deleted_count} product(s)"}

@router.put("/products/enrich")
async def enrich_products(
    enrich_request: EnrichProductsRequest, 
    user: dict = Depends(get_current_user)
):
    """
    Endpoint to enrich product attributes using AI-based enrichment.

    Args:
        enrich_request (EnrichProductsRequest): A list of products to be enriched.
        user (dict): The current authenticated user.

    Returns:
        JSONResponse: A response containing a success message and the enriched results.
    """
    enriched_results = []

    # Process each product for enrichment
    for product in enrich_request.products:
        product_dict = product.model_dump()

        try:
            # Initialize AttributeEnricher to enrich product attributes
            enricher = AttributeEnricher(product_dict)
            enriched = enricher.enrich_attributes()

            # Filter out attributes that are "Not Found" and prepare update dictionary
            update_dict = {}

            for key, value in enriched.items():
                if value != "Not Found":  # Skip attributes with "Not Found"
                    update_dict[f"attributes.{key}.value"] = value

            # Add the "isEnriched" field to indicate successful enrichment
            update_dict["isEnriched"] = True

            # MongoDB update query
            result = await products_collection.update_one(
                {
                    "_id": ObjectId(product.id),
                    "user_id": user["sub"]  # Ensure users can only enrich their own products
                },
                {"$set": update_dict}  # Update individual attribute values
            )

            if result.modified_count == 0:
                print(f"Error: No product found with ID {product.id}")
            else:
                print(f"Product {product.id} enriched and updated successfully.")

        except Exception as e:
            print(f"Error enriching product {product_dict.get('id')}: {e}")
            enriched_results.append({
                "product_id": product_dict.get("id"),
                "error": str(e)
            })

    # Return enriched results along with success message
    return JSONResponse(content={
        "message": f"Enriched {len(enriched_results)} product(s)",
        "enriched_results": enriched_results
    })
