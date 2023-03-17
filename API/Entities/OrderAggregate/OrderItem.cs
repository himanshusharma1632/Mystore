namespace API.Entities.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        public ProductItemOrdered ProductItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
        public string Brand { get; set; }
        public string TypeofProduct { get; set; }
    }
}