using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly IWebHostEnvironment _fileEnv;
        public AccountController(UserManager<User> userManager, TokenService tokenService, 
        IWebHostEnvironment fileEnv)
        {
            _fileEnv = fileEnv;
            _tokenService = tokenService;
            _userManager = userManager;  
        }

//for login
[HttpPost("login")]
public async Task<ActionResult<UserDTO>> LoginUser(LoginDTO loginDTO)
{
var user = await _userManager.FindByNameAsync(loginDTO.userName);
if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password)) {
return Unauthorized(new ProblemDetails{
    Title = "Unauthorized",
    Status = 401,
    Detail = "Your Username or Password is incorrect! Please try again..."
});
}

return new UserDTO {
Email = user.Email,
Token = await _tokenService.GenerateToken(user),
Name = user.Name,
profilePhotoURL = user.profilePhotoURL,
};
}

//for register
[HttpPost("register"), DisableRequestSizeLimit]
public async Task<IActionResult> RegisterUser([FromForm]RegisterDTO registerDTO)
{
//getting the file from request
//var postedProfile = Request.Form.Files[0];
//setting the Uploads folder
//var Uploads = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
 /*if (postedProfile.Length > 0){
    var fileName = ContentDispositionHeaderValue.Parse(postedProfile.ContentDisposition).FileName;
    var pathToSave = Path.Combine(Uploads, fileName.ToString());
    using(var fileStream = new FileStream(pathToSave, FileMode.Create)){
       await postedProfile.CopyToAsync(fileStream);
    }*/
//var uploadedProfile = await SaveProfile(registerDTO.profilePhotoURL);
var registeredUser = new User{
    UserName = registerDTO.userName,
    Email = registerDTO.Email,
    Name = registerDTO.Name,
    profilePhotoURL = await SaveProfile(registerDTO.profilePhotoURL),
    PhoneNumber = registerDTO.PhoneNumber,
};

var result = await _userManager.CreateAsync(registeredUser, registerDTO.Password);
if (!result.Succeeded) {
    foreach(var Error in result.Errors)
    {
        ModelState.AddModelError(Error.Code, Error.Description);
    }
    return ValidationProblem();
}

await _userManager.AddToRoleAsync(registeredUser, "Member");
return StatusCode(201);
//return Ok($"Saved file {await SaveProfile(registerDTO.profilePhotoURL)} into the Server. Thank You!!");
//}
/*else {
    return BadRequest(new ProblemDetails{
        Title = "400 - Bad Request",
        Status = 400,
        Detail = "File not Uploaded"
            });
}*/
//return StatusCode(201);
}

[Authorize]
[HttpGet("currentUser")]
public async Task<ActionResult<UserDTO>> GetCurrentUser() {
var user = await _userManager.FindByNameAsync(User.Identity.Name);

return new UserDTO{
    Email = user.Email,
    Token = await _tokenService.GenerateToken(user),
    Name = user.Name,
    profilePhotoURL = user.profilePhotoURL,
 };
}

//seperate method for SavingProfile Image to Server [Attribute:  NonAction]
[NonAction]
public  async Task<string> SaveProfile(IFormFile imageFile){
string fileName = null;
if (imageFile != null) {
    string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
    //this is encoded file
    fileName = Guid.NewGuid().ToString() + "_" + imageFile;
    string filePATH = Path.Combine(uploadsFolder, fileName);
    using(var fileStream = new FileStream(filePATH, FileMode.Create)){
        await imageFile.CopyToAsync(fileStream);
    }}  
return fileName;
}


 }
}