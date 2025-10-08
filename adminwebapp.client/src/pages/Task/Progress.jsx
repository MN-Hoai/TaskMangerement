import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";

const TaskProgress = () => {
    return (
        <>
            <title>Theo dõi tiến độ công việc</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">
                                        <HeadingMain>
                                            Theo dõi tiến độ công việc
                                        </HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        <div className="content-main">
                            <div className="d-flex mb-3">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm công việc hoặc nhân viên..."
                                    className="form-control me-2"
                                />
                                <select className="form-select me-2" style={{ width: 'auto' }}>
                                    <option>Tất cả kế hoạch</option>
                                </select>
                                <select className="form-select me-2" style={{ width: 'auto' }}>
                                    <option>Tất cả trạng thái</option>
                                </select>
                                <button className="btn btn-primary me-2">Thêm công việc</button>
                                <button className="btn btn-secondary">Đóng lại công việc</button>
                            </div>

                            <div className="task-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                {/* TASK CARD */}
                                <div className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="card-title text-primary">Việc đổi định dạng</h6>
                                        <p className="card-text">
                                            <span className="badge bg-danger">Độ ưu tiên: Thấp</span><br />
                                            Thời gian: 20-06-2025<br />
                                            Người thực hiện: Nguyễn Văn An
                                        </p>

                                        <div className="mb-2 fw-bold">Trạng thái: Chưa bắt đầu</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-secondary" style={{ width: '0%' }}>
                                                0%
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between mt-3">
                                            <div>
                                                <button className="btn btn-outline-success btn-sm me-2">Bắt đầu</button>
                                                <button className="btn btn-outline-dark btn-sm">Kết thúc</button>
                                            </div>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Hành động
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item">Xem chi tiết</a></li>
                                                    <li><a className="dropdown-item">Chỉnh sửa</a></li>
                                                    <li><a className="dropdown-item">Khóa</a></li>
                                                    <li><a className="dropdown-item text-danger">Xóa</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TASK 2 */}
                                <div className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="card-title text-success">Thêm bước chọn nhân viên</h6>
                                        <p className="card-text">
                                            <span className="badge bg-success">Độ ưu tiên: Cao</span><br />
                                            Thời gian: 20-06-2025<br />
                                            Người thực hiện: Nguyễn Văn An
                                        </p>

                                        <div className="mb-2 fw-bold">Trạng thái: Hoàn thành</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" style={{ width: '100%' }}>
                                                100%
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between mt-3">
                                            <div>
                                                <button className="btn btn-outline-success btn-sm me-2">Bắt đầu</button>
                                                <button className="btn btn-outline-dark btn-sm">Kết thúc</button>
                                            </div>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Hành động
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item">Xem chi tiết</a></li>
                                                    <li><a className="dropdown-item">Chỉnh sửa</a></li>
                                                    <li><a className="dropdown-item">Khóa</a></li>
                                                    <li><a className="dropdown-item text-danger">Xóa</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TASK 3 */}
                                <div className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="card-title text-info">Việc quảng bá tuyển sinh</h6>
                                        <p className="card-text">
                                            <span className="badge bg-warning text-dark">Độ ưu tiên: Trung bình</span><br />
                                            Thời gian: 20-01-2024<br />
                                            Người thực hiện: Trần Thị Bình
                                        </p>

                                        <div className="mb-2 fw-bold">Trạng thái: Đang thực hiện</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-warning" style={{ width: '45%' }}>
                                                45%
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between mt-3">
                                            <div>
                                                <button className="btn btn-outline-success btn-sm me-2">Bắt đầu</button>
                                                <button className="btn btn-outline-dark btn-sm">Kết thúc</button>
                                            </div>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Hành động
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item">Xem chi tiết</a></li>
                                                    <li><a className="dropdown-item">Chỉnh sửa</a></li>
                                                    <li><a className="dropdown-item">Khóa</a></li>
                                                    <li><a className="dropdown-item text-danger">Xóa</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* END TASK LIST */}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default TaskProgress;
