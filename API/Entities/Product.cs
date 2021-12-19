using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
         public int Rating { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string New_Arrival { get; set; }
        public string TypeofProduct { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
    }
}