using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extentions;
using API.RequestHelpers;
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

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters() {
        var brandList = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var typeList = await _context.Products.Select(p => p.TypeofProduct).Distinct().ToListAsync();
        return Ok(new {brandList, typeList});
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}