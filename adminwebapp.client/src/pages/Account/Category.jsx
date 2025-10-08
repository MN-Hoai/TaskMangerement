import LayoutMain from "../../layouts/LayoutMain";
import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import MessageBox from "../../components/MessageBox";
const Category = () => {
    return (
        <>
            <title>Thể loại tài khoản</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">

                                    {/* HeadingMain */}
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>Thể loại tài khoản</HeadingMain>
                                    </h4>
                                    {/* ucBreadcrumb */}
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* ContentMain */}
                        <div className="form-box">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">Danh sách thể loại</h5>
                                        </div>
                                        <div className="card-body">
                                            <select className="form-select" size="37">
                                                <option value="" selected>Chọn thể loại</option>
                                                <option value="1">-- 1. Category 1</option>
                                                <option value="2">-----1.1 Category 1.1</option>
                                                <option value="3">-----1.2 Category 1.1</option>
                                                <option value="4">-- 2. Category 2</option>
                                                <option value="5">-----2.1 Category 2.1</option>
                                                <option value="6">-----2.2 Category 2.1</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">Thông tin chi tiết</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Thể loại</label>
                                                <select className="form-select">
                                                    <option value="" selected>Chọn thể loại</option>
                                                    <option value="1">-- 1. Category 1</option>
                                                    <option value="2">-----1.1 Category 1.1</option>
                                                    <option value="3">-----1.2 Category 1.1</option>
                                                    <option value="4">-- 2. Category 2</option>
                                                    <option value="5">-----2.1 Category 2.1</option>
                                                    <option value="6">-----2.2 Category 2.1</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Tiêu đề</label>
                                                <input type="text" className="form-control" placeholder="Tiêu đề" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mô tả</label>
                                                <textarea className="form-control" placeholder="Mô tả" rows="3"></textarea>
                                            </div>
                                            <div className="mb-3 avatar-container">
                                                <label className="form-label">Hình đại diện</label>
                                                <div className="row justify-content-center">
                                                    <div className="col-lg-4 col-sm-6">
                                                        <div className="text-center">
                                                            <div className="position-relative d-flex justify-content-center border border-dark rounded">
                                                                <div className="position-absolute top-0 start-100 translate-middle">
                                                                    <label htmlFor="avatar-file-upload" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Upload ảnh đại diện">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                <i className="ri-upload-cloud-2-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                    <input className="form-control d-none" value="" id="avatar-file-upload" type="file"
                                                                        accept="image/png, image/gif, image/jpeg" />
                                                                </div>
                                                                <div className="avatar-xxl">
                                                                    <div className="avatar-title bg-light rounded">
                                                                        <img className="avatar-preview avatar-xxl p-2 h-auto" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="input-group mt-2">
                                                            <input type="text" className="form-control avatar-file-url" placeholder="Url hình đại diện" />
                                                            <a className="btn btn-icon border bg-light text-danger avatar-remove" href="#">
                                                                <i className="ri-delete-bin-5-line"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">Thông tin khác</h5>
                                        </div>

                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Mã số</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">#</span>
                                                            <input type="text" className="form-control" placeholder="Mã số" />
                                                            <div className="invalid-feedback"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Vị trí</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-arrow-up-down-line"></i>
                                                            </span>
                                                            <select className="form-select">
                                                                <option value="" selected></option>
                                                                <option value="1">01</option>
                                                                <option value="2">02</option>
                                                                <option value="3">03</option>
                                                                <option value="4">04</option>
                                                            </select>
                                                        </div>
                                                        <div className="invalid-feedback"></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Code</label>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-code-line"></i>
                                                            </span>
                                                            <input type="text" className="form-control" placeholder="Code" />
                                                        </div>
                                                        <div className="invalid-feedback"></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Trạng thái</label>
                                                        <select className="form-select">
                                                            <option value="" selected>Chọn trạng thái</option>
                                                            <option value="true">Kích hoạt</option>
                                                            <option value="false">Tạm khóa</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Ngày đăng</label>
                                                        <input type="text" className="form-control" placeholder="Ngày đăng" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Người đăng</label>
                                                        <input type="text" className="form-control" placeholder="Người đăng" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* messagebox */}
                                    <MessageBox />

                                    {/* buttonbox */}
                                    <div className="text-center mb-3">
                                        <button type="submit" className="btn btn-primary w-sm me-1">
                                            <i className="ri-send-plane-line"></i>
                                            Submit
                                        </button>
                                        <button type="button" className="btn btn-outline-primary w-sm">
                                            <i className="ri-arrow-go-back-line"></i>
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ContentMain./. */}
                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default Category;
