import LayoutCover from '../../layouts/LayoutCover';
import HeadingMain from '../../components/HeadingMain';
import MessageBox from '../../components/MessageBox';
const PasswordReset = () => {
    return (
        <>
            <title>Reset mật khẩu</title>
            <LayoutCover>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card overflow-hidden m-0">
                                    <div className="row justify-content-center g-0">
                                        <div className="col-lg-6">
                                            <div className="p-lg-3 p-3 auth-one-bg h-100">
                                                <div className="bg-overlay" />
                                                <div id="auth-particles">
                                                    <div className="position-relative h-100 d-flex flex-column">
                                                        <div className="mb-4 text-center">
                                                            <a href="#" className="d-block">
                                                                <img
                                                                    src="/assets/images/logos/logo-banner-betu.png"
                                                                    alt=""
                                                                    height="40"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="mt-auto">
                                                            <div className="mb-3">
                                                                {/* HeadingMain */}
                                                                <h3 className="text-white text-uppercase text-center">
                                                                    <HeadingMain>
                                                                        Reset mật khẩu
                                                                    </HeadingMain>
                                                                </h3>
                                                                {/* HeadingMain./. */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ContentMain */}
                                        <div className="col-lg-6">
                                            <div className="p-lg-5 p-4">
                                                <h5 className="text-primary">Forgot Password?</h5>
                                                <p className="text-muted">Reset password</p>

                                                <div className="mt-2 text-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rhvddzym.json"
                                                        trigger="loop"
                                                        colors="primary:#0ab39c"
                                                        className="avatar-xl"
                                                    />
                                                </div>

                                                <div
                                                    className="alert border-0 alert-warning text-center mb-2 mx-2"
                                                    role="alert"
                                                >
                                                    Enter your email and instructions will be sent to you!
                                                </div>
                                                <div className="p-2">
                                                    <div className="form">
                                                        <div className="mb-4">
                                                            <label className="form-label">Email</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="email"
                                                                placeholder="Enter email address"
                                                            />
                                                        </div>

                                                        <div className="text-center mt-4">
                                                            <button className="btn btn-success w-100" type="submit">
                                                                Send Reset Link
                                                            </button>
                                                        </div>
                                                        {/*<!-- messagebox -->*/}
                                                        <MessageBox />
                                                    </div>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">
                                                        Wait, I remember my password...{' '}
                                                        <a
                                                            href="#"
                                                            className="fw-semibold text-primary text-decoration-underline"
                                                        >
                                                            Click here
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ContentMain./. */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutCover>
        </>
    );
};

export default PasswordReset;