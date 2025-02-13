export interface Product {
  name: string; // Represents the name of the product
  description: string; // Represents the description of the product
  dateCreated: Date; // Represents the date when the product was created
  dateModified: Date; // Represents the date when the product was last modified
  isActive: boolean; // Indicates whether the product is active or not
  isDeleted: boolean; // Indicates whether the product is deleted or not
  productId: number; // Represents the unique identifier of the product
  price: number; // Represents the price of the product
  image: string; // Represents the image URL of the product
  brandId: number; // Represents the unique identifier of the brand

  productTypeId: number; // Represents the unique identifier of the product type
  productType: { // Represents the product type associated with the product
    name: string; // Represents the name of the product type
    description: string; // Represents the description of the product type
    dateCreated: Date; // Represents the date when the product type was created
    dateModified: Date; // Represents the date when the product type was last modified
    isActive: boolean; // Indicates whether the product type is active or not
    isDeleted: boolean; // Indicates whether the product type is deleted or not
    productTypeId: number; // Represents the unique identifier of the product type
    products: string[]; // Represents an array of product names associated with the product type
  };
  brand: { // Represents the brand associated with the product
    name: string; // Represents the name of the brand
    description: string; // Represents the description of the brand
    dateCreated: Date; // Represents the date when the brand was created
    dateModified: Date; // Represents the date when the brand was last modified
    isActive: boolean; // Indicates whether the brand is active or not
    isDeleted: boolean; // Indicates whether the brand is deleted or not
    brandId: number; // Represents the unique identifier of the brand
    products: string[]; // Represents an array of product names associated with the brand
  };
}
