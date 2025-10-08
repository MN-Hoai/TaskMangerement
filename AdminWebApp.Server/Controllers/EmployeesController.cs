using AdminWebApp.Server.Models;
using AdminWebApp.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdminWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly DBContext _db;

        public EmployeesController(DBContext context)
        {
            _db = context;
        }
        /// <summary>
        /// Lấy danh sách tất cả nhân viên đang hoạt động.
        /// GET: /api/employees
        /// </summary>
        /// <returns>Trả về danh sách nhân viên (EmployeeId và FullName); nếu xảy ra lỗi, trả về thông báo lỗi.</returns>
        [HttpGet]
        public IActionResult GetEmployees()
        {
            try
            {
                var data = _db.Employees
                    .Where(e => e.Status == true)
                    .Select(e => new OptionItemResponse
                    {
                        Value = e.EmployeeId.ToString(),
                        Text = e.FullName,
                        Selected = false
                    })
                    .OrderBy(x => x.Text)
                    .ToList();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách nhân viên thành công.",
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách nhân viên.",
                    Data = new[] { ex.Message }
                });
            }
        }
        /// <summary>
        /// Lấy danh sách các tùy chọn nhân viên.
        /// GET: /api/employees/options
        /// </summary>
        /// <returns>Trả về danh sách các tùy chọn nhân viên (bao gồm EmployeeId và FullName); nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        /// <remarks>GET: /api/employees/options</remarks>
        [HttpGet("options")]
        public IActionResult GetEmployeeOptions()
        {
            try
            {
                // Truy vấn danh sách nhân viên từ cơ sở dữ liệu
                var data = _db.Employees
                    .Where(e => e.Status == true)
                    .OrderBy(e => e.FullName)
                    .Select(e => new OptionItemResponse
                    {
                        Value = e.EmployeeId.ToString(),
                        Text = e.FullName,
                        Selected = false
                    })
                    .ToList();

                // Tạo kết quả
                var response = new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách nhân viên thành công.",
                    Data = data
                };

                // Trả về danh sách các tùy chọn nhân viên
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách nhân viên.",
                    Data = new[] { ex.Message }
                });
            }
        }
    }
}