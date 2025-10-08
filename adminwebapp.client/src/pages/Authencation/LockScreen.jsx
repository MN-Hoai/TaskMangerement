import LayoutBasic from '../../layouts/LayoutBasic';
import HeadingMain from '../../components/HeadingMain';
import MessageBox from '../../components/MessageBox';
const LockScreen = () => {
    return (
        <>
            <title>Đã khóa màn hình, mời nhập mật khẩu để tiếp tục</title>
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
                                            Đã khóa màn hình, mời nhập mật khẩu để tiếp tục
                                        </HeadingMain>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* ContentMain */}
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4">
                                    <div className="card-body p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Lock Screen</h5>
                                            <p className="text-muted">
                                                Enter your password to unlock the screen!
                                            </p>
                                        </div>
                                        <div className="user-thumb text-center">
                                            <img
                                                src="/assets/images/users/avatar-1.jpg"
                                                className="rounded-circle img-thumbnail avatar-lg"
                                                alt="thumbnail"
                                            />
                                            <h5 className="font-size-15 mt-3">Admin</h5>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <div className="form">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="userpassword">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="userpassword"
                                                        placeholder="Enter password"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-2 mt-4">
                                                    <button className="btn btn-success w-100" type="submit">
                                                        Unlock
                                                    </button>
                                                </div>
                                                {/*<!-- messagebox -->*/}
                                                <MessageBox />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">
                                        Not you ? return{' '}
                                        <a
                                            href="#"
                                            className="fw-semibold text-primary text-decoration-underline"
                                        >
                                            Signin
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

export default LockScreen;
