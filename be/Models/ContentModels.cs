namespace be.Models;

// Hero Section Model
public class HeroData
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Text { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public string Position { get; set; } = "left"; // left, right
    public int AreaNumber { get; set; } = 1;
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// Skills Model
public class SkillData
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public int Proficiency { get; set; } = 0;
    public string? Category { get; set; }
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// Projects Model
public class ProjectData
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string StartDate { get; set; } = "";
    public string EndDate { get; set; } = "";
    public string Description { get; set; } = "";
    public string LogoUrl { get; set; } = "";
    public string? Status { get; set; }
    public List<string>? Technologies { get; set; } = new();
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// Career Model
public class CareerData
{
    public string Id { get; set; } = "";
    public string Company { get; set; } = "";
    public string Position { get; set; } = "";
    public string StartDate { get; set; } = "";
    public string EndDate { get; set; } = "";
    public string Description { get; set; } = "";
    public string LogoUrl { get; set; } = "";
    public string Location { get; set; } = "";
    public string WorkType { get; set; } = "";
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// Social Media Model
public class SocialMediaData
{
    public string Platform { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string LastUpdated { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
}

// Contact Model
public class ContactData
{
    public PhoneContact Phone { get; set; } = new();
    public EmailContact Email { get; set; } = new();
    public bool Whatsapp { get; set; } = false;
    public bool Telegram { get; set; } = false;
    public string Position { get; set; } = "left"; // left, right
}

public class PhoneContact
{
    public bool Enabled { get; set; } = true;
    public string Value { get; set; } = "";
}

public class EmailContact
{
    public bool Enabled { get; set; } = true;
    public string Value { get; set; } = "";
}

// Contact Form Model
public class ContactFormData
{
    public bool Enabled { get; set; } = true;
    public string RecipientEmail { get; set; } = "";
    public bool NameRequired { get; set; } = true;
    public bool PhoneRequired { get; set; } = false;
    public List<string> ReasonOptions { get; set; } = new();
}

// Contact Section (combines contact + social media + form)
public class ContactSectionData
{
    public ContactData Contact { get; set; } = new();
    public List<SocialMediaData> SocialMedia { get; set; } = new();
    public ContactFormData ContactForm { get; set; } = new();
    public DateTime LastUpdated { get; set; } = DateTime.Now;
}

// All Content Model
public class AllContentData
{
    public HeroData Hero { get; set; } = new();
    public List<SkillData> Skills { get; set; } = new();
    public List<ProjectData> Projects { get; set; } = new();
    public List<CareerData> Career { get; set; } = new();
    public List<SocialMediaData> SocialMedia { get; set; } = new();
    public ContactData Contact { get; set; } = new();
    public ContactFormData ContactForm { get; set; } = new();
    public AdminSettings AdminSettings { get; set; } = new();
}

// Admin Panel Settings
public class AdminSettings
{
    public bool IsOnePageSite { get; set; } = true;
    public List<string> PageOrder { get; set; } = new() { "Hero", "Skills", "Projects", "Career", "Contact" };
    public string NavigationStyle { get; set; } = "scroll"; // scroll, click
    public LayoutOptions LayoutOptions { get; set; } = new();
    public SelectedTags SelectedTags { get; set; } = new();
    public string LastUpdated { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
}

public class SelectedTags
{
    public List<string> SiteType { get; set; } = new();
    public List<string> Navigation { get; set; } = new();
    public List<string> Layout { get; set; } = new();
    public List<string> PageOrder { get; set; } = new();
}

public class LayoutOptions
{
    public string ImagePosition { get; set; } = "background"; // background, left, right, top, bottom
    public string TextPosition { get; set; } = "center"; // center, left, right, top, middle, bottom
    public bool GridMode { get; set; } = false;
    public bool FixedAreaEnabled { get; set; } = false;
    public int FixedAreaPosition { get; set; } = 5; // 3x3 grid position (1-9)
} 