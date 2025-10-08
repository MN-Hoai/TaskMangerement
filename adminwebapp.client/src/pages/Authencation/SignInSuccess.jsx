import HeadingMain from '../../components/HeadingMain';
import LayoutCover from '../../layouts/LayoutCover';

const SignInSuccess = () => {
    return (
        <>
            <title>Đăng nhập thành công</title>
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
                                                                        Đăng nhập thành công
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
                                            <div className="p-lg-5 p-4 text-center">
                                                <div className="avatar-lg mx-auto mt-2">
                                                    <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                                        <i className="ri-checkbox-circle-fill" />
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-2">
                                                    <h4>Well done !</h4>
                                                    <p className="text-muted mx-4">
                                                        Aww yeah, you successfully read this important message.
                                                    </p>
                                                    <div className="mt-4">
                                                        <a href="#" className="btn btn-success w-100">
                                                            Back to Dashboard
                                                        </a>
                                                    </div>
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

export default SignInSuccess;