using Microsoft.AspNetCore.Mvc;
using be.Models;
using be.Services;

namespace be.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly ContentService _contentService;

    public ContentController(ContentService contentService)
    {
        _contentService = contentService;
    }

    // Tüm içeriği getir
    [HttpGet]
    public async Task<ActionResult<AllContentData>> GetAllContent()
    {
        try
        {
            var content = await _contentService.GetAllContentAsync();
            return Ok(content);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch content", details = ex.Message });
        }
    }

    // Hero Section
    [HttpGet("hero")]
    public async Task<ActionResult<HeroData>> GetHero()
    {
        try
        {
            var hero = await _contentService.GetHeroAsync();
            return Ok(hero);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch hero data", details = ex.Message });
        }
    }

    [HttpPut("hero")]
    public async Task<ActionResult<HeroData>> UpdateHero([FromBody] HeroData hero)
    {
        try
        {
            var updatedHero = await _contentService.SaveHeroAsync(hero);
            return Ok(updatedHero);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to update hero data", details = ex.Message });
        }
    }

    // Skills Section
    [HttpGet("skills")]
    public async Task<ActionResult<List<SkillData>>> GetSkills()
    {
        try
        {
            var skills = await _contentService.GetSkillsAsync();
            return Ok(skills);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch skills data", details = ex.Message });
        }
    }

    [HttpPost("skills")]
    public async Task<ActionResult<SkillData>> AddSkill([FromBody] SkillData skill)
    {
        try
        {
            var newSkill = await _contentService.AddSkillAsync(skill);
            return CreatedAtAction(nameof(GetSkills), new { id = newSkill.Id }, newSkill);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to add skill", details = ex.Message });
        }
    }

    [HttpPut("skills/{id}")]
    public async Task<ActionResult<SkillData>> UpdateSkill(string id, [FromBody] SkillData skill)
    {
        try
        {
            var updatedSkill = await _contentService.UpdateSkillAsync(id, skill);
            if (updatedSkill == null)
            {
                return NotFound(new { error = "Skill not found" });
            }
            return Ok(updatedSkill);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to update skill", details = ex.Message });
        }
    }

    [HttpDelete("skills/{id}")]
    public async Task<ActionResult> DeleteSkill(string id)
    {
        try
        {
            var deleted = await _contentService.DeleteSkillAsync(id);
            if (!deleted)
            {
                return NotFound(new { error = "Skill not found" });
            }
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to delete skill", details = ex.Message });
        }
    }

    // Career Section
    [HttpGet("career")]
    public async Task<ActionResult<List<CareerData>>> GetCareer()
    {
        try
        {
            var career = await _contentService.GetCareerAsync();
            return Ok(career);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch career data", details = ex.Message });
        }
    }

    [HttpPost("career")]
    public async Task<ActionResult<CareerData>> AddCareer([FromBody] CareerData career)
    {
        try
        {
            var newCareer = await _contentService.AddCareerAsync(career);
            return CreatedAtAction(nameof(GetCareer), new { id = newCareer.Id }, newCareer);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to add career", details = ex.Message });
        }
    }

    [HttpPut("career/{id}")]
    public async Task<ActionResult<CareerData>> UpdateCareer(string id, [FromBody] CareerData career)
    {
        try
        {
            var updatedCareer = await _contentService.UpdateCareerAsync(id, career);
            if (updatedCareer == null)
            {
                return NotFound(new { error = "Career not found" });
            }
            return Ok(updatedCareer);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to update career", details = ex.Message });
        }
    }

    [HttpDelete("career/{id}")]
    public async Task<ActionResult> DeleteCareer(string id)
    {
        try
        {
            var deleted = await _contentService.DeleteCareerAsync(id);
            if (!deleted)
            {
                return NotFound(new { error = "Career not found" });
            }
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to delete career", details = ex.Message });
        }
    }

    // Admin Settings
    [HttpGet("admin-settings")]
    public async Task<ActionResult<AdminSettings>> GetAdminSettings()
    {
        try
        {
            var adminSettings = await _contentService.GetAdminSettingsAsync();
            return Ok(adminSettings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch admin settings", details = ex.Message });
        }
    }

    [HttpPut("admin-settings")]
    public async Task<ActionResult<AdminSettings>> UpdateAdminSettings([FromBody] AdminSettings adminSettings)
    {
        try
        {
            var updatedSettings = await _contentService.SaveAdminSettingsAsync(adminSettings);
            return Ok(updatedSettings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to update admin settings", details = ex.Message });
        }
    }
} 