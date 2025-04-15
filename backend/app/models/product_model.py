from pydantic import BaseModel
from typing import Optional, List, Dict, Union


class Attribute(BaseModel):
    label: str
    value: Union[str, List[str]]
    type: Optional[str] = "short_text"  # Default type as "text"
    unit: Optional[str] = None
    options: Optional[List[str]] = []


class ProductCreate(BaseModel):
    product_name: str
    brand: str
    barcode: Optional[str] = None
    images: Optional[List[str]] = []
    isEnriched: bool
    attributes: Dict[str, Attribute]  # Use a dictionary where the key is the attribute name (e.g., item_weight)

class ProductCreate(BaseModel):
    product_name: str
    brand: str
    barcode: Optional[str] = None
    images: Optional[List[str]] = []
    isEnriched: bool
    attributes: Dict[str, Attribute]  # Use a dictionary where the key is the attribute name (e.g., item_weight)

class ProductUpdate(BaseModel):
    id: str
    product_name: str
    brand: str
    barcode: Optional[str] = None
    images: Optional[List[str]] = []
    isEnriched: bool
    attributes: Dict[str, Attribute]  # Use a dictionary where the key is the attribute name (e.g., item_weight)