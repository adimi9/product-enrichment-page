from pydantic import BaseModel
from typing import Optional, List, Dict, Union


class Attribute(BaseModel):
    """
    Model to represent a product attribute.
    
    Attributes:
        label (str): The name or label of the attribute (e.g., "Weight").
        value (Union[str, List[str]]): The value(s) of the attribute (e.g., "15kg" or ["red", "blue"]).
        type (Optional[str]): The type of the attribute (e.g., "short_text", default is "short_text").
        unit (Optional[str]): The unit for measurement if applicable (e.g., "kg").
        options (Optional[List[str]]): List of options for attributes like "color" (e.g., ["red", "blue"]).
    """
    label: str
    value: Union[str, List[str]]
    type: Optional[str] = "short_text"  # Default type is "short_text"
    unit: Optional[str] = None
    options: Optional[List[str]] = []


class ProductCreate(BaseModel):
    """
    Model to represent the creation of a product.
    
    Attributes:
        product_name (str): The name of the product.
        brand (str): The brand of the product.
        barcode (Optional[str]): The barcode for the product (optional).
        images (Optional[List[str]]): List of image URLs for the product (optional).
        isEnriched (bool): Flag to indicate if the product has enriched data.
        attributes (Dict[str, Attribute]): A dictionary of attributes for the product.
    """
    product_name: str
    brand: str
    barcode: Optional[str] = None
    images: Optional[List[str]] = []
    isEnriched: bool
    attributes: Dict[str, Attribute]  # Key is attribute name (e.g., item_weight)


class ProductUpdate(ProductCreate):
    """
    Model to represent the update of an existing product.
    
    Inherits from ProductCreate but includes the product id for updating.
    
    Attributes:
        id (str): The unique identifier of the product to be updated.
    """
    id: str
