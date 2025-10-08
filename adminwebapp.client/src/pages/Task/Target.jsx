import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";

const Target = () => {
    return (
        <>
            <title>Lập kế hoạch tuyển sinh</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        {/* Tiêu đề trang */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>
                                            Lập kế hoạch tuyển sinh
                                        </HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* Form tạo kế hoạch */}
                        <div className="bg-white p-4 rounded shadow-sm mb-5">
                            <h5 className="mb-4">Tạo kế hoạch mới</h5>
                            <form className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label">Năm học <span className="text-danger">*</span></label>
                                    <select className="form-select">
                                        <option>Chọn năm</option>
                                        <option>2025-2026</option>
                                        <option>2026-2027</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Ngành tuyển <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="VD: Công nghệ thông tin" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Bậc đào tạo</label>
                                    <select className="form-select">
                                        <option>Chọn bậc</option>
                                        <option>Đại học</option>
                                        <option>Cao học</option>
                                        <option>Liên thông</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Phương thức xét tuyển</label>
                                    <select className="form-select">
                                        <option>Chọn phương thức</option>
                                        <option>Học bạ</option>
                                        <option>Thi tốt nghiệp</option>
                                        <option>Đánh giá năng lực</option>
                                        <option>Kết hợp nhiều phương thức</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Chỉ tiêu <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" placeholder="VD: 100" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Ngày bắt đầu</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Ngày kết thúc</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Ghi chú nội bộ</label>
                                    <textarea rows={2} className="form-control" placeholder="Thông tin thêm..."></textarea>
                                </div>
                                <div className="col-12 text-end mt-3">
                                    <button type="button" className="btn btn-primary">Lưu kế hoạch</button>
                                </div>
                            </form>
                        </div>

                        {/* Bảng danh sách kế hoạch */}
                        <div className="bg-white p-4 rounded shadow-sm">
                            <h5 className="mb-4">Danh sách kế hoạch đã tạo</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Năm học</th>
                                            <th>Ngành</th>
                                            <th>Bậc</th>
                                            <th>Phương thức</th>
                                            <th>Chỉ tiêu</th>
                                            <th>Thời gian</th>
                                            <th>Ghi chú</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>2025-2026</td>
                                            <td>Công nghệ thông tin</td>
                                            <td>Đại học</td>
                                            <td>Học bạ</td>
                                            <td>120</td>
                                            <td>01/06/2025 - 30/07/2025</td>
                                            <td>Tuyển chủ yếu khu vực miền Trung</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button className="btn btn-sm btn-outline-primary">Chi tiết</button>
                                                    <button className="btn btn-sm btn-outline-secondary">Sửa</button>
                                                    <button className="btn btn-sm btn-outline-danger">Xóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>2025-2026</td>
                                            <td>Quản trị kinh doanh</td>
                                            <td>Cao đẳng</td>
                                            <td>Đánh giá năng lực</td>
                                            <td>80</td>
                                            <td>15/05/2025 - 20/07/2025</td>
                                            <td>Phối hợp với ĐHQG-HCM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button className="btn btn-sm btn-outline-primary">Chi tiết</button>
                                                    <button className="btn btn-sm btn-outline-secondary">Sửa</button>
                                                    <button className="btn btn-sm btn-outline-danger">Xóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default Target;
