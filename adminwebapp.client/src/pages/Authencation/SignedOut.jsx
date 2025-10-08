import HeadingMain from '../../components/HeadingMain';
import LayoutBasic from '../../layouts/LayoutBasic'; // nhúng component LayoutBasic

const SignedOut = () => {
    return (
        <>
            <title>Đã đăng xuất tài khoản</title>
            <LayoutBasic>
                <div className="auth-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <a href="/" className="d-inline-block auth-logo">
                                            <img
                                                src="/assets/images/logos/logo-banner-betu.png"
                                                alt=""
                                                height="40"
                                            />
                                        </a>
                                    </div>

                                    {/* HeadingMain */}
                                    <h3 className="mt-3 fs-15 fw-medium text-white text-uppercase text-center">
                                        <HeadingMain>
                                            Đã đăng xuất tài khoản
                                            <i className="ri-git-repository-private-fill"></i>
                                        </HeadingMain>
                                    </h3>
                                    {/* HeadingMain./. */}
                                </div>
                            </div>
                        </div>

                        {/* ContentMain */}
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4">
                                    <div className="card-body p-4 text-center">
                                        <lord-icon
                                            src="https://cdn.lordicon.com/hzomhqxz.json"
                                            trigger="loop"
                                            colors="primary:#405189,secondary:#08a88a"
                                            style={{ width: '180px', height: '180px' }}
                                        ></lord-icon>

                                        <div className="mt-4 pt-2">
                                            <h4>Đã đăng xuất tài khoản</h4>
                                            <p className="text-muted">
                                                Để tiếp tục quản trị vui lòng đăng nhập lại
                                            </p>
                                            <div className="mt-4">
                                                <a href="#" className="btn btn-success w-100">
                                                    Sign In
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">
                                        Don&apos;t have an account ?{' '}
                                        <a
                                            href="#"
                                            className="fw-semibold text-primary text-decoration-underline"
                                        >
                                            Signup
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* ContentMain./. */}
                    </div>
                </div>
            </LayoutBasic>
        </>
    );
};

export default SignedOut;