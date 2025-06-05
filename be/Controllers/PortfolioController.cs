using Microsoft.AspNetCore.Mvc;
using be.Models;
using be.Services;

namespace be.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly PortfolioDataService _dataService;
    private readonly ILogger<PortfolioController> _logger;

    public PortfolioController(PortfolioDataService dataService, ILogger<PortfolioController> logger)
    {
        _dataService = dataService;
        _logger = logger;
    }

    // Tüm portfolio verilerini getir
    [HttpGet]
    public async Task<ActionResult<PortfolioContent>> GetPortfolioData()
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting portfolio data");
            return StatusCode(500, "Internal server error");
        }
    }

    // Kişisel bilgileri güncelle
    [HttpPut("personal")]
    public async Task<ActionResult> UpdatePersonalInfo([FromBody] PersonalInfo personalInfo)
    {
        try
        {
            var success = await _dataService.UpdatePersonalInfoAsync(personalInfo);
            
            if (success)
            {
                return Ok(new { message = "Kişisel bilgiler başarıyla güncellendi" });
            }
            
            return BadRequest("Güncellenirken hata oluştu");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating personal info");
            return StatusCode(500, "Internal server error");
        }
    }

    // Kişisel bilgileri getir
    [HttpGet("personal")]
    public async Task<ActionResult<PersonalInfo>> GetPersonalInfo()
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            return Ok(data.Personal);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting personal info");
            return StatusCode(500, "Internal server error");
        }
    }

    // Hakkımda bölümünü güncelle
    [HttpPut("about")]
    public async Task<ActionResult> UpdateAboutMe([FromBody] AboutMe aboutMe)
    {
        try
        {
            var success = await _dataService.UpdateAboutMeAsync(aboutMe);
            
            if (success)
            {
                return Ok(new { message = "Hakkımda bölümü başarıyla güncellendi" });
            }
            
            return BadRequest("Güncellenirken hata oluştu");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating about me");
            return StatusCode(500, "Internal server error");
        }
    }

    // Hakkımda bilgilerini getir
    [HttpGet("about")]
    public async Task<ActionResult<AboutMe>> GetAboutMe()
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            return Ok(data.About);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting about me");
            return StatusCode(500, "Internal server error");
        }
    }

    // Tüm projeleri getir
    [HttpGet("projects")]
    public async Task<ActionResult<List<Project>>> GetProjects()
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            return Ok(data.Projects);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting projects");
            return StatusCode(500, "Internal server error");
        }
    }

    // Yeni proje ekle
    [HttpPost("projects")]
    public async Task<ActionResult<Project>> AddProject([FromBody] Project project)
    {
        try
        {
            var addedProject = await _dataService.AddProjectAsync(project);
            
            if (addedProject != null)
            {
                return CreatedAtAction(nameof(GetProjects), new { id = addedProject.Id }, addedProject);
            }
            
            return BadRequest("Proje eklenirken hata oluştu");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding project");
            return StatusCode(500, "Internal server error");
        }
    }

    // Projeyi güncelle
    [HttpPut("projects/{id}")]
    public async Task<ActionResult> UpdateProject(int id, [FromBody] Project project)
    {
        try
        {
            var success = await _dataService.UpdateProjectAsync(id, project);
            
            if (success)
            {
                return Ok(new { message = "Proje başarıyla güncellendi" });
            }
            
            return NotFound("Proje bulunamadı");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating project with id {ProjectId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    // Projeyi sil
    [HttpDelete("projects/{id}")]
    public async Task<ActionResult> DeleteProject(int id)
    {
        try
        {
            var success = await _dataService.DeleteProjectAsync(id);
            
            if (success)
            {
                return Ok(new { message = "Proje başarıyla silindi" });
            }
            
            return NotFound("Proje bulunamadı");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting project with id {ProjectId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    // Tema ayarlarını güncelle
    [HttpPut("theme")]
    public async Task<ActionResult> UpdateTheme([FromBody] ThemeSettings theme)
    {
        try
        {
            var success = await _dataService.UpdateThemeAsync(theme);
            
            if (success)
            {
                return Ok(new { message = "Tema ayarları başarıyla güncellendi" });
            }
            
            return BadRequest("Güncellenirken hata oluştu");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating theme");
            return StatusCode(500, "Internal server error");
        }
    }

    // Sadece tema verilerini getir
    [HttpGet("theme")]
    public async Task<ActionResult<ThemeSettings>> GetTheme()
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            return Ok(data.Theme);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting theme");
            return StatusCode(500, "Internal server error");
        }
    }

    // İletişim bilgilerini güncelle
    [HttpPut("contact")]
    public async Task<ActionResult> UpdateContact([FromBody] ContactInfo contact)
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            data.Contact = contact;
            var success = await _dataService.SavePortfolioDataAsync(data);
            
            if (success)
            {
                return Ok(new { message = "İletişim bilgileri başarıyla güncellendi" });
            }
            
            return BadRequest("Güncellenirken hata oluştu");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating contact info");
            return StatusCode(500, "Internal server error");
        }
    }

    // İletişim bilgilerini getir
    [HttpGet("contact")]
    public async Task<ActionResult<ContactInfo>> GetContactInfo()
    {
        try
        {
            var data = await _dataService.GetPortfolioDataAsync();
            return Ok(data.Contact);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting contact info");
            return StatusCode(500, "Internal server error");
        }
    }
} 