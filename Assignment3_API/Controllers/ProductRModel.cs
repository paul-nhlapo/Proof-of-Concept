using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Assignment3_Backend.Controllers
{
    public class ProductRModel 
    {
        //This model is going to be used to create a new product
       public IFormFile Picture { get; set; }
        
        public ProductViewModel Product { get; set; }
    }
}
