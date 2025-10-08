using AdminWebApp.Server.Models;
using AdminWebApp.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AdminWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountController : ControllerBase
    {
        #region Consts
        private const int PAGE_SIZE = 10;
        #endregion

        #region Variables
        private DBContext db;
        #endregion

        #region Constructors+DI
        public AccountController(DBContext context)
        {
            db = context;
        }
        #endregion

        #region Helpers
        /// <summary>
        /// Trả về 1 tài khoản có id phù hợp. Nếu không tìm thấy, trả về null.
        /// </summary>
        /// <param name="id">ID của tài khoản cần lấy thông tin.</param>
        /// <returns>Trả về 1 tài khoản có id phù hợp. Nếu không tìm thấy, trả về null.</returns>
        private Account? GetAccountById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return null;
            }

            return db.Accounts.FirstOrDefault(x => x.Username == id);
        }

        /// <summary>
        /// Chuyển đổi 1 đối tượng có kiểu Account sang kiểu AccountResponse.
        /// </summary>
        /// <param name="account">Đối tượng chứa dữ liệu cần chuyển đổi.</param>
        /// <returns>Trả về 1 đối tượng có kiểu là AccountResponse.</returns>
        private AccountResponse? GetAccountResponse(Account? account)
        {
            // Nếu account là null, trả về null
            if (account == null)
            {
                return null;
            }

            // Tạo và trả về một đối tượng AccountResponse từ account
            return new AccountResponse
            {
                Username = account.Username ?? string.Empty,
                Password = account.Password ?? string.Empty,
                FullName = account.FullName ?? string.Empty,
                Avatar = account.Avatar ?? string.Empty,
                Email = account.Email ?? string.Empty,
                Mobile = account.Mobile ?? string.Empty,
                Address = account.Address ?? string.Empty,
                Gender = account.Gender,
                Status = account.Status,
                PasswordEncodeKey = account.PasswordEncodeKey ?? string.Empty,
                PasswordUpdatedTime = account.PasswordUpdatedTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                LastLoginTime = account.LastLoginTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                RefreshToken = account.RefreshToken ?? string.Empty,
                RefreshTokenCreateTime = account.RefreshTokenCreateTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                CreateTime = account.CreateTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                UpdateTime = account.UpdateTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                CreateBy = account.CreateBy ?? string.Empty,
                AccountCategoryID = account.AccountCategoryID ?? string.Empty
            };
        }

        /// <summary>
        /// Hàm HashPassword: Mã hóa mật khẩu sử dụng bcrypt và PasswordEncodeKey.
        /// </summary>
        /// <param name="password">Mật khẩu cần mã hóa.</param>
        /// <param name="passwordEncodeKey">Khóa mã hóa ngẫu nhiên đã được tạo trước.</param>
        /// <returns>Mật khẩu đã mã hóa.</returns>
        private string HashPassword(string password, string passwordEncodeKey)
        {
            if (string.IsNullOrEmpty(password))
                return string.Empty;

            if (passwordEncodeKey == null)
                passwordEncodeKey = string.Empty;

            // Mã hóa mật khẩu bằng bcrypt, kết hợp PasswordEncodeKey
            return BCrypt.Net.BCrypt.HashPassword(password + passwordEncodeKey);
        }
        #endregion

        #region Endpoints
        /// <summary>
        /// Lấy danh sách tài khoản có phân trang và lọc.
        /// GET: /api/accounts?category={category}&amp;keyword={keyword}&amp;page={page}
        /// </summary>
        /// <param name="request">Đối tượng chứa các tham số lọc: category, keyword, page.</param>
        /// <returns>Trả về dữ liệu tài khoản kèm thông tin phân trang; nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        /// <remarks>GET: /api/accounts?category={category}&amp;keyword={keyword}&amp;page={page}</remarks>
        [HttpGet]
        public IActionResult GetAccounts([FromQuery] FilterListRequest request)
        {
            // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ",
                    Data = ModelState.Values
                                     .SelectMany(x => x.Errors)
                                     .Select(x => x.ErrorMessage)
                                     .ToArray()
                });
            }

            try
            {
                // 2. Khởi tạo query để lấy dữ liệu từ bảng Accounts
                IQueryable<Account> query = db.Accounts;

                // 3. Áp dụng bộ lọc theo AccountCategoryID nếu có giá trị
                if (!string.IsNullOrEmpty(request.Category))
                {
                    query = query.Where(x => x.AccountCategoryID == request.Category);
                }

                // 4. Áp dụng bộ lọc theo Username nếu có giá trị
                if (!string.IsNullOrEmpty(request.Keyword))
                {
                    query = query.Where(x => x.Username.ToLower().Contains(request.Keyword.ToLower()));
                }

                // 5. Lấy tổng số lượng bản ghi phù hợp với các bộ lọc hiện tại
                int totalRecords = query.Count();

                // 6. Áp dụng sắp xếp (mặc định theo thời gian tạo mới giảm dần)
                query = query.OrderBy(x => x.Username);

                // 7. Kiểm tra page hợp lệ
                if (request.Page == null || request.Page < 1)
                {
                    request.Page = 1;
                }

                // 8. Áp dụng phân trang
                query = query.Skip((request.Page.Value - 1) * PAGE_SIZE)
                             .Take(PAGE_SIZE);

                // 9. Chọn các thuộc tính cần thiết để trả về
                var dataRaw = query.Select(x => new
                {
                    x.Username,
                    x.AccountCategoryID,
                    x.FullName,
                    x.Avatar,
                    x.Email,
                    x.Mobile,
                    x.Address,
                    x.Status,
                    x.CreateTime,
                    x.UpdateTime,
                    x.PasswordUpdatedTime,
                    x.RefreshTokenCreateTime,
                    x.CreateBy
                }).ToList();

                // 10.Định dạng dữ liệu theo nhu cầu
                var data = dataRaw.Select(x => new
                {
                    x.Username,
                    x.AccountCategoryID,
                    x.FullName,
                    x.Avatar,
                    x.Email,
                    x.Mobile,
                    x.Address,
                    x.Status,
                    CreateTime = x.CreateTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                    UpdateTime = x.UpdateTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                    PasswordUpdatedTime = x.PasswordUpdatedTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                    RefreshTokenCreateTime = x.RefreshTokenCreateTime?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                    x.CreateBy
                });

                // 11. Tạo kết quả
                var response = new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách dữ liệu thành công",
                    Data = new
                    {
                        Accounts = data,
                        TotalRecords = totalRecords,
                        CurrentPage = request.Page,
                        PageSize = PAGE_SIZE
                    }
                };

                // 12. Trả về kết quả
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi trong khi lấy dữ liệu",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Lấy danh sách các tùy chọn tài khoản.
        /// GET: /api/accounts/options
        /// </summary>
        /// <returns>Trả về danh sách các tùy chọn tài khoản (bao gồm Username và FullName); nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        /// <remarks>GET: /api/accounts/options</remarks>
        [HttpGet("options")]
        public IActionResult GetAccountOptions()
        {
            try
            {
                // 1. Truy vấn danh sách tài khoản từ cơ sở dữ liệu
                var data = db.Accounts
                             .OrderBy(x => x.Username)
                             .Select(x => new OptionItemResponse
                             {
                                 Value = x.Username,
                                 Text = x.FullName,
                                 Selected = false
                             });

                // 2. Tạo kết quả
                var response = new ApiResponse
                {
                    Success = true,
                    Message = "Lấy dữ liệu thành công",
                    Data = data
                };

                // 3. Trả về danh sách các tùy chọn tài khoản
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi trong khi lấy dữ liệu",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Lấy thông tin chi tiết của một tài khoản.
        /// GET: /api/accounts/{id}
        /// </summary>
        /// <param name="id">ID của tài khoản cần lấy thông tin.</param>
        /// <returns>Trả về thông tin chi tiết của tài khoản nếu tìm thấy; nếu không, trả về lỗi 404 Not Found.</returns>
        /// <remarks>GET: /api/accounts/{id}</remarks>
        [HttpGet("{id}")]
        public IActionResult GetAccount(string id)
        {
            // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = new[] { "Id không được để trống" }
                });
            }

            try
            {
                // 2. Kiểm tra xem tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountById(id);

                // 3. Nếu không tìm thấy tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy tài khoản.",
                        Data = new[] { $"Không tìm thấy tài khoản với id = {id}." }
                    });
                }

                // 4. Trả về thông tin chi tiết của tài khoản
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy thông tin tài khoản thành công.",
                    Data = GetAccountResponse(item)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi trong khi lấy dữ liệu",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Thêm mới một tài khoản.
        /// POST: /api/accounts
        /// </summary>
        /// <param name="request">Đối tượng chứa thông tin tài khoản cần thêm mới.</param>
        /// <returns>Trả về thông báo thành công và thông tin tài khoản vừa thêm nếu thao tác thành công; nếu không, trả về thông báo lỗi phù hợp (400 Bad Request nếu dữ liệu không hợp lệ).</returns>
        /// <remarks>POST: /api/accounts</remarks>
        [HttpPost]
        public IActionResult AddAccount([FromBody] AccountRequest request)
        {
            // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = ModelState.Values
                                     .SelectMany(x => x.Errors)
                                     .Select(x => x.ErrorMessage)
                                     .ToArray()
                });
            }

            try
            {
                // 2. Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu hay chưa
                var existItem = GetAccountById(request.Username);

                // 3. Nếu tìm thấy tài khoản, trả về lỗi BadRequest
                if (existItem != null)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Đã xảy ra lỗi khi thêm mới tài khoản.",
                        Data = new[] { $"Username: '{request.Username}' đã tồn tại." }
                    });
                }

                // 4. Tạo một PasswordEncodeKey ngẫu nhiên bằng GUID
                string passwordEncodeKey = Guid.NewGuid().ToString();

                // 5. Mã hóa mật khẩu
                string hashedPassword = HashPassword(request.Password, passwordEncodeKey);

                // 6. Lấy ngày hệ thống
                DateTime now = DateTime.Now;

                // 7. Tạo đối tượng tài khoản mới từ dữ liệu đầu vào
                Account item = new Account
                {
                    Username = request.Username,
                    Password = hashedPassword,
                    PasswordEncodeKey = passwordEncodeKey,
                    FullName = request.FullName,
                    Avatar = request.Avatar,
                    Email = request.Email,
                    Mobile = request.Mobile,
                    Address = request.Address,
                    Gender = request.Gender,
                    Status = request.Status,
                    AccountCategoryID = request.AccountCategoryID,
                    CreateTime = now,
                    UpdateTime = now,
                    PasswordUpdatedTime = now,
                    CreateBy = null // Cần lấy CreateBy dựa vào token, lấy username sau
                };

                // 8. Lưu tài khoản vào cơ sở dữ liệu
                db.Accounts.Add(item);
                db.SaveChanges();

                // 9. Trả về thông báo thành công + id đã thêm
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Thêm mới tài khoản thành công.",
                    Data = new
                    {
                        item.Username
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi thêm mới tài khoản.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Cập nhật thông tin của một tài khoản.
        /// PUT: /api/accounts/{id}
        /// </summary>
        /// <param name="id">ID của tài khoản cần cập nhật.</param>
        /// <param name="request">Đối tượng chứa thông tin cập nhật của tài khoản.</param>
        /// <returns>Trả về thông báo thành công nếu cập nhật thành công; nếu không, trả về lỗi (404 Not Found nếu tài khoản không tồn tại).</returns>
        /// <remarks>PUT: /api/accounts/{id}</remarks>
        [HttpPut("{id}")]
        public IActionResult UpdateAccount(string id, [FromBody] AccountRequest request)
        {
            // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = new[] { "Id không được để trống" }
                });
            }

            // 2. Kiểm tra dữ liệu đầu vào cần hợp lệ
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToArray()
                });
            }

            try
            {
                // 3. Kiểm tra xem tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountById(id);

                // 4. Nếu không tìm thấy tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy tài khoản.",
                        Data = new[] { $"Không tìm thấy tài khoản với id = {id}." }
                    });
                }

                // Lấy ngày hệ thống
                DateTime now = DateTime.Now;

                // 5.Cập nhật thông tin tài khoản
                item.FullName = request.FullName;
                item.Avatar = request.Avatar;
                item.Email = request.Email;
                item.Mobile = request.Mobile;
                item.Address = request.Address;
                item.Gender = request.Gender;
                item.Status = request.Status;
                item.AccountCategoryID = request.AccountCategoryID;
                item.UpdateTime = now;

                // 6. Nếu mật khẩu được cập nhật, mã hóa lại mật khẩu
                if (!string.IsNullOrEmpty(request.Password))
                {
                    // Tạo một PasswordEncodeKey ngẫu nhiên mới
                    string newPasswordEncodeKey = Guid.NewGuid().ToString();

                    // Mã hóa mật khẩu mới
                    string newHashedPassword = HashPassword(request.Password, newPasswordEncodeKey);

                    // Cập nhật mật khẩu và PasswordEncodeKey
                    item.Password = newHashedPassword;
                    item.PasswordEncodeKey = newPasswordEncodeKey;
                    item.PasswordUpdatedTime = now;
                }

                // 7. Lưu thay đổi vào cơ sở dữ liệu
                db.SaveChanges();

                // 8. Trả về thông báo thành công
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Cập nhật thông tin tài khoản thành công.",
                    Data = new
                    {
                        item.Username
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi trong khi lấy dữ liệu",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Xóa một tài khoản.
        /// DELETE: /api/accounts/{id}
        /// </summary>
        /// <param name="id">ID của tài khoản cần xóa.</param>
        /// <returns>Trả về thông báo thành công nếu xóa thành công; nếu không, trả về lỗi (404 Not Found nếu tài khoản không tồn tại).</returns>
        /// <remarks>DELETE: /api/accounts/{id}</remarks>
        [HttpDelete("{id}")]
        public IActionResult DeleteAccount(string id)
        {
            // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = new[] { "Id không được để trống" }
                });
            }

            try
            {
                // 2. Kiểm tra xem tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountById(id);

                // 3. Nếu không tìm thấy tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy tài khoản.",
                        Data = new[] { $"Không tìm thấy tài khoản với id = {id}." }
                    });
                }

                // 4. Xóa tài khoản khỏi cơ sở dữ liệu
                db.Accounts.Remove(item);
                db.SaveChanges();

                // 5. Trả về thông báo thành công
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Xóa tài khoản thành công.",
                    Data = new
                    {
                        item.Username
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi xóa tài khoản.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Cập nhật trạng thái của một tài khoản.
        /// PATCH: /api/accounts/{id}/status
        /// </summary>
        /// <param name="id">ID của tài khoản cần cập nhật trạng thái.</param>
        /// <param name="request">Đối tượng chứa trạng thái mới (status).</param>
        /// <returns>Trả về thông báo thành công nếu cập nhật trạng thái thành công; nếu không, trả về lỗi (404 Not Found nếu tài khoản không tồn tại).</returns>
        /// <remarks>PATCH: /api/accounts/{id}/status</remarks>
        [HttpPatch("{id}/status")]
        public IActionResult UpdateAccountStatus(string id, [FromBody] StatusRequest request)
        {
            // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = new[] { "Id không được để trống" }
                });
            }

            // 2. Kiểm tra dữ liệu đầu vào cần hợp lệ
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToArray()
                });
            }

            try
            {
                // 3. Kiểm tra xem tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountById(id);

                // 4. Nếu không tìm thấy tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy tài khoản.",
                        Data = new[] { $"Không tìm thấy tài khoản với id = {id}." }
                    });
                }

                // Lấy ngày hệ thống
                DateTime now = DateTime.Now;

                // 5.Cập nhật thông tin tài khoản
                item.Status = request.Status;
                item.UpdateTime = now;

                // 6. Lưu thay đổi vào cơ sở dữ liệu
                db.SaveChanges();

                // 7. Trả về thông báo thành công
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Cập nhật trạng thái tài khoản thành công.",
                    Data = new
                    {
                        item.Username,
                        item.Status
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi cập nhật trạng thái tài khoản.",
                    Data = new[] { ex.Message }
                });
            }
        }
        #endregion
    }
}
