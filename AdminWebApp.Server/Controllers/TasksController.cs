using AdminWebApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

public class ApiResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public object Data { get; set; }
}

[Route("api/tasks")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly DBContext _db;

    public TasksController(DBContext db)
    {
        _db = db;
    }

    // DELETE: api/tasks/{taskId}
    [HttpDelete("{taskId}")]
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
}