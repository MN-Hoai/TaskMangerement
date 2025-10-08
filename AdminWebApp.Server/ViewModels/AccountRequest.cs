using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class AccountRequest
    {
        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("fullName")]
        public string FullName { get; set; }

        [JsonPropertyName("avatar")]
        public string Avatar { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("mobile")]
        public string Mobile { get; set; }

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("gender")]
        public bool? Gender { get; set; }

        [JsonPropertyName("status")]
        public bool? Status { get; set; }

        [JsonPropertyName("passwordEncodeKey")]
        public string PasswordEncodeKey { get; set; }

        [JsonPropertyName("passwordUpdatedTime")]
        public string PasswordUpdatedTime { get; set; }

        [JsonPropertyName("lastLoginTime")]
        public string LastLoginTime { get; set; }

        [JsonPropertyName("refreshToken")]
        public string RefreshToken { get; set; }

        [JsonPropertyName("refreshTokenCreateTime")]
        public string RefreshTokenCreateTime { get; set; }

        [JsonPropertyName("createTime")]
        public string CreateTime { get; set; }

        [JsonPropertyName("updateTime")]
        public string UpdateTime { get; set; }

        [JsonPropertyName("createBy")]
        public string CreateBy { get; set; }

        [JsonPropertyName("accountCategoryID")]
        public string AccountCategoryID { get; set; }

        // Constructor mặc định
        public AccountRequest()
        {
            Username = string.Empty;
            Password = string.Empty;
            FullName = string.Empty;
            Avatar = string.Empty;
            Email = string.Empty;
            Mobile = string.Empty;
            Address = string.Empty;
            Gender = false; // Mặc định là Nam (giả sử false = Nam, true = Nữ)
            Status = false; // Mặc định trạng thái là Tạm khóa
            PasswordEncodeKey = string.Empty;
            PasswordUpdatedTime = string.Empty;
            LastLoginTime = string.Empty;
            RefreshToken = string.Empty;
            RefreshTokenCreateTime = string.Empty;
            CreateTime = string.Empty;
            UpdateTime = string.Empty;
            CreateBy = string.Empty;
            AccountCategoryID = string.Empty;
        }

        // Constructor với tham số
        public AccountRequest(
            string username,
            string password,
            string fullName,
            string avatar,
            string email,
            string mobile,
            string address,
            bool? gender,
            bool? status,
            string accountCategoryID,
            string passwordEncodeKey,
            string passwordUpdatedTime,
            string lastLoginTime,
            string refreshToken,
            string refreshTokenCreateTime,
            string createTime,
            string updateTime,
            string createBy)
        {
            Username = username;
            Password = password;
            FullName = fullName;
            Avatar = avatar;
            Email = email;
            Mobile = mobile;
            Address = address;
            Gender = gender;
            Status = status;
            AccountCategoryID = accountCategoryID;
            PasswordEncodeKey = passwordEncodeKey;
            PasswordUpdatedTime = passwordUpdatedTime;
            LastLoginTime = lastLoginTime;
            RefreshToken = refreshToken;
            RefreshTokenCreateTime = refreshTokenCreateTime;
            CreateTime = createTime;
            UpdateTime = updateTime;
            CreateBy = createBy;
        }
    }
}