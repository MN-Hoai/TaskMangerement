import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutMain from "../../layouts/LayoutMain";
import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";

const AddDetailPlan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        planId: "",
        createdById: "",
        category: "",
        newCategory: "",
        taskName: "",
        description: "",
        requirement: "",
        startDate: "",
        endDate: "",
        status: "Not Started",
        priority: "Trung bình",
        assignees: [],
        attachment: null,
    });
    const [plans, setPlans] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Tải danh sách kế hoạch
    const loadPlans = useCallback(async () => {
        try {
            const response = await fetch("/api/plans/all");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setPlans(result.data);
            } else {
                toast.error("Lỗi khi tải danh sách kế hoạch!");
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách kế hoạch!");
            console.error("Lỗi khi tải danh sách kế hoạch:", error);
        }
    }, []);

    // Tải danh sách nhân viên
    const loadEmployees = useCallback(async () => {
        try {
            const response = await fetch("/api/employees");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setEmployees(result.data);
            } else {
                toast.error("Lỗi khi tải danh sách nhân viên!");
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách nhân viên!");
            console.error("Lỗi khi tải danh sách nhân viên:", error);
        }
    }, []);

    // Tải danh sách danh mục
    const loadCategories = useCallback(async () => {
        try {
            const response = await fetch("/api/plans/tags");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setCategories(result.data);
            } else {
                toast.error("Lỗi khi tải danh sách danh mục!");
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách danh mục!");
            console.error("Lỗi khi tải danh sách danh mục:", error);
        }
    }, []);

    useEffect(() => {
        loadPlans();
        loadEmployees();
        loadCategories();
    }, [loadPlans, loadEmployees, loadCategories]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "planId") {
            const selectedPlan = plans.find((plan) => plan.planId.toString() === value);
            setFormData((prev) => ({
                ...prev,
                planId: value,
                createdById: selectedPlan ? selectedPlan.createdById.toString() : "",
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAssigneesChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value));
        setFormData((prev) => ({ ...prev, assignees: selected }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Chỉ hỗ trợ file PDF, DOC, hoặc DOCX!");
                return;
            }
            if (file.size > 4 * 1024 * 1024) {
                toast.error("File đính kèm không được vượt quá 4MB!");
                return;
            }
            setFormData((prev) => ({ ...prev, attachment: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc
        if (!formData.planId || !formData.createdById || !formData.taskName) {
            toast.error("Vui lòng điền đầy đủ các trường bắt buộc: Kế hoạch, Người tạo, Tên nhiệm vụ!");
            return;
        }

        // Kiểm tra ngày
        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("PlanId", formData.planId);
            formDataToSend.append("CreatedById", formData.createdById);
            formDataToSend.append("TaskName", formData.taskName);
            formDataToSend.append("Description", formData.description || "");
            formDataToSend.append("Requirement", formData.requirement || "");
            formDataToSend.append("Category", formData.newCategory || formData.category || "");
            formDataToSend.append("StartDate", formData.startDate || "");
            formDataToSend.append("EndDate", formData.endDate || "");
            formDataToSend.append("Status", formData.status);
            formDataToSend.append("Priority", formData.priority);
            formData.assignees.forEach((assigneeId, index) => {
                formDataToSend.append(`Assignees[${index}]`, assigneeId);
            });
            if (formData.attachment) {
                formDataToSend.append("Attachment", formData.attachment);
            }

            // Ghi log FormData
            for (let pair of formDataToSend.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await fetch("/api/plans/task-details", {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Thêm nhiệm vụ thành công!");
                setTimeout(() => navigate("/task-list"), 2000);
            } else {
                toast.error(`Lỗi: ${result.message}${result.data ? ` - ${result.data.join(", ")}` : ""}`);
                console.error("Chi tiết lỗi:", result.data);
            }
        } catch (error) {
            toast.error(`Lỗi khi thêm nhiệm vụ: ${error.message}`);
            console.error("Lỗi khi thêm nhiệm vụ:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            planId: "",
            createdById: "",
            category: "",
            newCategory: "",
            taskName: "",
            description: "",
            requirement: "",
            startDate: "",
            endDate: "",
            status: "Not Started",
            priority: "Trung bình",
            assignees: [],
            attachment: null,
        });
    };

    const createdByName = formData.createdById
        ? plans.find((plan) => plan.createdById.toString() === formData.createdById)?.createdByName || "Không xác định"
        : "Chọn kế hoạch trước";

    // Kiểm tra xem nút submit có nên bị vô hiệu hóa
    const isSubmitDisabled = loading || !formData.planId || !formData.createdById || !formData.taskName;

    return (
        <>
            <title>Thêm nhiệm vụ</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between mb-4">
                            <h4 className="mb-sm-0">
                                <HeadingMain>Thêm nhiệm vụ cho kế hoạch</HeadingMain>
                            </h4>
                            <Breadcrumb />
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        {/* Kế hoạch */}
                                        <div className="col-md-6">
                                            <label className="form-label">Chọn kế hoạch <span className="text-danger">*</span></label>
                                            <select
                                                className="form-select"
                                                name="planId"
                                                value={formData.planId}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">-- Chọn kế hoạch --</option>
                                                {plans.map((plan) => (
                                                    <option key={plan.planId} value={plan.planId}>
                                                        {plan.planName}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="form-text">Chọn một kế hoạch để tự động điền người tạo.</div>
                                        </div>

                                        {/* Người tạo */}
                                        <div className="col-md-6">
                                            <label className="form-label">Người tạo <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={createdByName}
                                                disabled
                                            />
                                            <input
                                                type="hidden"
                                                name="createdById"
                                                value={formData.createdById}
                                            />
                                            <div className="form-text">Người tạo được lấy tự động từ kế hoạch.</div>
                                        </div>

                                        {/* Danh mục */}
                                        <div className="col-md-6">
                                            <label className="form-label">Danh mục nhiệm vụ</label>
                                            <select
                                                className="form-select"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                            >
                                                <option value="">-- Chọn danh mục --</option>
                                                {categories.map((category) => (
                                                    <option key={category.value} value={category.value}>
                                                        {category.text}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                placeholder="Hoặc nhập danh mục mới..."
                                                name="newCategory"
                                                value={formData.newCategory}
                                                onChange={handleChange}
                                            />
                                            <div className="form-text">Chọn hoặc nhập danh mục mới nếu cần.</div>
                                        </div>

                                        {/* Tên nhiệm vụ */}
                                        <div className="col-12">
                                            <label className="form-label">Tên nhiệm vụ <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="taskName"
                                                value={formData.taskName}
                                                onChange={handleChange}
                                                placeholder="Nhập tên nhiệm vụ"
                                                required
                                            />
                                        </div>

                                        {/* Mô tả */}
                                        <div className="col-12">
                                            <label className="form-label">Mô tả</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Nhập mô tả nhiệm vụ (không bắt buộc)"
                                            ></textarea>
                                        </div>

                                        {/* Yêu cầu cụ thể */}
                                        <div className="col-12">
                                            <label className="form-label">Yêu cầu cụ thể</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                name="requirement"
                                                value={formData.requirement}
                                                onChange={handleChange}
                                                placeholder="Nhập yêu cầu cụ thể (không bắt buộc)"
                                            ></textarea>
                                        </div>

                                        {/* Trạng thái */}
                                        <div className="col-md-6">
                                            <label className="form-label">Trạng thái</label>
                                            <select
                                                className="form-select"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                            >
                                                <option value="Not Started">Chưa bắt đầu</option>
                                                <option value="In Progress">Đang thực hiện</option>
                                                <option value="Completed">Đã hoàn thành</option>
                                            </select>
                                        </div>

                                        {/* Mức độ ưu tiên */}
                                        <div className="col-md-6">
                                            <label className="form-label">Mức độ ưu tiên</label>
                                            <select
                                                className="form-select"
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                            >
                                                <option value="Cao">Cao</option>
                                                <option value="Trung bình">Trung bình</option>
                                                <option value="Thấp">Thấp</option>
                                            </select>
                                        </div>

                                        {/* Ngày bắt đầu & kết thúc */}
                                        <div className="col-md-6">
                                            <label className="form-label">Ngày bắt đầu</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                            />
                                            <div className="form-text">Chọn ngày bắt đầu (không bắt buộc).</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Ngày kết thúc</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                            />
                                            <div className="form-text">Chọn ngày kết thúc (không bắt buộc).</div>
                                        </div>

                                        {/* Thành viên thực hiện */}
                                        <div className="col-md-6">
                                            <label className="form-label">Thành viên thực hiện</label>
                                            <select
                                                className="form-select"
                                                multiple
                                                size="5"
                                                name="assignees"
                                                onChange={handleAssigneesChange}
                                            >
                                                {employees.map((employee) => (
                                                    <option key={employee.value} value={employee.value}>
                                                        {employee.text}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="form-text">Giữ Ctrl để chọn nhiều người (không bắt buộc).</div>
                                        </div>

                                        {/* Tài liệu đính kèm */}
                                        <div className="col-md-6">
                                            <label className="form-label">Tài liệu đính kèm</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="attachment"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                            <div className="form-text">Chỉ hỗ trợ PDF, DOC, DOCX (tối đa 4MB).</div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitDisabled}
                                        >
                                            <i className="bi bi-check-circle me-1"></i>
                                            {loading ? "Đang xử lý..." : "Thêm nhiệm vụ"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary ms-2"
                                            onClick={handleReset}
                                            disabled={loading}
                                        >
                                            Đặt lại
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </LayoutMain>
        </>
    );
};

export default AddDetailPlan;