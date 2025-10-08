import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";

const Comment = () => {
    return (
        <>
            <title>Màn hình chính</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>Bình luận công việc</HeadingMain>
                                    </h4>
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* ContentMain */}
                        <div className="content-main">

                            {/* Search & Filter */}
                            <div className="mb-4 d-flex flex-wrap align-items-center gap-3">
                                <input
                                    type="text"
                                    className="form-control w-25"
                                    placeholder="Tìm kiếm bình luận..."
                                />
                                <select className="form-select w-auto">
                                    <option>Lọc theo người</option>
                                    <option>Nguyễn Văn A</option>
                                    <option>Trần Thị B</option>
                                </select>
                                <select className="form-select w-auto">
                                    <option>Lọc theo ưu tiên</option>
                                    <option value="cao">Cao</option>
                                    <option value="trung-binh">Trung bình</option>
                                </select>
                                <select className="form-select w-auto">
                                    <option>Lọc theo trạng thái</option>
                                    <option value="dang">Đang thực hiện</option>
                                    <option value="hoan-thanh">Đã hoàn thành</option>
                                </select>
                                <button className="btn btn-success">Thêm bình luận</button>
                            </div>

                            {/* Công việc 1 */}
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header bg-light">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">[Dự án Tuyển sinh] Kế hoạch tháng 6</h5>
                                            <small className="text-muted">
                                                Ưu tiên: <span className="text-danger fw-bold">Cao</span> | Trạng thái:{" "}
                                                <span className="text-primary fw-bold">Đang thực hiện</span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {/* Bình luận 1 */}
                                    <div className="d-flex mb-3">
                                        <img
                                            src="https://i.pravatar.cc/40?img=1"
                                            className="rounded-circle me-3"
                                            alt="avatar"
                                        />
                                        <div>
                                            <h6 className="mb-1">Nguyễn Văn A</h6>
                                            <small className="text-muted">5 phút trước</small>
                                            <p className="mt-1 mb-0">
                                                Tôi đã cập nhật biểu mẫu mới cho kế hoạch này. Mọi người kiểm tra lại giúp nhé!
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bình luận 2 */}
                                    <div className="d-flex mb-3">
                                        <img
                                            src="https://i.pravatar.cc/40?img=5"
                                            className="rounded-circle me-3"
                                            alt="avatar"
                                        />
                                        <div>
                                            <h6 className="mb-1">Trần Thị B</h6>
                                            <small className="text-muted">1 giờ trước</small>
                                            <p className="mt-1 mb-0">Đã nhận! Tôi sẽ gửi phản hồi trước 16h hôm nay.</p>
                                        </div>
                                    </div>

                                    {/* Nhập bình luận mới */}
                                    <div className="mt-4">
                                        <textarea
                                            rows="2"
                                            className="form-control mb-2"
                                            placeholder="Nhập bình luận..."
                                        ></textarea>
                                        <button className="btn btn-primary btn-sm">Gửi bình luận</button>
                                    </div>
                                </div>
                            </div>

                            {/* Công việc 2 */}
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header bg-light">
                                    <h5 className="mb-1">[Dự án ABC] Tuyển sinh trường THPT ABC</h5>
                                    <small className="text-muted">
                                        Ưu tiên: <span className="text-warning fw-bold">Trung bình</span> | Trạng thái:{" "}
                                        <span className="text-success fw-bold">Đã hoàn thành</span>
                                    </small>
                                </div>
                                <div className="card-body">
                                    {/* Bình luận */}
                                    <div className="d-flex mb-3">
                                        <img
                                            src="https://i.pravatar.cc/40?img=8"
                                            className="rounded-circle me-3"
                                            alt="avatar"
                                        />
                                        <div>
                                            <h6 className="mb-1">Hoàng Văn Em</h6>
                                            <small className="text-muted">Hôm qua lúc 14:45</small>
                                            <p className="mt-1 mb-0">
                                                Chiến dịch quảng bá rất hiệu quả, số lượng học sinh đăng ký đã tăng 25%.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Nhập bình luận mới */}
                                    <div className="mt-4">
                                        <textarea
                                            rows="2"
                                            className="form-control mb-2"
                                            placeholder="Nhập bình luận..."
                                        ></textarea>
                                        <button className="btn btn-primary btn-sm">Gửi bình luận</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* ./ContentMain */}
                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default Comment;
