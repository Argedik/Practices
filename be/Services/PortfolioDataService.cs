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
            Experiences = new List<Experience>
            {
                new Experience
                {
                    Id = 1,
                    Company = "TechCorp A.Ş.",
                    Position = "Senior Frontend Developer",
                    Description = "React, TypeScript ve Next.js kullanarak modern web uygulamaları geliştiriyorum.",
                    StartDate = "2022-01-01",
                    EndDate = "2024-12-31",
                    Location = "İstanbul",
                    WorkType = "Tam Zamanlı",
                    LogoUrl = "https://picsum.photos/60/60?random=1",
                    IsActive = true,
                    LastUpdated = DateTime.Now
                }
            },
            Cities = new List<string>
            {
                "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
                "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
                "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
                "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
                "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
                "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
                "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
                "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
            },
            SocialMedia = new List<SocialMediaAccount>
            {
                new SocialMediaAccount
                {
                    Id = 1,
                    Platform = "LinkedIn",
                    Url = "https://linkedin.com/in/johndoe",
                    Icon = "💼",
                    IsActive = true,
                    LastUpdated = DateTime.Now
                },
                new SocialMediaAccount
                {
                    Id = 2,
                    Platform = "GitHub",
                    Url = "https://github.com/johndoe",
                    Icon = "🐙",
                    IsActive = true,
                    LastUpdated = DateTime.Now
                }
            },
            Contact = new ContactInfo
            {
                Emails = new List<EmailContact>
                {
                    new EmailContact { Value = "john@example.com", Enabled = true }
                },
                Phones = new List<PhoneContact>
                {
                    new PhoneContact { Value = "+90 555 123 45 67", Enabled = true }
                },
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

    // Deneyim ekle
    public async Task<Experience?> AddExperienceAsync(Experience experience)
    {
        var data = await GetPortfolioDataAsync();
        experience.Id = data.Experiences.Any() ? data.Experiences.Max(e => e.Id) + 1 : 1;
        experience.LastUpdated = DateTime.Now;
        
        data.Experiences.Add(experience);
        
        if (await SavePortfolioDataAsync(data))
        {
            return experience;
        }
        
        return null;
    }

    // Deneyim güncelle
    public async Task<bool> UpdateExperienceAsync(int id, Experience experience)
    {
        var data = await GetPortfolioDataAsync();
        var existingExperience = data.Experiences.FirstOrDefault(e => e.Id == id);
        
        if (existingExperience == null) return false;
        
        experience.Id = id;
        experience.LastUpdated = DateTime.Now;
        
        var index = data.Experiences.FindIndex(e => e.Id == id);
        data.Experiences[index] = experience;
        
        return await SavePortfolioDataAsync(data);
    }

    // Deneyim sil
    public async Task<bool> DeleteExperienceAsync(int id)
    {
        var data = await GetPortfolioDataAsync();
        var experience = data.Experiences.FirstOrDefault(e => e.Id == id);
        
        if (experience == null) return false;
        
        data.Experiences.Remove(experience);
        return await SavePortfolioDataAsync(data);
    }

    // Sosyal medya hesabı ekle
    public async Task<SocialMediaAccount?> AddSocialMediaAsync(SocialMediaAccount socialMedia)
    {
        var data = await GetPortfolioDataAsync();
        socialMedia.Id = data.SocialMedia.Any() ? data.SocialMedia.Max(s => s.Id) + 1 : 1;
        socialMedia.LastUpdated = DateTime.Now;
        
        // Platform ikonunu otomatik belirle
        socialMedia.Icon = GetPlatformIcon(socialMedia.Platform);
        
        data.SocialMedia.Add(socialMedia);
        
        if (await SavePortfolioDataAsync(data))
        {
            return socialMedia;
        }
        
        return null;
    }

    // Sosyal medya hesabını güncelle
    public async Task<bool> UpdateSocialMediaAsync(int id, SocialMediaAccount socialMedia)
    {
        var data = await GetPortfolioDataAsync();
        var existingSocialMedia = data.SocialMedia.FirstOrDefault(s => s.Id == id);
        
        if (existingSocialMedia == null) return false;
        
        socialMedia.Id = id;
        socialMedia.LastUpdated = DateTime.Now;
        
        // Platform ikonunu otomatik belirle
        socialMedia.Icon = GetPlatformIcon(socialMedia.Platform);
        
        var index = data.SocialMedia.FindIndex(s => s.Id == id);
        data.SocialMedia[index] = socialMedia;
        
        return await SavePortfolioDataAsync(data);
    }

    // Sosyal medya hesabını sil
    public async Task<bool> DeleteSocialMediaAsync(int id)
    {
        var data = await GetPortfolioDataAsync();
        var socialMedia = data.SocialMedia.FirstOrDefault(s => s.Id == id);
        
        if (socialMedia == null) return false;
        
        data.SocialMedia.Remove(socialMedia);
        return await SavePortfolioDataAsync(data);
    }

    // Platform ikonunu belirle
    private string GetPlatformIcon(string platform)
    {
        var icons = new Dictionary<string, string>
        {
            { "LinkedIn", "💼" },
            { "GitHub", "🐙" },
            { "Twitter", "🐦" },
            { "Instagram", "📷" },
            { "Facebook", "📘" },
            { "YouTube", "🎥" },
            { "TikTok", "🎵" },
            { "Discord", "🎮" },
            { "WhatsApp", "💬" },
            { "Telegram", "📱" },
            { "Website", "🌐" }
        };
        
        return icons.ContainsKey(platform) ? icons[platform] : "🌐";
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