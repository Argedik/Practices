using be.Models;
using System.Text.Json;

namespace be.Services;

public class ContentService
{
    private readonly string _dataPath = "Data";
    private readonly JsonSerializerOptions _jsonOptions = new() 
    { 
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true 
    };

    public ContentService()
    {
        // Data klasörü yoksa oluştur
        if (!Directory.Exists(_dataPath))
        {
            Directory.CreateDirectory(_dataPath);
        }
    }

    // Hero Section
    public async Task<HeroData> GetHeroAsync()
    {
        var filePath = Path.Combine(_dataPath, "hero.json");
        if (!File.Exists(filePath))
        {
            var defaultData = new HeroData
            {
                Id = "hero-1",
                Title = "Merhaba, Ben John Doe",
                Text = "Full Stack Developer ve UI/UX tasarımcısıyım. Modern web teknolojileri ile kullanıcı dostu çözümler geliştiriyorum.",
                ImageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                Position = "left",
                AreaNumber = 1
            };
            await SaveHeroAsync(defaultData);
            return defaultData;
        }

        var json = await File.ReadAllTextAsync(filePath);
        return JsonSerializer.Deserialize<HeroData>(json, _jsonOptions) ?? new HeroData();
    }

    public async Task<HeroData> SaveHeroAsync(HeroData hero)
    {
        hero.LastUpdated = DateTime.Now;
        var filePath = Path.Combine(_dataPath, "hero.json");
        var json = JsonSerializer.Serialize(hero, _jsonOptions);
        await File.WriteAllTextAsync(filePath, json);
        return hero;
    }

    // Skills Section
    public async Task<List<SkillData>> GetSkillsAsync()
    {
        var filePath = Path.Combine(_dataPath, "skills.json");
        if (!File.Exists(filePath))
        {
            var defaultData = new List<SkillData>
            {
                new() { Id = "skill-1", Name = "React", Proficiency = 90, Category = "Frontend" },
                new() { Id = "skill-2", Name = "Node.js", Proficiency = 85, Category = "Backend" },
                new() { Id = "skill-3", Name = "TypeScript", Proficiency = 88, Category = "Language" },
                new() { Id = "skill-4", Name = "MongoDB", Proficiency = 80, Category = "Database" }
            };
            await SaveSkillsAsync(defaultData);
            return defaultData;
        }

        var json = await File.ReadAllTextAsync(filePath);
        return JsonSerializer.Deserialize<List<SkillData>>(json, _jsonOptions) ?? new List<SkillData>();
    }

    public async Task<List<SkillData>> SaveSkillsAsync(List<SkillData> skills)
    {
        foreach (var skill in skills)
        {
            skill.LastUpdated = DateTime.Now;
        }
        
        var filePath = Path.Combine(_dataPath, "skills.json");
        var json = JsonSerializer.Serialize(skills, _jsonOptions);
        await File.WriteAllTextAsync(filePath, json);
        return skills;
    }

    public async Task<SkillData> AddSkillAsync(SkillData skill)
    {
        var skills = await GetSkillsAsync();
        skill.Id = $"skill-{DateTimeOffset.Now.ToUnixTimeMilliseconds()}";
        skill.LastUpdated = DateTime.Now;
        skills.Add(skill);
        await SaveSkillsAsync(skills);
        return skill;
    }

    public async Task<SkillData?> UpdateSkillAsync(string id, SkillData updatedSkill)
    {
        var skills = await GetSkillsAsync();
        var skill = skills.FirstOrDefault(s => s.Id == id);
        if (skill == null) return null;

        skill.Name = updatedSkill.Name;
        skill.Proficiency = updatedSkill.Proficiency;
        skill.Category = updatedSkill.Category;
        skill.LastUpdated = DateTime.Now;

        await SaveSkillsAsync(skills);
        return skill;
    }

    public async Task<bool> DeleteSkillAsync(string id)
    {
        var skills = await GetSkillsAsync();
        var skillToRemove = skills.FirstOrDefault(s => s.Id == id);
        if (skillToRemove == null) return false;

        skills.Remove(skillToRemove);
        await SaveSkillsAsync(skills);
        return true;
    }

