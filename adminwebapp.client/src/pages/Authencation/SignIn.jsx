import { useSignIn } from '../../hooks/useSignIn';
import LayoutBasic from '../../layouts/LayoutBasic';
import HeadingMain from '../../components/HeadingMain';
import MessageBox from '../../components/MessageBox';

const SignIn = () => {
    const {
        credentials,
        message,
        showPassword,
        rememberMe,
        handleInputChange,
        handleSubmit,
        togglePassword,
        setRememberMe,
        //setMessage
    } = useSignIn();

    return (
        <>
            <title>Đăng nhập tài khoản</title>
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
                                            Đăng nhập tài khoản
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
                                    <div className="card-body p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form className="form" onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        placeholder="Enter username"
                                                        value={credentials.username}
                                                        onChange={handleInputChange}
                                                        autoFocus
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <a href="#" className="text-muted">
                                                            Forgot password?
                                                        </a>
                                                    </div>
                                                    <label className="form-label" htmlFor="password-input">
                                                        Password
                                                    </label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter password"
                                                            id="password"
                                                            value={credentials.password}
                                                            onChange={handleInputChange} />
                                                        <button
                                                            type="button"
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            onClick={togglePassword}>
                                                            <i className={`ri-eye${showPassword ? '-fill' : '-line'} align-middle`} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rememberMe"
                                                        checked={rememberMe}
                                                        onChange={(e) => setRememberMe(e.target.checked)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="auth-remember-check"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>

                                                {/* messagebox */}
                                                <MessageBox
                                                    type={message.type}
                                                    message={message.content} />

                                                {/* buttonbox */}
                                                <div className="text-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary w-sm w-100 mb-2"
                                                    >
                                                        <i className="ri-login-box-line"></i>
                                                        Sign In
                                                    </button>
                                                </div>
                                            </form>
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

export default SignIn;