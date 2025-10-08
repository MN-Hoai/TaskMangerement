using AdminWebApp.Server.Models;
using AdminWebApp.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AdminWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/account-categories")]
    public class AccountCategoryController : ControllerBase
    {
        #region Consts
        private const int PAGE_SIZE = 10;
        #endregion

        #region Variables
        private DBContext db;
        #endregion

        #region Constructors+DI
        public AccountCategoryController(DBContext context)
        {
            db = context;
        }
        #endregion

        #region Helpers
        /// <summary>
        /// Trả về 1 thể loại tài khoản có id phù hợp. Nếu không tìm thấy, trả về null.
        /// </summary>
        /// <param name="id">ID của thể loại tài khoản cần lấy thông tin.</param>
        /// <returns>Trả về 1 thể loại tài khoản có id phù hợp. Nếu không tìm thấy, trả về null.</returns>
        private AccountCategory? GetAccountCategoryById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return null;
            }

            return db.AccountCategories.FirstOrDefault(x => x.AccountCategoryID == id);
        }

        /// <summary>
        /// Chuyển đổi 1 đối tượng có kiểu AccountCategory sang kiểu AccountCategoryResponse.
        /// </summary>
        /// <param name="accountCategory">Đối tượng chứa dữ liệu cần chuyển đổi.</param>
        /// <returns>Trả về 1 đối tượng có kiểu là AccountCategoryResponse.</returns>
        private AccountCategoryResponse? GetAccountCategoryResponse(AccountCategory? accountCategory)
        {
            // Nếu accountCategory là null, trả về null
            if (accountCategory == null)
            {
                return null;
            }

            // Tạo và trả về một đối tượng AccountCategoryResponse từ accountCategory
            return new AccountCategoryResponse
            {
                AccountCategoryID = accountCategory.AccountCategoryID ?? string.Empty,
                Title = accountCategory.Title ?? string.Empty,
                Description = accountCategory.Description ?? string.Empty,
                Avatar = accountCategory.Avatar ?? string.Empty,
                Status = accountCategory.Status,
                Position = accountCategory.Position
            };
        }
        #endregion

        #region Endpoints
        /// <summary>
        /// Lấy danh sách danh mục tài khoản có phân trang và lọc.
        /// </summary>
        /// <param name="request">Đối tượng chứa dữ liệu lọc.</param>
        /// <returns>Trả về danh sách danh mục tài khoản phù hợp với dữ liệu lọc.</returns>
        /// <remarks>GET: /api/account-categories?category={category}&amp;keyword={keyword}&amp;page={page}</remarks>
        [HttpGet]
        public IActionResult GetAccountCategories([FromQuery] FilterListRequest request)
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
                // 2. Khởi tạo query để lấy dữ liệu từ bảng AccountCategories
                IQueryable<AccountCategory> query = db.AccountCategories;

                // 3. Áp dụng bộ lọc theo Title nếu có giá trị
                if (!string.IsNullOrEmpty(request.Keyword))
                {
                    query = query.Where(x => x.Title.ToLower().Contains(request.Keyword.ToLower()));
                }

                // 4. Lấy tổng số lượng bản ghi phù hợp với các bộ lọc hiện tại
                int totalRecords = query.Count();

                // 5. Áp dụng sắp xếp (mặc định theo thời gian tạo mới giảm dần)
                query = query.OrderBy(x => x.Position);

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
                    x.AccountCategoryID,
                    x.Title,
                    x.Description,
                    x.Avatar,
                    x.Status,
                    x.Position
                }).ToList();

                // 10.Định dạng dữ liệu theo nhu cầu
                var data = dataRaw.Select(x => new
                {
                    x.AccountCategoryID,
                    x.Title,
                    x.Description,
                    x.Avatar,
                    x.Status,
                    x.Position
                });

                // 11. Tạo kết quả
                var response = new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách dữ liệu thành công",
                    Data = new
                    {
                        AccountCategories = data,
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
        /// Lấy danh sách các tùy chọn danh mục tài khoản.
        /// </summary>
        /// <returns>Trả về danh sách các tùy chọn danh mục tài khoản.</returns>
        /// <remarks>GET: /api/account-categories/options</remarks>
        [HttpGet("options")]
        public IActionResult GetAccountCategoryOptions()
        {
            try
            {
                // 1. Truy vấn danh sách thể loại tài khoản từ cơ sở dữ liệu
                var data = db.AccountCategories
                             .OrderBy(x => x.Position)
                             .Select(x => new OptionItemResponse
                             {
                                 Value = x.AccountCategoryID,
                                 Text = x.Title,
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
        /// Lấy thông tin chi tiết của 1 danh mục tài khoản.
        /// </summary>
        /// <param name="id">Username của danh mục tài khoản cần xem chi tiết.</param>
        /// <returns>Trả về thông tin chi tiết của 1 danh mục tài khoản.</returns>
        /// <remarks>GET: /api/account-categories/{id}</remarks>
        [HttpGet("{id}")]
        public IActionResult GetAccountCategory(string id)
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
                // 2. Kiểm tra xem thể loại tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountCategoryById(id);

                // 3. Nếu không tìm thấy thể loại tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy thể loại tài khoản.",
                        Data = new[] { $"Không tìm thấy thể loại tài khoản với id = {id}." }
                    });
                }

                // 4. Trả về thông tin chi tiết của tài khoản
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy thông tin thể loại tài khoản thành công.",
                    Data = GetAccountCategoryResponse(item)
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
        /// Thêm mới một danh mục tài khoản.
        /// </summary>
        /// <param name="request">Đối tượng chứa dữ liệu danh mục tài khoản cần thêm</param>
        /// <returns>Trả về kết quả thêm danh mục tài khoản thành công/không thành công.</returns>
        /// <remarks>POST: /api/account-categories</remarks>
        [HttpPost]
        public IActionResult AddAccountCategory([FromBody] AccountCategoryRequest request)
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
                // 2. Kiểm tra xem id đã tồn tại trong cơ sở dữ liệu hay chưa
                var existItem = GetAccountCategoryById(request.AccountCategoryID);

                // 3. Nếu tìm thấy thể loại tài khoản, trả về lỗi BadRequest
                if (existItem != null)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Đã xảy ra lỗi khi thêm mới thể loại tài khoản.",
                        Data = new[] { $"Id: '{request.AccountCategoryID}' đã tồn tại." }
                    });
                }

                // 4. Lấy ngày hệ thống
                DateTime now = DateTime.Now;

                // 5. Tạo đối tượng thể loại tài khoản mới từ dữ liệu đầu vào
                AccountCategory item = new AccountCategory
                {
                    AccountCategoryID = request.AccountCategoryID,
                    Title = request.Title,
                    Description = request.Description,
                    Avatar = request.Avatar,
                    Status = request.Status,
                    Position = request.Position
                };

                // 8. Lưu thể loại tài khoản vào cơ sở dữ liệu
                db.AccountCategories.Add(item);
                db.SaveChanges();

                // 9. Trả về thông báo thành công + id đã thêm
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Thêm mới thể loại tài khoản thành công.",
                    Data = new
                    {
                        item.AccountCategoryID
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi thêm mới thể loại tài khoản.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Cập nhật thông tin một danh mục tài khoản.
        /// </summary>
        /// <param name="id">Username của danh mục tài khoản cần cập nhật.</param>
        /// <param name="request">Đối tượng chứa thông tin danh mục tài khoản cần cập nhật.</param>
        /// <returns>Trả về kết quả cập nhật thành công/không thành công.</returns>
        /// <remarks>PUT: /api/account-categories/{id}</remarks>
        [HttpPut("{id}")]
        public IActionResult UpdateAccountCategory(string id, [FromBody] AccountCategoryRequest request)
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
                // 3. Kiểm tra xem thể loại tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountCategoryById(id);

                // 4. Nếu không tìm thấy thể loại tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy thể loại tài khoản.",
                        Data = new[] { $"Không tìm thấy thể loại tài khoản với id = {id}." }
                    });
                }

                // 5. Lấy ngày hệ thống
                DateTime now = DateTime.Now;

                // 6.Cập nhật thông tin tài khoản
                item.Title = request.Title;
                item.Description = request.Description;
                item.Avatar = request.Avatar;
                item.Status = request.Status;
                item.Position = request.Position;

                // 7. Lưu thay đổi vào cơ sở dữ liệu
                db.SaveChanges();

                // 8. Trả về thông báo thành công
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Cập nhật thông tin thể loại tài khoản thành công.",
                    Data = new
                    {
                        item.AccountCategoryID
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
        /// Xóa một danh mục tài khoản
        /// </summary>
        /// <param name="id">Username của danh mục tài khoản cần xóa.</param>
        /// <returns>Trả về kết quả xóa danh mục tài khoản thành công/không thành công.</returns>
        /// <remarks>DELETE: /api/account-categories/{id}</remarks>
        [HttpDelete("{id}")]
        public IActionResult DeleteAccountCategory(string id)
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
                // 2. Kiểm tra xem thể loại tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountCategoryById(id);

                // 3. Nếu không tìm thấy thể loại tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy thể loại tài khoản.",
                        Data = new[] { $"Không tìm thấy thể loại tài khoản với id = {id}." }
                    });
                }

                // 4. Xóa tài khoản khỏi cơ sở dữ liệu
                db.AccountCategories.Remove(item);
                db.SaveChanges();

                // 5. Trả về thông báo thành công
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Xóa thể loại tài khoản thành công.",
                    Data = new
                    {
                        item.AccountCategoryID
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi xóa thể loại tài khoản.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Cập nhật trạng thái cho 1 danh mục tài khoản.
        /// </summary>
        /// <param name="id">Username của danh mục tài khoản cần cập nhật.</param>
        /// <param name="request">Đối tượng chứa thông tin cần cập nhật.</param>
        /// <returns>Trả về kết quả cập nhật thành công/không thành công.</returns>
        /// <remarks>PATCH: /api/account-categories/{id}</remarks>
        [HttpPatch("{id}/status")]
        public IActionResult UpdateAccountCategoryStatus(string id, [FromBody] StatusRequest request)
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
                // 3. Kiểm tra xem thể loại tài khoản có tồn tại trong cơ sở dữ liệu hay không
                var item = GetAccountCategoryById(id);

                // 4. Nếu không tìm thấy thể loại tài khoản, trả về lỗi 404
                if (item == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy thể loạitài khoản.",
                        Data = new[] { $"Không tìm thấy thể loại tài khoản với id = {id}." }
                    });
                }

                // Lấy ngày hệ thống
                DateTime now = DateTime.Now;

                // 5.Cập nhật thông tin tài khoản
                item.Status = request.Status;

                // 6. Lưu thay đổi vào cơ sở dữ liệu
                db.SaveChanges();

                // 7. Trả về thông báo thành công
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Cập nhật trạng thái thể loại tài khoản thành công.",
                    Data = new
                    {
                        item.AccountCategoryID,
                        item.Status
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi cập nhật trạng thái thể loại tài khoản.",
                    Data = new[] { ex.Message }
                });
            }
        }
        #endregion
    }
}
