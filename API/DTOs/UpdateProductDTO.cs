using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class UpdateProductDTO
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }

        public IFormFile File { get; set; }

        [Required]
        public string TypeofProduct { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        [Range(0, 200)]
        public int QuantityInStock { get; set; }
    }
}