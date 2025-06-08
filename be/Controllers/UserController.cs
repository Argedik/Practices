using Microsoft.AspNetCore.Mvc;
using be.Models;
using be.Services;

namespace be.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserDataService _userService;
    private readonly ILogger<UserController> _logger;

    public UserController(UserDataService userService, ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    // Tüm kullanıcıları getir
    [HttpGet]
    public async Task<ActionResult<List<UserModel>>> GetUsers()
    {
        try
        {
            var users = await _userService.GetUsersAsync();
            return Ok(new { success = true, data = users });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting users");
            return StatusCode(500, new { success = false, error = "Internal server error" });
        }
    }

    // Yeni kullanıcı ekle
    [HttpPost]
    public async Task<ActionResult<UserModel>> AddUser([FromBody] CreateUserRequest request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { success = false, error = "Ad ve email zorunludur" });
            }

            var user = new UserModel
            {
                Name = request.Name,
                Email = request.Email,
                Age = request.Age,
                City = request.City
            };

            var addedUser = await _userService.AddUserAsync(user);
            
            if (addedUser != null)
            {
                return Ok(new { success = true, message = "Kullanıcı başarıyla eklendi", data = addedUser });
            }
            
            return BadRequest(new { success = false, error = "Kullanıcı eklenirken hata oluştu" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding user");
            return StatusCode(500, new { success = false, error = "Internal server error" });
        }
    }

    // Kullanıcıyı güncelle
    [HttpPut]
    public async Task<ActionResult> UpdateUser([FromBody] UserModel user)
    {
        try
        {
            var success = await _userService.UpdateUserAsync(user);
            
            if (success)
            {
                return Ok(new { success = true, message = "Kullanıcı başarıyla güncellendi" });
            }
            
            return NotFound(new { success = false, error = "Kullanıcı bulunamadı" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user with id {UserId}", user.Id);
            return StatusCode(500, new { success = false, error = "Internal server error" });
        }
    }

    // Kullanıcıyı sil
    [HttpDelete]
    public async Task<ActionResult> DeleteUser([FromQuery] int id)
    {
        try
        {
            var success = await _userService.DeleteUserAsync(id);
            
            if (success)
            {
                return Ok(new { success = true, message = "Kullanıcı başarıyla silindi" });
            }
            
            return NotFound(new { success = false, error = "Kullanıcı bulunamadı" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user with id {UserId}", id);
            return StatusCode(500, new { success = false, error = "Internal server error" });
        }
    }
}

public class CreateUserRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Age { get; set; }
    public string City { get; set; } = string.Empty;
} 