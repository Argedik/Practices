namespace be.Models;

// Ana portfolio veri modeli
public class PortfolioContent
{
    public PersonalInfo Personal { get; set; } = new();
    public AboutMe About { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public List<Experience> Experiences { get; set; } = new();
    public List<string> Cities { get; set; } = new();
    public List<SocialMediaAccount> SocialMedia { get; set; } = new();
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
    public string Position { get; set; } = "left"; // left, right
    public int AreaNumber { get; set; } = 1;
}

// Skill detayları
public class Skill
{
    public string Name { get; set; } = "";
    public int Proficiency { get; set; } = 75; // 0-100 arası
}

// Hakkımda bölümü
public class AboutMe
{
    public string Description { get; set; } = "";
    public List<string> Skills { get; set; } = new(); // Geriye uyumluluk için
    public List<Skill> DetailedSkills { get; set; } = new(); // Yeni detaylı skills
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

// Deneyim modeli - Frontend CareerData formatına uygun
public class Experience
{
    public int Id { get; set; }
    public string Company { get; set; } = "";
    public string Position { get; set; } = "";
    public string Description { get; set; } = "";
    public string StartDate { get; set; } = ""; // Frontend'de string olarak kullanılıyor
    public string EndDate { get; set; } = ""; // Frontend'de string olarak kullanılıyor
    public string Location { get; set; } = "";
    public string WorkType { get; set; } = "";
    public string LogoUrl { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// Sosyal medya hesabı modeli
public class SocialMediaAccount
{
    public int Id { get; set; }
    public string Platform { get; set; } = "";
    public string Url { get; set; } = "";
    public string Icon { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// İletişim bilgileri
public class ContactInfo
{
    public List<EmailContact> Emails { get; set; } = new();
    public List<PhoneContact> Phones { get; set; } = new();
    public string Location { get; set; } = "";
    public SocialMedia Social { get; set; } = new();
}

public class EmailContact
{
    public string Value { get; set; } = "";
    public bool Enabled { get; set; } = true;
}

public class PhoneContact
{
    public string Value { get; set; } = "";
    public bool Enabled { get; set; } = true;
}

// Sosyal medya (eski format - geriye uyumluluk için)
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

// Kullanıcı modeli
public class UserModel
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public int Age { get; set; }
    public string City { get; set; } = "";
    public DateTime CreatedDate { get; set; } = DateTime.Now;
} 