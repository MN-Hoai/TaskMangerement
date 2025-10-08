import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";
import Pagination from "../../components/Pagination";

const List = () => {
    return (
        <>
            <title>Danh sách thành viên</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">
                                        <HeadingMain>
                                            Danh sách thành viên
                                        </HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        <div className="content-main">
                            <div className="table-responsive">
                                <div className="d-flex mb-3">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm thành viên..."
                                        className="form-control me-2"
                                    />
                                    <select className="form-select me-2" style={{ width: 'auto' }}>
                                        <option>Tất cả vai trò</option>
                                    </select>
                                    <select className="form-select me-2" style={{ width: 'auto' }}>
                                        <option>Tất cả trạng thái</option>
                                    </select>
                                    <button className="btn btn-primary">+ Thêm thành viên</button>
                                </div>
                                <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>THÀNH VIÊN</th>
                                                <th>VAI TRÒ</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>DỰ AN</th>
                                                <th>HOẠT ĐỘNG CỦ</th>
                                                <th>THAO TÁC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="badge bg-primary rounded-circle me-2">PD</span> Pham Thi Dung<br />
                                                    <small className="text-muted">pham.thi.dung@company.com</small>
                                                </td>
                                                <td>Quản lý<br />Phòng Tuyển sinh</td>
                                                <td><span className="badge bg-success">Đang hoạt động</span></td>
                                                <td>12 dự án<br />45 công việc hoàn thành</td>
                                                <td>2 giờ trước</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Thao tác
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Sửa</a></li>
                                                            <li><a className="dropdown-item" href="#">Vô hiệu hóa</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Xóa</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="badge bg-success rounded-circle me-2">HE</span> Hoang Van Em<br />
                                                    <small className="text-muted">hoang.van.em@company.com</small>
                                                </td>
                                                <td>Nhân viên<br />Phòng Tuyển sinh</td>
                                                <td><span className="badge bg-success">Đang hoạt động</span></td>
                                                <td>8 dự án<br />32 công việc hoàn thành</td>
                                                <td>1 ngày trước</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Thao tác
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Sửa</a></li>
                                                            <li><a className="dropdown-item" href="#">Vô hiệu hóa</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Xóa</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="badge bg-danger rounded-circle me-2">NP</span> Nguyen Thi Phuong<br />
                                                    <small className="text-muted">nguyen.thi.phuong@company.com</small>
                                                </td>
                                                <td>Trưởng phòng<br />Phòng Tuyển sinh</td>
                                                <td><span className="badge bg-secondary">Không hoạt động</span></td>
                                                <td>15 dự án<br />67 công việc hoàn thành</td>
                                                <td>1 tuần trước</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Thao tác
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Sửa</a></li>
                                                            <li><a className="dropdown-item" href="#">Vô hiệu hóa</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Xóa</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="badge bg-info rounded-circle me-2">TT</span> Tran Minh Tuan<br />
                                                    <small className="text-muted">tran.minh.tuan@company.com</small>
                                                </td>
                                                <td>Nhân viên<br />Phòng Tuyển sinh</td>
                                                <td><span className="badge bg-success">Đang hoạt động</span></td>
                                                <td>6 dự án<br />28 công việc hoàn thành</td>
                                                <td>30 phút trước</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Thao tác
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Sửa</a></li>
                                                            <li><a className="dropdown-item" href="#">Vô hiệu hóa</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Xóa</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="badge bg-warning rounded-circle me-2">LM</span> Le Thi Mai<br />
                                                    <small className="text-muted">le.thi.mai@company.com</small>
                                                </td>
                                                <td>Nhân viên<br />Phòng Tuyển sinh</td>
                                                <td><span className="badge bg-success">Đang hoạt động</span></td>
                                                <td>4 dự án<br />19 công việc hoàn thành</td>
                                                <td>4 giờ trước</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Thao tác
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Sửa</a></li>
                                                            <li><a className="dropdown-item" href="#">Vô hiệu hóa</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Xóa</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="badge bg-secondary rounded-circle me-2">VK</span> Vu Dinh Khoa<br />
                                                    <small className="text-muted">vu.dinh.khoa@company.com</small>
                                                </td>
                                                <td>Nhân viên<br />Phòng Tuyển sinh</td>
                                                <td><span className="badge bg-warning text-dark">Chưa kích hoạt</span></td>
                                                <td>0 dự án<br />0 công việc hoàn thành</td>
                                                <td>Chưa kích hoạt</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Thao tác
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Sửa</a></li>
                                                            <li><a className="dropdown-item" href="#">Vô hiệu hóa</a></li>
                                                            <li><a className="dropdown-item text-danger" href="#">Xóa</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-muted mt-2">
                                    <Pagination/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default List;