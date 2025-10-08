import LayoutCover from '../../layouts/LayoutCover';
import HeadingMain from '../../components/HeadingMain';
import MessageBox from '../../components/MessageBox';
const PasswordChange = () => {
    return (
        <>
            <title>Đổi mật khẩu</title>
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
                                                                        Đổi mật khẩu
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
                                                <h5 className="text-primary">Create new password</h5>
                                                <p className="text-muted">
                                                    Your new password must be different from previous used password.
                                                </p>

                                                <div className="p-2">
                                                    <div className="form">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="password-input">
                                                                Password
                                                            </label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <input
                                                                    type="password"
                                                                    className="form-control pe-5 password-input"
                                                                    onPaste={() => false}
                                                                    placeholder="Enter password"
                                                                    id="password-input"
                                                                    aria-describedby="passwordInput"
                                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                                    required
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    type="button"
                                                                    id="password-addon"
                                                                >
                                                                    <i className="ri-eye-fill align-middle" />
                                                                </button>
                                                            </div>
                                                            <div id="passwordInput" className="form-text">
                                                                Must be at least 8 characters.
                                                            </div>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="confirm-password-input">
                                                                Confirm Password
                                                            </label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <input
                                                                    type="password"
                                                                    className="form-control pe-5 password-input"
                                                                    onPaste={() => false}
                                                                    placeholder="Confirm password"
                                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                                    id="confirm-password-input"
                                                                    required
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    type="button"
                                                                >
                                                                    <i className="ri-eye-fill align-middle" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                                                            <h5 className="fs-13">Password must contain:</h5>
                                                            <p id="pass-length" className="invalid fs-12 mb-2">
                                                                Minimum <b>8 characters</b>
                                                            </p>
                                                            <p id="pass-lower" className="invalid fs-12 mb-2">
                                                                At <b>lowercase</b> letter (a-z)
                                                            </p>
                                                            <p id="pass-upper" className="invalid fs-12 mb-2">
                                                                At least <b>uppercase</b> letter (A-Z)
                                                            </p>
                                                            <p id="pass-number" className="invalid fs-12 mb-0">
                                                                A least <b>number</b> (0-9)
                                                            </p>
                                                        </div>

                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="auth-remember-check"
                                                            />
                                                            <label className="form-check-label" htmlFor="auth-remember-check">
                                                                Remember me
                                                            </label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button className="btn btn-success w-100" type="submit">
                                                                Reset Password
                                                            </button>
                                                        </div>
                                                        {/* messagebox */}
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

export default PasswordChange;