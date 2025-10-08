import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutMain from "../../layouts/LayoutMain";
import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";

const AddPlan = () => {
    const [formData, setFormData] = useState({
        planName: "",
        description: "",
        tag: "",
        people: [],
        startDate: "",
        endDate: "",
       
        priority: "Trung bình",
        status: "Not Started",
        taskCount: 0,
    });
    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(false);

    // Lấy danh sách nhân sự từ API
    const loadEmployeeOptions = useCallback(async () => {
        try {
            const response = await fetch("/api/employees/options");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success) {
                setEmployees(result.data);
            } else {
                toast.error("Lỗi khi lấy danh sách nhân sự!");
            }
        } catch (error) {
            toast.error("Lỗi khi lấy danh sách nhân sự!");
            console.error(error);
        }
    }, []);

   

    useEffect(() => {
        loadEmployeeOptions();
      
    }, [loadEmployeeOptions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePeopleChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, people: selected }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch("/api/plans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    planName: formData.planName,
                    description: formData.description,
                    tag: formData.tag || null,
                    startDate: formData.startDate || null,
                    endDate: formData.endDate || null,
                    createdById: parseInt(formData.createdById),
                    priority: formData.priority,
                    status: formData.status,
                    assignees: formData.people.map((id) => parseInt(id)),
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Tạo kế hoạch thành công!");
                // Reset form
                setFormData({
                    planName: "",
                    description: "",
                    tag: "",
                    people: [],
                    startDate: "",
                    endDate: "",
                    createdById: "",
                    priority: "Trung bình",
                    status: "Not Started",
                    taskCount: 0,
                });
            } else {
                toast.error("Lỗi khi tạo kế hoạch: " + result.message);
            }
        } catch (error) {
            toast.error("Lỗi khi tạo kế hoạch: " + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <title>Tạo kế hoạch mới</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between mb-4">
                            <h4 className="mb-sm-0">
                                <HeadingMain>Tạo kế hoạch mới</HeadingMain>
                            </h4>
                            <Breadcrumb />
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label">Tên kế hoạch</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="planName"
                                                value={formData.planName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Người khởi tạo</label>
                                            <select
                                                className="form-select"
                                                name="createdById"
                                                value={formData.createdById}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Chọn người khởi tạo</option>
                                                {employees.map((employee) => (
                                                    <option key={employee.value} value={employee.value}>
                                                        {employee.text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Mô tả</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Thẻ (phân loại)</label>
                                            <input
                                                className="form-control"
                                                name="tag"
                                                value={formData.tag}
                                                onChange={handleChange}
                                            ></input>
                                            
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Mức ưu tiên</label>
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

                                        <div className="col-md-6">
                                            <label className="form-label">Ngày bắt đầu</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                            />
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
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Nhân sự phụ trách</label>
                                            <select
                                                className="form-select"
                                                multiple
                                                name="people"
                                                onChange={handlePeopleChange}
                                            >
                                                {employees.map((employee) => (
                                                    <option key={employee.value} value={employee.value}>
                                                        {employee.text}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="form-text">Giữ Ctrl để chọn nhiều người</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Số lượng nhiệm vụ</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="taskCount"
                                                value={formData.taskCount}
                                                onChange={handleChange}
                                                min={0}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            <i className="bi bi-check-circle me-1"></i>{" "}
                                            {loading ? "Đang tạo..." : "Tạo kế hoạch"}
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-outline-secondary ms-2"
                                            onClick={() =>
                                                setFormData({
                                                    planName: "",
                                                    description: "",
                                                    tag: "",
                                                    people: [],
                                                    startDate: "",
                                                    endDate: "",
                                                    createdById: "",
                                                    priority: "Trung bình",
                                                    status: "Not Started",
                                                    taskCount: 0,
                                                })
                                            }
                                        >
                                            Đặt lại
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </LayoutMain>
        </>
    );
};

export default AddPlan;