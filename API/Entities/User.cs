using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
    }
}