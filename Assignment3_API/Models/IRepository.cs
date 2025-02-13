namespace Assignment3_Backend.Models
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();

        Task<object> GenerateProductReportAsync();


        void Add<T>(T entity) where T : class;

        Task<IEnumerable<Product>> GetProducts();

        Task<IEnumerable<Brand>> GetBrands();

        Task<IEnumerable<ProductType>> GetProductTypes();


        Task<Product> GetProductById(int id);

        Task<Product> AddProduct(Product product);
    }
}
