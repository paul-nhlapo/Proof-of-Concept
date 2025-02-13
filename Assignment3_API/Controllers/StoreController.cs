using Assignment3_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Assignment3_Backend.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        private readonly IRepository _repository;

        public StoreController(IRepository repository)
        {
            _repository = repository;
        }
        //Get all the brands 
        [HttpGet("Brands")]
        public async Task<ActionResult<IEnumerable<Brand>>> Brands()
        {
            var brandList = await _repository.GetBrands();
            return Ok(brandList);
        }
        //Get all the product types
        [HttpGet("ProductTypes")]
        public async Task<ActionResult<IEnumerable<ProductType>>> ProductTypes()
        {
            var productTypeList = await _repository.GetProductTypes();
            return Ok(productTypeList);
        }
        //Get Product by id
        [HttpGet("ProductById/{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var singleProduct = await _repository.GetProductById(id);
            //Check if the product is available
            if (singleProduct == null)
            {
                return NotFound();
            }
            //If the product is available, return the product details
            var productDetails = new Product
            {
                ProductId = singleProduct.ProductId,
                Name = singleProduct.Name,
                Description = singleProduct.Description,
                Price = singleProduct.Price,
                Image = singleProduct.Image,
                Brand = new Brand
                {
                    BrandId = singleProduct.Brand.BrandId,
                    Name = singleProduct.Brand.Name,
                    Description = singleProduct.Brand.Description,
                    DateCreated = singleProduct.Brand.DateCreated,
                    DateModified = singleProduct.Brand.DateModified,
                    IsActive = singleProduct.Brand.IsActive,
                    IsDeleted = singleProduct.Brand.IsDeleted,
                },
                ProductType = new ProductType
                {
                    ProductTypeId = singleProduct.ProductType.ProductTypeId,
                    Name = singleProduct.ProductType.Name,
                    Description = singleProduct.ProductType.Description,
                    DateCreated = singleProduct.ProductType.DateCreated,
                    DateModified = singleProduct.ProductType.DateModified,
                    IsActive = singleProduct.ProductType.IsActive,
                    IsDeleted = singleProduct.ProductType.IsDeleted,
                }
            };
            //Return the product details
            return Ok(productDetails);

        }

        //Get all products as a list
        [HttpGet("ProductListing")]
        public async Task<ActionResult<IEnumerable<Product>>> ProductListing()
        {
            //Get all the products
            var productList = await _repository.GetProducts();
            
            var productDetailsList = productList.Select(product => new Product
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Image = product.Image,
                Brand = new Brand
                {
                    BrandId = product.Brand.BrandId,
                    Name = product.Brand.Name,
                    Description = product.Brand.Description,
                    DateCreated = product.Brand.DateCreated,
                    DateModified = product.Brand.DateModified,
                    IsActive = product.Brand.IsActive,
                    IsDeleted = product.Brand.IsDeleted,
                },
                ProductType = new ProductType
                {
                    ProductTypeId = product.ProductType.ProductTypeId,
                    Name = product.ProductType.Name,
                    Description = product.ProductType.Description,
                    DateCreated = product.ProductType.DateCreated,
                    DateModified = product.ProductType.DateModified,
                    IsActive = product.ProductType.IsActive,
                    IsDeleted = product.ProductType.IsDeleted,
                }
            });
            //Return the product details
            return Ok(productDetailsList);

        }

        // Add product a user will add a product using a form on the frontend and we gonna need to upload an image of the product
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductRModel productData)
        {
            try
            {
                // Get the image file
                var imageFile = productData.Picture;

                // Check if the image file is not null
                if (imageFile != null && imageFile.Length > 0)
                {
                    // Get the image folder name
                    var imageFolderName = Path.Combine("wwwroot", "images");

                    // Ensure the directory exists
                    if (!Directory.Exists(imageFolderName))
                    {
                        Directory.CreateDirectory(imageFolderName);
                    }

                    // Get the save path
                    var savePath = Path.Combine(Directory.GetCurrentDirectory(), imageFolderName);

                    // Get the image file name
                    var imageFileName = Path.GetFileName(imageFile.FileName);

                    // Get the full image path
                    var fullImagePath = Path.Combine(savePath, imageFileName);

                    // Get the image path to save in the database
                    var dbImagePath = Path.Combine("images", imageFileName);

                    // Create a new product
                    var newProduct = new Product
                    {
                        Name = productData.Product.name,
                        Description = productData.Product.description,
                        Price = productData.Product.price,
                        Image = dbImagePath,
                        BrandId = productData.Product.brand,
                        ProductTypeId = productData.Product.producttype,
                    };

                    // Add the product to the database
                    await _repository.AddProduct(newProduct);

                    // Copy the image file to the image folder
                    using (var stream = new FileStream(fullImagePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    // Return the newly added product details
                    return Ok(newProduct);
                }
                else
                {
                    return BadRequest("Invalid image file.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (implement logging as needed)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}