    // Career Section
    public async Task<List<CareerData>> GetCareerAsync()
    {
        var filePath = Path.Combine(_dataPath, "career.json");
        if (!File.Exists(filePath))
        {
            var defaultData = new List<CareerData>
            {
                new()
                {
                    Id = "career-1",
                    Company = "TechCorp A.Ş.",
                    Position = "Senior Frontend Developer",
                    StartDate = "Ocak 2022",
                    EndDate = "Devam Ediyor",
                    Description = "React, TypeScript ve Next.js kullanarak modern web uygulamaları geliştiriyorum.",
                    LogoUrl = "https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=TC",
                    Location = "İstanbul",
                    WorkType = "Tam Zamanlı"
                }
            };
            await SaveCareerAsync(defaultData);
            return defaultData;
        }

        var json = await File.ReadAllTextAsync(filePath);
        return JsonSerializer.Deserialize<List<CareerData>>(json, _jsonOptions) ?? new List<CareerData>();
    }

    public async Task<List<CareerData>> SaveCareerAsync(List<CareerData> careers)
    {
        foreach (var career in careers)
        {
            career.LastUpdated = DateTime.Now;
        }
        
        var filePath = Path.Combine(_dataPath, "career.json");
        var json = JsonSerializer.Serialize(careers, _jsonOptions);
        await File.WriteAllTextAsync(filePath, json);
        return careers;
    }

    public async Task<CareerData> AddCareerAsync(CareerData career)
    {
        var careers = await GetCareerAsync();
        career.Id = $"career-{DateTimeOffset.Now.ToUnixTimeMilliseconds()}";
        career.LastUpdated = DateTime.Now;
        careers.Add(career);
        await SaveCareerAsync(careers);
        return career;
    }

    public async Task<CareerData?> UpdateCareerAsync(string id, CareerData updatedCareer)
    {
        var careers = await GetCareerAsync();
        var career = careers.FirstOrDefault(c => c.Id == id);
        if (career == null) return null;

        career.Company = updatedCareer.Company;
        career.Position = updatedCareer.Position;
        career.StartDate = updatedCareer.StartDate;
        career.EndDate = updatedCareer.EndDate;
        career.Description = updatedCareer.Description;
        career.LogoUrl = updatedCareer.LogoUrl;
        career.Location = updatedCareer.Location;
        career.WorkType = updatedCareer.WorkType;
        career.LastUpdated = DateTime.Now;

        await SaveCareerAsync(careers);
        return career;
    }

    public async Task<bool> DeleteCareerAsync(string id)
    {
        var careers = await GetCareerAsync();
        var careerToRemove = careers.FirstOrDefault(c => c.Id == id);
        if (careerToRemove == null) return false;

        careers.Remove(careerToRemove);
        await SaveCareerAsync(careers);
        return true;
    }

    // Tüm Content
    public async Task<AllContentData> GetAllContentAsync()
    {
        var hero = await GetHeroAsync();
        var skills = await GetSkillsAsync();
        var career = await GetCareerAsync();

                    return new AllContentData
            {
                Hero = hero,
            Skills = skills,
            Career = career,
            // Diğerleri gelecekte eklenecek
            Projects = new List<ProjectData>(),
            SocialMedia = new List<SocialMediaData>(),
            Contact = new ContactData(),
            ContactForm = new ContactFormData()
        };
    }

    // Admin Settings Methods
    public async Task<AdminSettings> GetAdminSettingsAsync()
    {
        var filePath = Path.Combine(_dataPath, "admin-settings.json");
        if (!File.Exists(filePath))
        {
            var defaultSettings = new AdminSettings();
            await SaveAdminSettingsAsync(defaultSettings);
            return defaultSettings;
        }

        var json = await File.ReadAllTextAsync(filePath);
        return JsonSerializer.Deserialize<AdminSettings>(json, _jsonOptions) ?? new AdminSettings();
    }

    public async Task<AdminSettings> SaveAdminSettingsAsync(AdminSettings adminSettings)
    {
        adminSettings.LastUpdated = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        var filePath = Path.Combine(_dataPath, "admin-settings.json");
        var json = JsonSerializer.Serialize(adminSettings, _jsonOptions);
        await File.WriteAllTextAsync(filePath, json);
        return adminSettings;
    }
} 