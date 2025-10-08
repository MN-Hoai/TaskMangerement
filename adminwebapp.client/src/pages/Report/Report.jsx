import LayoutMain from "../../layouts/LayoutMain";
import Breadcrumb from "../../components/Breadcrumb";
import HeadingMain from "../../components/HeadingMain";

const Report = () => {
    return (
        <>
            <title>Báo cáo tiến độ dự án</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">

                        {/* Heading */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">
                                        <HeadingMain>Báo cáo tiến độ dự án</HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <select className="form-select">
                                    <option>Dự án A</option>
                                    <option>Dự án B</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input type="month" className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary">Lọc dữ liệu</button>
                            </div>
                        </div>

                        {/* Tổng quan */}
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="card text-center shadow">
                                    <div className="card-body">
                                        <h6 className="text-muted">Tổng số công việc</h6>
                                        <h3>45</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center shadow">
                                    <div className="card-body">
                                        <h6 className="text-muted">Đã hoàn thành</h6>
                                        <h3>30</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center shadow">
                                    <div className="card-body">
                                        <h6 className="text-muted">Tiến độ dự án</h6>
                                        <div className="progress mt-2" style={{ height: "20px" }}>
                                            <div className="progress-bar bg-success" style={{ width: "66%" }}>
                                                66%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hiệu suất nhân viên */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header bg-light">
                                <strong>Hiệu suất nhân viên</strong>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Tên nhân viên</th>
                                            <th>Số công việc</th>
                                            <th>Hoàn thành</th>
                                            <th>Hiệu suất</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Nguyễn Văn A</td>
                                            <td>10</td>
                                            <td>8</td>
                                            <td><span className="badge bg-success">80%</span></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Trần Thị B</td>
                                            <td>15</td>
                                            <td>10</td>
                                            <td><span className="badge bg-warning text-dark">67%</span></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Phạm Văn C</td>
                                            <td>20</td>
                                            <td>20</td>
                                            <td><span className="badge bg-primary">100%</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Optional: Biểu đồ */}
                        {/* <div className="card shadow-sm">
                            <div className="card-header bg-light">
                                <strong>Biểu đồ hiệu suất</strong>
                            </div>
                            <div className="card-body">
                                <canvas id="employeeChart" height="100"></canvas>
                            </div>
                        </div> */}

                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default Report;
