import{ useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";

const ScheduleSchool = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split("T")[0];
    };

    return (
        <>
            <title>Lên lịch đi tuyển sinh tại trường</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">

                        {/* Tiêu đề */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">
                                        <HeadingMain>Lịch đi tuyển sinh tại trường</HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* Lịch + Form */}
                        <div className="row mt-4">
                            {/* Calendar */}
                            <div className="col-md-4">
                                <div className="bg-white p-3 rounded shadow-sm">
                                    <h6 className="mb-3">Chọn ngày từ lịch</h6>
                                    <Calendar
                                        onChange={setSelectedDate}
                                        value={selectedDate}
                                    />
                                </div>
                            </div>

                            {/* Form */}
                            <div className="col-md-8">
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <h5 className="mb-4">Tạo lịch tuyển sinh mới</h5>
                                    <form className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Tên trường THPT</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="VD: THPT Nguyễn Thị Minh Khai"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Ngày đi (chọn lịch bên trái)
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={formatDate(selectedDate)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Người phụ trách</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Số lượng hồ sơ cần thu</label>
                                            <input type="number" className="form-control" />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Chi phí dự kiến (VNĐ)</label>
                                            <input type="number" className="form-control" />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label">Nhiệm vụ kèm theo</label>
                                            <textarea
                                                className="form-control"
                                                rows={2}
                                                placeholder="Phát tờ rơi, tư vấn tuyển sinh, thuyết trình..."
                                            />
                                        </div>
                                        <div className="col-12 text-end">
                                            <button type="button" className="btn btn-primary">
                                                Lưu lịch trình
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách lịch trình */}
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <h5 className="mb-4">Danh sách lịch trình đã lên</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Trường THPT</th>
                                                    <th>Ngày đi</th>
                                                    <th>Người phụ trách</th>
                                                    <th>Hồ sơ cần thu</th>
                                                    <th>Chi phí (VNĐ)</th>
                                                    <th>Nhiệm vụ</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>THPT Nguyễn Thị Minh Khai</td>
                                                    <td>2025-06-10</td>
                                                    <td>Nguyễn Văn A</td>
                                                    <td>50</td>
                                                    <td>500000</td>
                                                    <td>Phát tờ rơi, tư vấn lớp 12</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm btn-outline-primary">
                                                                Chi tiết
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-secondary">
                                                                Sửa
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>THPT Lê Hồng Phong</td>
                                                    <td>2025-06-15</td>
                                                    <td>Trần Thị B</td>
                                                    <td>40</td>
                                                    <td>300000</td>
                                                    <td>Thuyết trình tại hội trường</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm btn-outline-primary">
                                                                Chi tiết
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-secondary">
                                                                Sửa
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default ScheduleSchool;
