namespace be.Models;

// Ana portfolio veri modeli
public class PortfolioContent
{
    public PersonalInfo Personal { get; set; } = new();
    public AboutMe About { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public List<Experience> Experiences { get; set; } = new();
    public ContactInfo Contact { get; set; } = new();
    public ThemeSettings Theme { get; set; } = new();
}

// Kişisel bilgiler
public class PersonalInfo
{
    public string FullName { get; set; } = "";
    public string Title { get; set; } = "";
    public string ProfileImage { get; set; } = "";
    public string CvDownloadLink { get; set; } = "";
    public string WelcomeMessage { get; set; } = "";
}

// Hakkımda bölümü
public class AboutMe
{
    public string Description { get; set; } = "";
    public List<string> Skills { get; set; } = new();
    public int YearsExperience { get; set; }
    public int ProjectsCompleted { get; set; }
}

// Proje modeli
public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public string ProjectUrl { get; set; } = "";
    public string GithubUrl { get; set; } = "";
    public List<string> Technologies { get; set; } = new();
    public DateTime CreatedDate { get; set; }
    public bool IsActive { get; set; } = true;
}

// Deneyim modeli
public class Experience
{
    public int Id { get; set; }
    public string Company { get; set; } = "";
    public string Position { get; set; } = "";
    public string Description { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string Type { get; set; } = "work"; // work, education
}

// İletişim bilgileri
public class ContactInfo
{
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Location { get; set; } = "";
    public SocialMedia Social { get; set; } = new();
}

// Sosyal medya
public class SocialMedia
{
    public string LinkedIn { get; set; } = "";
    public string GitHub { get; set; } = "";
    public string Twitter { get; set; } = "";
    public string Instagram { get; set; } = "";
    public string Website { get; set; } = "";
}

// Tema ayarları
public class ThemeSettings
{
    public string PrimaryColor { get; set; } = "#007bff";
    public string SecondaryColor { get; set; } = "#6c757d";
    public string BackgroundColor { get; set; } = "#ffffff";
    public string TextColor { get; set; } = "#333333";
    public string FontFamily { get; set; } = "Inter, sans-serif";
    public bool DarkMode { get; set; } = false;
} 