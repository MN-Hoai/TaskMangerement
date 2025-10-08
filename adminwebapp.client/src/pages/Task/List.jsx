import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";
import ActionMenu from "../../components/ActionMenu";
import TaskActionMenu from "../../components/TaskActionMenu";
import dayjs from "dayjs";

const List = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [filters, setFilters] = useState({
        keyword: "",
        tag: "",
        assigneeId: "",
        priority: "",
        status: "",
    });
    const [tagOptions, setTagOptions] = useState([]);
    const [assigneeOptions, setAssigneeOptions] = useState([]);
    const [taskDetails, setTaskDetails] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);

    // Lấy danh sách thẻ từ bảng Plans
    const loadTagOptions = useCallback(async () => {
        try {
            const response = await fetch("/api/plans/tags");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setTagOptions(result.data);
            } else {
                toast.error("Lỗi khi tải danh sách thẻ!");
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách thẻ!");
            console.error("Lỗi khi tải danh sách thẻ:", error);
        }
    }, []);

    // Lấy danh sách người thực hiện
    const loadAssigneeOptions = useCallback(async () => {
        try {
            const response = await fetch("/api/plans/assignees");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setAssigneeOptions(result.data);
            } else {
                toast.error("Lỗi khi tải danh sách người thực hiện!");
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách người thực hiện!");
            console.error("Lỗi khi tải danh sách người thực hiện:", error);
        }
    }, []);

    // Lấy toàn bộ danh sách kế hoạch
    const loadPlans = useCallback(async () => {
        try {
            const response = await fetch("/api/plans/all");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setPlans(result.data);
                setFilteredPlans(result.data);
            } else {
                toast.error("Lỗi khi tải danh sách kế hoạch!");
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách kế hoạch!");
            console.error("Lỗi khi tải danh sách kế hoạch:", error);
        }
    }, []);

    // Lấy danh sách chi tiết kế hoạch theo PlanId
    const loadTaskDetails = useCallback(async (planId) => {
        try {
            const response = await fetch(`/api/plans/${planId}/task-details`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setTaskDetails(result.data);
                setSelectedPlanId(planId);
            } else {
                toast.error(`Lỗi khi tải chi tiết kế hoạch: ${result.message}`);
            }
        } catch (error) {
            toast.error(`Lỗi khi tải chi tiết kế hoạch: ${error.message}`);
            console.error("Lỗi khi tải chi tiết kế hoạch:", error);
        }
    }, []);

    // Xóa nhiệm vụ
    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Bạn có chắc muốn xóa nhiệm vụ này?")) {
            console.log(`Attempting to delete task with ID: ${taskId}`);
            try {
                const response = await fetch(`/api/tasks/${taskId}`, { // Changed from /api/plans/tasks
                    method: "DELETE",
                });
                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    let errorMessage = `HTTP error! status: ${response.status}`;
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        console.log("Error response:", errorData);
                        errorMessage = errorData.message || errorMessage;
                    } else {
                        const errorText = await response.text();
                        errorMessage = errorText || errorMessage;
                    }
                    throw new Error(errorMessage);
                }
                const contentType = response.headers.get("content-type");
                let result;
                if (contentType && contentType.includes("application/json") && response.status !== 204) {
                    result = await response.json();
                    if (!result.success) {
                        throw new Error(result.message || "Xóa nhiệm vụ thất bại.");
                    }
                }
                toast.success("Xóa nhiệm vụ thành công!");
                if (selectedPlanId) {
                    loadTaskDetails(selectedPlanId);
                }
            } catch (error) {
                toast.error(`Lỗi khi xóa nhiệm vụ: ${error.message}`);
                console.error("Lỗi khi xóa nhiệm vụ:", error);
            }
        }
    };

    // Xem chi tiết nhiệm vụ
    const handleViewTask = (taskId) => {
        const task = taskDetails.find(t => t.taskId === taskId);
        setSelectedTask(task);
        setShowTaskModal(true);
    };

    // Chỉnh sửa nhiệm vụ
    const handleEditTask = (taskId) => {
        navigate(`/task/edit/${taskId}`);
    };

    // Đóng modal chi tiết nhiệm vụ
    const handleCloseTaskModal = () => {
        setShowTaskModal(false);
        setSelectedTask(null);
    };

    // Lọc danh sách kế hoạch phía client
    const filterPlans = useCallback(() => {
        let filtered = [...plans];

        if (filters.keyword) {
            filtered = filtered.filter((plan) =>
                plan.planName.toLowerCase().includes(filters.keyword.toLowerCase())
            );
        }

        if (filters.tag) {
            filtered = filtered.filter((plan) => plan.tag === filters.tag);
        }

        if (filters.assigneeId) {
            filtered = filtered.filter((plan) =>
                plan.assignees.some((assignee) => assignee.employeeId.toString() === filters.assigneeId)
            );
        }

        if (filters.priority) {
            filtered = filtered.filter((plan) => plan.priority === filters.priority);
        }

        if (filters.status) {
            filtered = filtered.filter((plan) => plan.status === filters.status);
        }

        setFilteredPlans(filtered);
    }, [plans, filters]);

    useEffect(() => {
        loadTagOptions();
        loadAssigneeOptions();
        loadPlans();
    }, [loadTagOptions, loadAssigneeOptions, loadPlans]);

    useEffect(() => {
        filterPlans();
    }, [filters, filterPlans]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPlan = () => {
        navigate("/task-add-plan");
    };

    const handleAddDetailPlan = () => {
        navigate("/task-add-detail-plan");
    };

    const handleViewPlan = (planId) => {
        setSelectedPlanId(planId);
        loadTaskDetails(planId);
    };

    const handleEditPlan = (planId) => {
        navigate(`/plan/edit/${planId}`);
    };

    const handleDeletePlan = async (planId) => {
        if (window.confirm("Bạn có chắc muốn xóa kế hoạch này?")) {
            console.log(`Attempting to delete plan with ID: ${planId}`);
            try {
                const response = await fetch(`/api/plans/${planId}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    let errorMessage = `HTTP error! status: ${response.status}`;
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        console.log("Error response:", errorData);
                        errorMessage = errorData.message || errorMessage;
                    } else {
                        const errorText = await response.text();
                        errorMessage = errorText || errorMessage;
                    }
                    throw new Error(errorMessage);
                }
                const contentType = response.headers.get("content-type");
                let result;
                if (contentType && contentType.includes("application/json") && response.status !== 204) {
                    result = await response.json();
                    if (!result.success) {
                        throw new Error(result.message || "Xóa kế hoạch thất bại.");
                    }
                }
                toast.success("Xóa kế hoạch thành công!");
                loadPlans();
                if (selectedPlanId === planId) {
                    setTaskDetails([]);
                    setSelectedPlanId(null);
                }
            } catch (error) {
                toast.error(`Lỗi khi xóa kế hoạch: ${error.message}`);
                console.error("Lỗi khi xóa kế hoạch:", error);
            }
        }
    };

    const handleActivatePlan = async (planId) => {
        try {
            const response = await fetch(`/api/plans/${planId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "In Progress" }),
            });
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorMessage = `HTTP error! status: ${response.status}`;
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }
            const result = await response.json();
            if (result.success) {
                toast.success("Kích hoạt kế hoạch thành công!");
                loadPlans();
            } else {
                toast.error("Lỗi khi kích hoạt kế hoạch: " + result.message);
            }
        } catch (error) {
            toast.error(`Lỗi khi kích hoạt kế hoạch: ${error.message}`);
            console.error("Lỗi khi kích hoạt kế hoạch:", error);
        }
    };

    const handleDeactivatePlan = async (planId) => {
        try {
            const response = await fetch(`/api/plans/${planId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "Completed" }),
            });
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorMessage = `HTTP error! status: ${response.status}`;
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }
            const result = await response.json();
            if (result.success) {
                toast.success("Tạm khóa kế hoạch thành công!");
                loadPlans();
            } else {
                toast.error("Lỗi khi tạm khóa kế hoạch: " + result.message);
            }
        } catch (error) {
            toast.error(`Lỗi khi tạm khóa kế hoạch: ${error.message}`);
            console.error("Lỗi khi tạm khóa kế hoạch:", error);
        }
    };

    // Group tasks by category
    const groupedTasks = taskDetails.reduce((acc, task) => {
        const category = task.category || "No Category";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(task);
        return acc;
    }, {});

    // Sort tasks within each category by taskName
    Object.keys(groupedTasks).forEach((category) => {
        groupedTasks[category].sort((a, b) => a.taskName.localeCompare(b.taskName));
    });

    // Get unique categories for columns
    const categories = Object.keys(groupedTasks);

    return (
        <>
            <title>Danh sách kế hoạch</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>Danh sách công việc</HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        <div className="content-main">
                            <div className="kanban-header  justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">
                                    Chi tiết kế hoạch: {plans.find(p => p.planId === selectedPlanId)?.planName || "Không xác định"}
                                </h5>
                            </div>
                            <div className="mb-4 d-flex flex-wrap align-items-center gap-3">
                                <input
                                    type="text"
                                    className="form-control w-25"
                                    name="keyword"
                                    placeholder="Tìm kiếm kế hoạch..."
                                    value={filters.keyword}
                                    onChange={handleFilterChange}
                                />
                                <select
                                    className="form-select w-auto"
                                    name="assigneeId"
                                    value={filters.assigneeId}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Lọc theo người</option>
                                    {assigneeOptions.map((assignee) => (
                                        <option key={assignee.value} value={assignee.value}>
                                            {assignee.text}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="form-select w-auto"
                                    name="tag"
                                    value={filters.tag}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Lọc theo thẻ</option>
                                    {tagOptions.map((tag) => (
                                        <option key={tag.value} value={tag.value}>
                                            {tag.text}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="form-select w-auto"
                                    name="priority"
                                    value={filters.priority}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Lọc theo ưu tiên</option>
                                    <option value="Cao">Cao</option>
                                    <option value="Trung bình">Trung bình</option>
                                    <option value="Thấp">Thấp</option>
                                </select>
                                <select
                                    className="form-select w-auto"
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Lọc theo trạng thái</option>
                                    <option value="Not Started">Chưa bắt đầu</option>
                                    <option value="In Progress">Đang thực hiện</option>
                                    <option value="Completed">Đã hoàn thành</option>
                                </select>
                                <button onClick={handleAddPlan} className="btn btn-success">
                                    Tạo dự án
                                </button>
                            </div>

                            <div className="kanban-wrapper" style={{ overflowX: "auto", paddingBottom: "1.5rem" }}>
                                <div className="d-flex flex-nowrap gap-4 kanban-scroll" style={{ minWidth: "max-content" }}>
                                    {/* Cột: Kế hoạch */}
                                    <div
                                        className="kanban-column bg-white p-4 rounded shadow-sm"
                                        style={{ minWidth: "320px", flex: "0 0 auto" }}
                                    >
                                        <div className="kanban-header d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0">Danh sách dự án</h5>
                                            <button onClick={handleAddPlan} className="btn btn-sm btn-primary">
                                                +
                                            </button>
                                        </div>

                                        {filteredPlans.map((plan) => (
                                            <div
                                                key={plan.planId}
                                                className="card kanban-card position-relative shadow-sm border-0 mb-3"
                                            >
                                                <div className="card-body p-3">
                                                    <div className="position-absolute top-0 end-0">
                                                        <ActionMenu
                                                            isActive={plan.status !== "Completed"}
                                                            onView={() => handleViewPlan(plan.planId)}
                                                            onEdit={() => handleEditPlan(plan.planId)}
                                                            onActivate={() => handleActivatePlan(plan.planId)}
                                                            onDeactivate={() => handleDeactivatePlan(plan.planId)}
                                                            onDelete={() => handleDeletePlan(plan.planId)}
                                                        />
                                                    </div>
                                                    <h6 className="card-title mb-2 text-truncate">{plan.planName}</h6>
                                                    <p className="text-muted small mb-2">{plan.description || "Không có mô tả"}</p>
                                                    <div className="mb-2">
                                                        <span className="badge bg-secondary me-1">{plan.tag}</span>
                                                        <span
                                                            className={`badge ${plan.priority === "Cao"
                                                                ? "bg-danger"
                                                                : plan.priority === "Trung bình"
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-info"
                                                                }`}
                                                        >
                                                            {plan.priority}
                                                        </span>
                                                    </div>
                                                    <div className="mb-3">
                                                        <small className="text-muted d-block">Tiến độ</small>
                                                        <div className="progress" style={{ height: "8px" }}>
                                                            <div
                                                                className="progress-bar bg-primary"
                                                                style={{ width: `${plan.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <small className="text-muted">{plan.progress}%</small>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <small className="text-muted">
                                                            <i className="bi bi-calendar-event me-1"></i>
                                                            {plan.startDate && plan.endDate
                                                                ? `${plan.startDate.split(" ")[0]} - ${plan.endDate.split(" ")[0]}`
                                                                : "Không xác định"}
                                                        </small>
                                                        <small className="text-muted">
                                                            <i className="bi bi-list-task me-1"></i>
                                                            {plan.taskCount} nhiệm vụ
                                                        </small>
                                                    </div>
                                                    <p className="mb-0 text-muted">
                                                        <i className="bi bi-person-check me-1"></i>
                                                        Khởi tạo: <strong>{plan.createdByName}</strong>
                                                    </p>
                                                    <p className="mb-0 text-muted">
                                                        <i className="bi bi-person-check me-1"></i>
                                                        Người thực hiện: <strong>{plan.assignees.map((a) => a.fullName).join(", ")}</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <button onClick={handleAddPlan} className="btn btn-light w-100 mt-2">
                                            + Thêm dự án
                                        </button>
                                    </div>

                                 
                                   
                                    {/* Khu vực hiển thị chi tiết nhiệm vụ */}
                                    {selectedPlanId && (
                                        <div
                                            className="kanban-column bg-light  rounded shadow-sm d-flex"
                                            style={{ minWidth: "400px", flex: "0 0 auto" }}
                                        >
                                           
                                            {taskDetails.length === 0 ? (
                                                <p className="p-5">Chưa có nhiệm vụ nào cho kế hoạch này.</p>
                                            ) : (
                                                categories.map((category) => (
                                                    <div
                                                        key={category}
                                                        className="kanban-column bg-white p-4 rounded shadow-sm mb-3 me-2"
                                                        style={{ minWidth: "320px", flex: "0 0 auto" }}
                                                    >

                                                        <div className="kanban-header d-flex justify-content-between align-items-center mb-3">
                                                            <h5 className="mb-0">{category}</h5>
                                                            <TaskActionMenu
                                                                taskId={0}
                                                                isActive={true}
                                                                onView={() => { }}
                                                                onEdit={() => { }}
                                                                onDelete={() => { }}
                                                            />
                                                        </div>
                                                        {groupedTasks[category].map((task) => (
                                                            <div
                                                                key={task.taskId}
                                                                className="card kanban-card position-relative shadow-sm border-0 mb-3 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <div className="card-body p-3">
                                                                    <div className="position-absolute top-0 end-0 m-2">
                                                                        <TaskActionMenu
                                                                            taskId={task.taskId}
                                                                            isActive={task.status !== "Completed"}
                                                                            onView={() => handleViewTask(task.taskId)}
                                                                            onEdit={() => handleEditTask(task.taskId)}
                                                                            onDelete={() => handleDeleteTask(task.taskId)}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={`badge mb-2 ${task.status === "Completed"
                                                                            ? "bg-success"
                                                                            : task.status === "In Progress"
                                                                                ? "bg-primary"
                                                                                : "bg-secondary"
                                                                            }`}
                                                                    >
                                                                        {task.status === "Completed"
                                                                            ? "Công việc đã hoàn thành"
                                                                            : task.status === "In Progress"
                                                                                ? "Công việc đang thực hiện"
                                                                                : "Chưa bắt đầu"}
                                                                    </span>
                                                                    <h6 className="card-title mb-2 font-bold">{task.taskName}</h6>
                                                                    <p className="text-muted small mb-2">{task.description || "Không có mô tả"}</p>
                                                                    <div className="mb-2">
                                                                        <span className="text-sm text-gray-600">Độ ưu tiên: </span>
                                                                        <span
                                                                            className={`font-medium ${task.priority === "Cao"
                                                                                ? "text-danger"
                                                                                : task.priority === "Trung bình"
                                                                                    ? "text-info"
                                                                                    : "text-muted"
                                                                                }`}
                                                                        >
                                                                            {task.priority}
                                                                        </span>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <span className="text-sm text-gray-600">
                                                                            <i className="bi bi-calendar me-1"></i>
                                                                            Thời gian:
                                                                        </span>
                                                                        <span className="text-sm text-gray-800">
                                                                            {task.startDate && task.endDate
                                                                                ? `${task.startDate.split(" ")[0]} - ${task.endDate.split(" ")[0]}`
                                                                                : task.startDate || "Không xác định"}
                                                                        </span>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <span className="text-sm text-gray-600">
                                                                            <i className="bi bi-person me-1"></i>
                                                                            Người thực hiện:
                                                                        </span>
                                                                        <span className="text-sm text-gray-800">
                                                                            {task.assignees.map(a => a.employeeName).join(", ") || "Không có"}
                                                                        </span>
                                                                    </div>
                                                                    {task.attachmentPath && (
                                                                        <div className="mb-0">
                                                                            <span className="text-sm text-gray-600">
                                                                                <i className="bi bi-paperclip me-1"></i>
                                                                                Tệp đính kèm:
                                                                            </span>
                                                                            <a
                                                                                href={task.attachmentPath}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-sm text-blue-600 hover:underline"
                                                                            >
                                                                                Xem tệp
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                    {/* Cột: Thêm tác vụ mới */}
                                    <div
                                        className="kanban-column bg-white p-4 rounded shadow-sm"
                                        style={{ minWidth: "280px", flex: "0 0 auto" }}
                                    >
                                        <div className="kanban-header mb-3">
                                            <h5 className="mb-0">Thêm tác vụ mới</h5>
                                        </div>
                                        <button onClick={handleAddDetailPlan} className="btn btn-outline-primary w-100">
                                            + Tạo tác vụ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal hiển thị chi tiết nhiệm vụ */}
                {showTaskModal && selectedTask && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Chi tiết nhiệm vụ: {selectedTask.taskName}</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseTaskModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="p-3">
                                        <div className="mb-3">
                                            <strong>Tên nhiệm vụ:</strong> {selectedTask.taskName}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Mô tả:</strong> {selectedTask.description || "Không có mô tả"}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Trạng thái:</strong>{" "}
                                            <span
                                                className={`badge ${selectedTask.status === "Completed"
                                                    ? "bg-success"
                                                    : selectedTask.status === "In Progress"
                                                        ? "bg-primary"
                                                        : "bg-secondary"
                                                    }`}
                                            >
                                                {selectedTask.status === "Completed"
                                                    ? "Đã hoàn thành"
                                                    : selectedTask.status === "In Progress"
                                                        ? "Đang thực hiện"
                                                        : "Chưa bắt đầu"}
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <strong>Độ ưu tiên:</strong>{" "}
                                            <span
                                                className={`badge ${selectedTask.priority === "Cao"
                                                    ? "bg-danger"
                                                    : selectedTask.priority === "Trung bình"
                                                        ? "bg-warning text-dark"
                                                        : "bg-info"
                                                    }`}
                                            >
                                                {selectedTask.priority}
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <strong>Danh mục:</strong> {selectedTask.category || "Không có"}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Người tạo:</strong> {selectedTask.createdByName}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Người thực hiện:</strong>{" "}
                                            {selectedTask.assignees.map(a => a.employeeName).join(", ") || "Không có"}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Ngày bắt đầu:</strong>{" "}
                                            {selectedTask.startDate
                                                ? dayjs(selectedTask.startDate).format("DD/MM/YYYY HH:mm")
                                                : "Không xác định"}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Ngày kết thúc:</strong>{" "}
                                            {selectedTask.endDate
                                                ? dayjs(selectedTask.endDate).format("DD/MM/YYYY HH:mm")
                                                : "Không xác định"}
                                        </div>
                                        {selectedTask.attachmentPath && (
                                            <div className="mb-0">
                                                <strong>Tệp đính kèm:</strong>{" "}
                                                <a href={selectedTask.attachmentPath} target="_blank" rel="noopener noreferrer">
                                                    Xem tệp
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseTaskModal}>
                                        Đóng
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleEditTask(selectedTask.taskId)}
                                        disabled={selectedTask.status === "Completed"}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </LayoutMain>
        </>
    );
};

export default List;