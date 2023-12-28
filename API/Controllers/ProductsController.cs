using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
               public ProductsController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
                        .Sort(productParams.OrderBy)
                        .Search(productParams.SearchTerm)
                        .Filter(productParams.Brand, productParams.Type)
                        .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber,
             productParams.PageSize);

            Response.HttpResponseParams(products.MetaData);
            return products;
        
        }

        [HttpGet("{id}", Name = "GetProduct")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters() {
        var brandList = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var typeList = await _context.Products.Select(p => p.TypeofProduct).Distinct().ToListAsync();
        return Ok(new {brandList, typeList});
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateNewProduct (CreateProductDTO productDTO)
        {
            // traditional method of mapping entities
            var product = new Product {
             Name = productDTO.Name,
             Description = productDTO.Description,
             Price = productDTO.Price,
             TypeofProduct = productDTO.TypeofProduct,
             Brand = productDTO.Brand,
             PictureUrl = "picture-url not dealt as far as now!",
             QuantityInStock = productDTO.QuantityInStock
            };

            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);
            return BadRequest(new ProblemDetails { Title = "Failed to Add Product to the Database" });
        }
    }
}