using System.Linq;
using API.DTOs;
using API.Entities;

namespace API.Extentions
{
    public static class BasketExtention
    {
        public static BasketDto BasketDTOGetter (this Basket basket)
        {
            return new BasketDto
                {
                    Id = basket.Id,
                    BuyerId = basket.BuyerId,
                    Items = basket.Items.Select(item => new BasketItemDto
                    {
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        Name = item.Product.Name,
                        Brand = item.Product.Brand,
                        Type = item.Product.TypeofProduct,
                        Price= item.Product.Price,
                        PictureUrl = item.Product.PictureUrl,
                    }).ToList()
                };
        }
    }
}