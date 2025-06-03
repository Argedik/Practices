using System.Text.Json;
using be.Models;

namespace be.Services;

public class PortfolioDataService
{
    private readonly string _dataFilePath;
    private readonly ILogger<PortfolioDataService> _logger;

    public PortfolioDataService(ILogger<PortfolioDataService> logger)
    {
        _logger = logger;
        _dataFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "portfolio.json");
        EnsureDataFileExists();
    }

    // JSON dosyasının var olduğundan emin ol
    private void EnsureDataFileExists()
    {
        var dataDir = Path.GetDirectoryName(_dataFilePath);
        if (!Directory.Exists(dataDir))
        {
            Directory.CreateDirectory(dataDir!);
        }

        if (!File.Exists(_dataFilePath))
        {
            var defaultData = CreateDefaultPortfolioData();
            SavePortfolioData(defaultData);
            _logger.LogInformation("Default portfolio data created");
        }
    }

    // Varsayılan portfolio verisi oluştur
    private PortfolioContent CreateDefaultPortfolioData()
    {
        return new PortfolioContent
        {
            Personal = new PersonalInfo
            {
                FullName = "John Doe",
                Title = "Full Stack Developer",
                ProfileImage = "/images/profile.jpg",
                WelcomeMessage = "Merhaba! Ben bir yazılım geliştiricisiyim."
            },
            About = new AboutMe
            {
                Description = "5+ yıllık deneyime sahip passionate bir yazılım geliştiricisiyim.",
                Skills = ["C#", "JavaScript", "React", "Node.js", "SQL"],
                YearsExperience = 5,
                ProjectsCompleted = 25
            },
            Projects = new List<Project>
            {
                new Project
                {
                    Id = 1,
                    Title = "E-Ticaret Platformu",
                    Description = "Modern bir e-ticaret uygulaması",
                    ImageUrl = "/images/project1.jpg",
                    Technologies = ["React", "Node.js", "MongoDB"],
                    CreatedDate = DateTime.Now.AddMonths(-3),
                    IsActive = true
                }
            },
            Contact = new ContactInfo
            {
                Email = "john@example.com",
                Phone = "+90 555 123 45 67",
                Location = "İstanbul, Türkiye",
                Social = new SocialMedia
                {
                    LinkedIn = "linkedin.com/in/johndoe",
                    GitHub = "github.com/johndoe"
                }
            },
            Theme = new ThemeSettings()
        };
    }

    // Portfolio verilerini getir
    public async Task<PortfolioContent> GetPortfolioDataAsync()
    {
        try
        {
            var json = await File.ReadAllTextAsync(_dataFilePath);
            var data = JsonSerializer.Deserialize<PortfolioContent>(json, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            return data ?? CreateDefaultPortfolioData();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reading portfolio data");
            return CreateDefaultPortfolioData();
        }
    }

    // Portfolio verilerini kaydet
    public async Task<bool> SavePortfolioDataAsync(PortfolioContent data)
    {
        try
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });
            
            await File.WriteAllTextAsync(_dataFilePath, json);
            _logger.LogInformation("Portfolio data saved successfully");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving portfolio data");
            return false;
        }
    }

    // Kişisel bilgileri güncelle
    public async Task<bool> UpdatePersonalInfoAsync(PersonalInfo personalInfo)
    {
        var data = await GetPortfolioDataAsync();
        data.Personal = personalInfo;
        return await SavePortfolioDataAsync(data);
    }

    // Hakkımda bölümünü güncelle
    public async Task<bool> UpdateAboutMeAsync(AboutMe aboutMe)
    {
        var data = await GetPortfolioDataAsync();
        data.About = aboutMe;
        return await SavePortfolioDataAsync(data);
    }

    // Proje ekle
    public async Task<Project?> AddProjectAsync(Project project)
    {
        var data = await GetPortfolioDataAsync();
        project.Id = data.Projects.Any() ? data.Projects.Max(p => p.Id) + 1 : 1;
        project.CreatedDate = DateTime.Now;
        
        data.Projects.Add(project);
        
        if (await SavePortfolioDataAsync(data))
        {
            return project;
        }
        
        return null;
    }

    // Proje güncelle
    public async Task<bool> UpdateProjectAsync(int id, Project project)
    {
        var data = await GetPortfolioDataAsync();
        var existingProject = data.Projects.FirstOrDefault(p => p.Id == id);
        
        if (existingProject == null) return false;
        
        project.Id = id;
        project.CreatedDate = existingProject.CreatedDate;
        
        var index = data.Projects.FindIndex(p => p.Id == id);
        data.Projects[index] = project;
        
        return await SavePortfolioDataAsync(data);
    }

    // Proje sil
    public async Task<bool> DeleteProjectAsync(int id)
    {
        var data = await GetPortfolioDataAsync();
        var project = data.Projects.FirstOrDefault(p => p.Id == id);
        
        if (project == null) return false;
        
        data.Projects.Remove(project);
        return await SavePortfolioDataAsync(data);
    }

    // Tema ayarlarını güncelle
    public async Task<bool> UpdateThemeAsync(ThemeSettings theme)
    {
        var data = await GetPortfolioDataAsync();
        data.Theme = theme;
        return await SavePortfolioDataAsync(data);
    }

    // Sadece genel kaydetme metodu
    private bool SavePortfolioData(PortfolioContent data)
    {
        try
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });
            
            File.WriteAllText(_dataFilePath, json);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving portfolio data");
            return false;
        }
    }
} 