
using Microsoft.AspNetCore.Mvc;
using AdminWebApp.Server.ViewModels;
using AdminWebApp.Server.Models;

namespace AdminWebApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private DBContext db;
    public AuthenticationController(DBContext context)
    {
        db = context;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] SignInRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new SignInResponse
            {
                Success = false,
                Message = "Dữ liệu đầu vào không hợp lệ"
            });
        }

        var data = db.Accounts
                     .FirstOrDefault(x => x.Username == request.Username
                                       && x.Password == request.Password
                                       && x.Status   == true);
        if (data != null) {
            return Ok(new SignInResponse
            {
                Success = true,
                Message = "Đăng nhập thành công. Đang chuyển ⌛...",
                Token = GenerateJwtToken(request.Username)
            });
        }

        return Unauthorized(new SignInResponse
        {
            Success = false,
            Message = "Thông tin đăng nhập không chính xác"
        });
    }
  
    private string GenerateJwtToken(string username)
    {
        // Triển khai JWT thực tế tại đây
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
    }
}
