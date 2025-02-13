using Microsoft.EntityFrameworkCore;

namespace Assignment3_Backend.Models
{
    public class Repository:IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
            _appDbContext.SaveChanges();
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _appDbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductType)
                .ToListAsync();
        }


        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _appDbContext.Brands.ToListAsync();
        }

        public async Task<object> GenerateProductReportAsync()
        {
            var productCountByBrand = await _appDbContext.Products
                .Include(product => product.Brand)
                .GroupBy(product => product.Brand.Name)
                .Select(g => new
                {
                    Brand = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var productCountByType = await _appDbContext.Products
                .Include(p => p.ProductType)
                .GroupBy(p => p.ProductType.Name)
                .Select(g => new
                {
                    ProductType = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var activeProducts = await _appDbContext.Products
                .Where(p => p.IsActive == true)
                .CountAsync();

            return new {
                productCountByBrand,
                productCountByType,
                activeProducts
            };
            
        }

        

        public async Task<IEnumerable<ProductType>> GetProductTypes()
        {
            return await _appDbContext.ProductTypes.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
           var product = await _appDbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductType)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if(product == null)
            {
                throw new ApplicationException("Product not found");
            }
            return product;

        }

        public async Task<Product> AddProduct(Product product)
        {
            var brand = await _appDbContext.Brands.FirstOrDefaultAsync(b => b.BrandId == product.BrandId);
            var productType = await _appDbContext.ProductTypes.FirstOrDefaultAsync(pt => pt.ProductTypeId == product.ProductTypeId);

            if(brand == null || productType == null)
            {
                throw new ApplicationException("Brand or ProductType not found");
            }

            product.Brand = brand;
            product.ProductType = productType;

            _appDbContext.Products.Add(product);
            await _appDbContext.SaveChangesAsync();

            return product;
        }
    }
}
