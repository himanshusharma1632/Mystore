using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class UserDTO
    {
        public string Name {get; set; }

        public string profilePhotoURL { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}