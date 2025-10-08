using AdminWebApp.Server.Models;
using AdminWebApp.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace AdminWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : ControllerBase
    {
        #region Consts
        private const int PAGE_SIZE = 10;
        #endregion

        #region Variables
        private readonly DBContext _db;
        #endregion

        #region Constructors+DI
        public PlansController(DBContext context)
        {
            _db = context;
        }
        #endregion

        #region Helpers
        /// <summary>
        /// Trả về một kế hoạch có id phù hợp. Nếu không tìm thấy, trả về null.
        /// </summary>
        /// <param name="id">ID của kế hoạch cần lấy thông tin.</param>
        /// <returns>Trả về một kế hoạch có id phù hợp. Nếu không tìm thấy, trả về null.</returns>
        private Plan? GetPlanById(int id)
        {
            return _db.Plans.FirstOrDefault(p => p.PlanId == id);
        }

        /// <summary>
        /// Chuyển đổi một đối tượng có kiểu Plan sang kiểu PlanResponse.
        /// </summary>
        /// <param name="plan">Đối tượng chứa dữ liệu cần chuyển đổi.</param>
        /// <returns>Trả về một đối tượng có kiểu là PlanResponse.</returns>
        private PlanResponse? GetPlanResponse(Plan? plan)
        {
            if (plan == null)
            {
                return null;
            }

            var assignees = _db.TaskAssignees
                .Where(ta => ta.Task != null && ta.Task.PlanId == plan.PlanId)
                .Select(ta => new { ta.EmployeeId, ta.Employee!.FullName })
                .Distinct()
                .ToList();

            var taskCount = _db.TaskDetails
                .Count(td => td.PlanId == plan.PlanId);

            var completedTasks = _db.TaskDetails
                .Count(td => td.PlanId == plan.PlanId && td.Status == "Completed");

            var progress = taskCount > 0 ? (int)((completedTasks / (double)taskCount) * 100) : 0;

            var tagName = plan.Tag ?? "Không có thẻ";

            return new PlanResponse
            {
                PlanId = plan.PlanId,
                PlanName = plan.PlanName ?? string.Empty,
                Description = plan.Description,
                Tag = tagName,
                StartDate = plan.StartDate?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                EndDate = plan.EndDate?.ToString("dd/MM/yyyy HH:mm:ss") ?? string.Empty,
                CreatedById = plan.CreatedById ?? 0,
                CreatedByName = _db.Employees.FirstOrDefault(e => e.EmployeeId == plan.CreatedById)?.FullName ?? string.Empty,
                Status = plan.Status ?? string.Empty,
                Priority = plan.Priority ?? string.Empty,
                Assignees = assignees.Select(a => new AssigneeResponse
                {
                    EmployeeId = a.EmployeeId,
                    FullName = a.FullName ?? string.Empty
                }).ToList(),
                TaskCount = taskCount,
                Progress = progress
            };
        }
        #endregion

        #region Endpoints
        /// <summary>
        /// Lấy toàn bộ danh sách kế hoạch.
        /// GET: /api/plans/all
        /// </summary>
        /// <returns>Trả về toàn bộ danh sách kế hoạch; nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        [HttpGet("all")]
        public IActionResult GetAllPlans()
        {
            try
            {
                var dataRaw = _db.Plans.OrderBy(x => x.PlanName).ToList();
                var data = dataRaw.Select(x => GetPlanResponse(x)).ToList();
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy toàn bộ danh sách kế hoạch thành công.",
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách kế hoạch.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Lấy danh sách người thực hiện từ các kế hoạch.
        /// GET: /api/plans/assignees
        /// </summary>
        /// <returns>Trả về danh sách người thực hiện (EmployeeId và FullName); nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        [HttpGet("assignees")]
        public IActionResult GetAssignees()
        {
            try
            {
                var data = _db.TaskAssignees
                    .Include(ta => ta.Employee)
                    .Where(ta => ta.Employee != null && ta.Employee.Status == true)
                    .Select(ta => new OptionItemResponse
                    {
                        Value = ta.EmployeeId.ToString(),
                        Text = ta.Employee!.FullName,
                        Selected = false
                    })
                    .Distinct()
                    .OrderBy(x => x.Text)
                    .ToList();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách người thực hiện thành công.",
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách người thực hiện.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Lấy danh sách thẻ duy nhất từ bảng Plans.
        /// GET: /api/plans/tags
        /// </summary>
        /// <returns>Trả về danh sách các thẻ duy nhất; nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        [HttpGet("tags")]
        public IActionResult GetTags()
        {
            try
            {
                var data = _db.Plans
                    .Where(p => p.Tag != null)
                    .Select(p => new OptionItemResponse
                    {
                        Value = p.Tag,
                        Text = p.Tag,
                        Selected = false
                    })
                    .Distinct()
                    .OrderBy(x => x.Text)
                    .ToList();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách thẻ thành công.",
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách thẻ.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Lấy danh sách kế hoạch có phân trang và lọc.
        /// GET: /api/plans?tag={tag}&keyword={keyword}&page={page}
        /// </summary>
        /// <param name="request">Đối tượng chứa các tham số lọc: tag, keyword, page.</param>
        /// <returns>Trả về danh sách kế hoạch kèm thông tin phân trang; nếu xảy ra lỗi, trả về thông báo lỗi tương ứng.</returns>
        [HttpGet]
        public IActionResult GetPlans([FromQuery] FilterListPlanRequest request)
        {
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
                IQueryable<Plan> query = _db.Plans;

                if (!string.IsNullOrEmpty(request.Tag))
                {
                    query = query.Where(x => x.Tag == request.Tag);
                }

                if (!string.IsNullOrEmpty(request.Keyword))
                {
                    var keyword = $"%{request.Keyword.ToLower()}%";
                    query = query.Where(x => EF.Functions.Like(x.PlanName!.ToLower(),x.Priority!.ToLower(), keyword));
                }
              
                if (!string.IsNullOrEmpty(request.AssigneeId))
                {
                    query = query.Where(x => _db.TaskAssignees
                        .Any(ta => ta.Task != null && ta.Task.PlanId == x.PlanId && ta.EmployeeId.ToString() == request.AssigneeId));
                }

                int totalRecords = query.Count();
                query = query.OrderBy(x => x.PlanName);

                if (request.Page == null || request.Page < 1)
                {
                    request.Page = 1;
                }

                query = query.Skip((request.Page.Value - 1) * PAGE_SIZE)
                            .Take(PAGE_SIZE);

                var dataRaw = query.ToList();
                var data = dataRaw.Select(x => GetPlanResponse(x)).ToList();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách kế hoạch thành công",
                    Data = new
                    {
                        Plans = data,
                        TotalRecords = totalRecords,
                        CurrentPage = request.Page,
                        PageSize = PAGE_SIZE
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách kế hoạch.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Thêm mới một kế hoạch.
        /// POST: /api/plans
        /// </summary>
        /// <param name="request">Đối tượng chứa thông tin kế hoạch cần thêm mới.</param>
        /// <returns>Trả về thông báo thành công và thông tin kế hoạch vừa thêm nếu thao tác thành công; nếu không, trả về thông báo lỗi phù hợp.</returns>
        [HttpPost]
        public async Task<IActionResult> AddPlan([FromBody] PlanRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToArray()
                });
            }

            try
            {
                var creator = await _db.Employees.FindAsync(request.CreatedById);
                if (creator == null)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Người khởi tạo không tồn tại.",
                        Data = new[] { $"Không tìm thấy nhân viên với ID = {request.CreatedById}." }
                    });
                }

                var plan = new Plan
                {
                    PlanName = request.PlanName,
                    Description = request.Description,
                    Tag = request.Tag,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    CreatedById = request.CreatedById,
                    Status = request.Status,
                    Priority = request.Priority
                };

                _db.Plans.Add(plan);
                await _db.SaveChangesAsync();

                if (request.TaskCount > 0)
                {
                    for (int i = 1; i <= request.TaskCount; i++)
                    {
                        var taskDetail = new TaskDetail
                        {
                            PlanId = plan.PlanId,
                            TaskName = $"Tác vụ {i} cho kế hoạch {plan.PlanName}",
                            Status = "Not Started",
                            Priority = request.Priority,
                            StartDate = request.StartDate,
                            EndDate = request.EndDate
                        };
                        _db.TaskDetails.Add(taskDetail);
                    }
                    await _db.SaveChangesAsync();
                }

                if (request.Assignees != null && request.Assignees.Any())
                {
                    var taskDetails = await _db.TaskDetails
                        .Where(td => td.PlanId == plan.PlanId)
                        .ToListAsync();

                    foreach (var employeeId in request.Assignees)
                    {
                        var employee = await _db.Employees.FindAsync(employeeId);
                        if (employee != null)
                        {
                            foreach (var taskDetail in taskDetails)
                            {
                                var taskAssignee = new TaskAssignees
                                {
                                    TaskId = taskDetail.TaskId,
                                    EmployeeId = employeeId
                                };
                                _db.TaskAssignees.Add(taskAssignee);
                            }
                        }
                    }
                    await _db.SaveChangesAsync();
                }

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Thêm mới kế hoạch thành công.",
                    Data = new
                    {
                        plan.PlanId
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi thêm mới kế hoạch.",
                    Data = new[] { ex.Message }
                });
            }
        }
        /// <summary>
        /// Thêm mới một tác vụ cho kế hoạch.
        /// POST: /api/task-details
        /// </summary>
        /// <param name="request">Đối tượng chứa thông tin tác vụ cần thêm mới.</param>
        /// <returns>Trả về thông báo thành công và thông tin tác vụ vừa thêm nếu thao tác thành công; nếu không, trả về thông báo lỗi phù hợp.</returns>
        [HttpPost("task-details")]
        public async Task<IActionResult> AddTaskDetail([FromForm] TaskDetailRequest request)
        {
            // Log received data
            Console.WriteLine($"Received: PlanId={request.PlanId}, CreatedById={request.CreatedById}, TaskName={request.TaskName}");
            Console.WriteLine($"Assignees: {string.Join(",", request.Assignees ?? new List<int>())}");
            if (request.Attachment != null)
            {
                Console.WriteLine($"Attachment: {request.Attachment.FileName}, Size: {request.Attachment.Length}");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = errors
                });
            }

            try
            {
                // Validate PlanId
                var plan = await _db.Plans.FindAsync(request.PlanId);
                if (plan == null)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Kế hoạch không tồn tại.",
                        Data = new[] { $"Không tìm thấy kế hoạch với ID = {request.PlanId}." }
                    });
                }

                // Validate CreatedById
                var creator = await _db.Employees.FindAsync(request.CreatedById);
                if (creator == null)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Người khởi tạo không tồn tại hoặc không hoạt động.",
                        Data = new[] { $"Không tìm thấy nhân viên với ID = {request.CreatedById}." }
                    });
                }

                // Validate dates
                if (request.StartDate.HasValue && request.EndDate.HasValue && request.StartDate > request.EndDate)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Ngày bắt đầu không được lớn hơn ngày kết thúc."
                    });
                }

                // Handle file attachment
                string? attachmentPath = null;
                if (request.Attachment != null)
                {
                    var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
                    var extension = Path.GetExtension(request.Attachment.FileName).ToLower();
                    if (!allowedExtensions.Contains(extension))
                    {
                        return BadRequest(new ApiResponse
                        {
                            Success = false,
                            Message = "File không hợp lệ. Chỉ hỗ trợ PDF, DOC, DOCX."
                        });
                    }

                    if (request.Attachment.Length > 4 * 1024 * 1024) // 4MB
                    {
                        return BadRequest(new ApiResponse
                        {
                            Success = false,
                            Message = "File đính kèm không được vượt quá 4MB."
                        });
                    }

                    var uploadsFolder = Path.Combine("wwwroot", "FileUploads");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(request.Attachment.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.Attachment.CopyToAsync(stream);
                    }
                    attachmentPath = $"/FileUploads/{fileName}";
                }

                // Save TaskDetail
                var taskDetail = new TaskDetail
                {
                    PlanId = request.PlanId,
                    TaskName = request.TaskName,
                    Description = request.Description,
                    Requirement = request.Requirement,
                    Category = request.Category,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    CreatedById = request.CreatedById,
                    Status = request.Status ?? "Not Started",
                    Priority = request.Priority ?? "Trung bình",
                    AttachmentPath = attachmentPath,
                 
                    TaskAssignees = new List<TaskAssignees>()
                };

                _db.TaskDetails.Add(taskDetail);
                await _db.SaveChangesAsync();
                Console.WriteLine($"Saved TaskDetail with TaskId: {taskDetail.TaskId}");

                // Save TaskAssignees
                if (request.Assignees != null && request.Assignees.Any())
                {
                    foreach (var employeeId in request.Assignees)
                    {
                        var employee = await _db.Employees.FindAsync(employeeId);
                        if (employee == null)
                        {
                            return BadRequest(new ApiResponse
                            {
                                Success = false,
                                Message = $"Người thực hiện với ID = {employeeId} không tồn tại hoặc không hoạt động."
                            });
                        }
                        var taskAssignee = new TaskAssignees // Fixed typo from TaskAssignees
                        {
                            TaskId = taskDetail.TaskId,
                            EmployeeId = employeeId
                        };
                        _db.TaskAssignees.Add(taskAssignee);
                        Console.WriteLine($"Adding TaskAssignee: TaskId={taskAssignee.TaskId}, EmployeeId={taskAssignee.EmployeeId}");
                    }
                    await _db.SaveChangesAsync();
                    Console.WriteLine("Saved TaskAssignees successfully");
                }

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Thêm mới tác vụ thành công.",
                    Data = new { taskDetail.TaskId }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddTaskDetail: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi thêm mới tác vụ.",
                    Data = new[] { ex.Message, ex.InnerException?.Message ?? "" }
                });
            }
        }
        /// <summary>
        /// Lấy thông tin chi tiết của một kế hoạch.
        /// GET: /api/plans/{id}
        /// </summary>
        /// <param name="id">ID của kế hoạch cần lấy thông tin.</param>
        /// <returns>Trả về thông tin chi tiết của kế hoạch nếu tìm thấy; nếu không, trả về lỗi 404 Not Found.</returns>
        [HttpGet("{id}")]
        public IActionResult GetPlan(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = new[] { "ID không hợp lệ." }
                });
            }

            try
            {
                var plan = GetPlanById(id);
                if (plan == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy kế hoạch.",
                        Data = new[] { $"Không tìm thấy kế hoạch với ID = {id}." }
                    });
                }

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy thông tin kế hoạch thành công.",
                    Data = GetPlanResponse(plan)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy thông tin kế hoạch.",
                    Data = new[] { ex.Message }
                });
            }
        }
        // Endpoint mới: Lấy danh sách TaskDetails theo PlanId
        [HttpGet("{planId}/task-details")]
        public async Task<IActionResult> GetTaskDetails(int planId)
        {
            try
            {
                var plan = await _db.Plans.FindAsync(planId);
                if (plan == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Kế hoạch không tồn tại.",
                        Data = new[] { $"Không tìm thấy kế hoạch với ID = {planId}." }
                    });
                }

                var taskDetails = await _db.TaskDetails
                    .Where(td => td.PlanId == planId)
           
                    .Include(td => td.TaskAssignees)
                        .ThenInclude(ta => ta.Employee)
                    .Select(td => new
                    {
                        td.TaskId,
                        td.PlanId,
                        td.TaskName,
                        td.Description,
                        td.Requirement,
                        td.Category,
                        td.StartDate,
                        td.EndDate,
                        td.Status,
                        td.Priority,
                        td.AttachmentPath,
                      
                        Assignees = td.TaskAssignees.Select(ta => new
                        {
                            ta.EmployeeId,
                            EmployeeName = ta.Employee != null ? ta.Employee.FullName : "Không xác định"
                        }).ToList()
                    })
                    .ToListAsync();
                
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Lấy danh sách chi tiết kế hoạch thành công.",
                    Data = taskDetails
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi lấy danh sách chi tiết kế hoạch.",
                    Data = new[] { ex.Message, ex.InnerException?.Message ?? "" }
                });
            }
        }

        /// <summary>
        /// Cập nhật trạng thái của một kế hoạch.
        /// PUT: /api/plans/{id}/status
        /// </summary>
        /// <param name="id">ID của kế hoạch cần cập nhật.</param>
        /// <param name="request">Đối tượng chứa trạng thái mới.</param>
        /// <returns>Trả về thông báo thành công nếu cập nhật thành công; nếu không, trả về thông báo lỗi.</returns>
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdatePlanStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToArray()
                });
            }

            try
            {
                var plan = await _db.Plans.FindAsync(id);
                if (plan == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Không tìm thấy kế hoạch.",
                        Data = new[] { $"Không tìm thấy kế hoạch với ID = {id}." }
                    });
                }

                if (!new[] { "Not Started", "In Progress", "Completed" }.Contains(request.Status))
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Trạng thái không hợp lệ.",
                        Data = new[] { "Trạng thái phải là 'Not Started', 'In Progress' hoặc 'Completed'." }
                    });
                }

                plan.Status = request.Status;
                await _db.SaveChangesAsync();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Cập nhật trạng thái kế hoạch thành công.",
                    Data = null
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi cập nhật trạng thái kế hoạch.",
                    Data = new[] { ex.Message }
                });
            }
        }

        /// <summary>
        /// Xóa một kế hoạch.
        /// DELETE: /api/plans/{id}
        /// </summary>
        /// <param name="id">ID của kế hoạch cần xóa.</param>
        /// <returns>Trả về thông báo thành công nếu xóa thành công; nếu không, trả về thông báo lỗi.</returns>

        // DELETE: api/plans/{planId}
       
        [HttpDelete("{planId}")]
        public async Task<IActionResult> DeletePlan(int planId)
        {
            try
            {
                var plan = await _db.Plans.FindAsync(planId);
                if (plan == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Kế hoạch không tồn tại.",
                        Data = new[] { $"Không tìm thấy kế hoạch với ID = {planId}." }
                    });
                }

                // Delete related TaskAssignees and TaskDetails
                var tasks = await _db.TaskDetails.Where(t => t.PlanId == planId).ToListAsync();
                foreach (var task in tasks)
                {
                    var assignees = await _db.TaskAssignees.Where(ta => ta.TaskId == task.TaskId).ToListAsync();
                    _db.TaskAssignees.RemoveRange(assignees);
                }
                _db.TaskDetails.RemoveRange(tasks);

                // Delete the plan
                _db.Plans.Remove(plan);
                await _db.SaveChangesAsync();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Xóa kế hoạch thành công.",
                    Data = null
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeletePlan: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi xóa kế hoạch.",
                    Data = new[] { ex.Message, ex.InnerException?.Message ?? "" }
                });
            }
        }

        // DELETE: api/tasks/{taskId}
        [HttpDelete("tasks/{taskId}")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            try
            {
                var task = await _db.TaskDetails.FindAsync(taskId);
                if (task == null)
                {
                    Console.WriteLine($"Task with ID {taskId} not found in TaskDetails.");
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "Nhiệm vụ không tồn tại.",
                        Data = new[] { $"Không tìm thấy nhiệm vụ với ID = {taskId}." }
                    });
                }

                // Delete related TaskAssignees
                var assignees = await _db.TaskAssignees.Where(ta => ta.TaskId == taskId).ToListAsync();
                if (assignees.Any())
                {
                    Console.WriteLine($"Removing {assignees.Count} assignees for TaskId {taskId}.");
                    _db.TaskAssignees.RemoveRange(assignees);
                }

                // Delete the task
                _db.TaskDetails.Remove(task);
                await _db.SaveChangesAsync();

                Console.WriteLine($"Task with ID {taskId} deleted successfully.");
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Xóa nhiệm vụ thành công.",
                    Data = null
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeleteTask: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Đã xảy ra lỗi khi xóa nhiệm vụ.",
                    Data = new[] { ex.Message, ex.InnerException?.Message ?? "" }
                });
            }
        }
        #endregion
    }
}