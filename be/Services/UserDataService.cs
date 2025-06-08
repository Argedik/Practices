using System.Text.Json;
using be.Models;

namespace be.Services;

public class UserDataService
{
    private readonly string _dataFilePath;
    private readonly ILogger<UserDataService> _logger;

    public UserDataService(ILogger<UserDataService> logger)
    {
        _logger = logger;
        _dataFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "users.json");
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

        // Sadece dosya yoksa boş bir array oluştur
        if (!File.Exists(_dataFilePath))
        {
            var emptyArray = new List<UserModel>();
            SaveUsers(emptyArray);
            _logger.LogInformation("Empty user data file created");
        }
    }

    // Kullanıcıları getir
    public async Task<List<UserModel>> GetUsersAsync()
    {
        try
        {
            var json = await File.ReadAllTextAsync(_dataFilePath);
            var users = JsonSerializer.Deserialize<List<UserModel>>(json, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            return users ?? new List<UserModel>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reading user data");
            return new List<UserModel>();
        }
    }

    // Kullanıcıları kaydet
    private async Task<bool> SaveUsersAsync(List<UserModel> users)
    {
        try
        {
            var json = JsonSerializer.Serialize(users, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });
            
            await File.WriteAllTextAsync(_dataFilePath, json);
            _logger.LogInformation("User data saved successfully");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving user data");
            return false;
        }
    }

    // Kullanıcı ekle
    public async Task<UserModel?> AddUserAsync(UserModel user)
    {
        var users = await GetUsersAsync();
        user.Id = users.Any() ? users.Max(u => u.Id) + 1 : 1;
        user.CreatedDate = DateTime.Now;
        
        users.Add(user);
        
        if (await SaveUsersAsync(users))
        {
            return user;
        }
        
        return null;
    }

    // Kullanıcı güncelle
    public async Task<bool> UpdateUserAsync(UserModel user)
    {
        var users = await GetUsersAsync();
        var existingUser = users.FirstOrDefault(u => u.Id == user.Id);
        
        if (existingUser == null) return false;
        
        user.CreatedDate = existingUser.CreatedDate;
        
        var index = users.FindIndex(u => u.Id == user.Id);
        users[index] = user;
        
        return await SaveUsersAsync(users);
    }

    // Kullanıcı sil
    public async Task<bool> DeleteUserAsync(int id)
    {
        var users = await GetUsersAsync();
        var user = users.FirstOrDefault(u => u.Id == id);
        
        if (user == null) return false;
        
        users.Remove(user);
        return await SaveUsersAsync(users);
    }

    // Sync kaydetme metodu
    private bool SaveUsers(List<UserModel> users)
    {
        try
        {
            var json = JsonSerializer.Serialize(users, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });
            
            File.WriteAllText(_dataFilePath, json);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving user data sync");
            return false;
        }
    }
} 