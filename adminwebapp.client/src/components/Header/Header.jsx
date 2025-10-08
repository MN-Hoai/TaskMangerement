const Header = () => {
    return (
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">
                        {/* LOGO */}
                        <div className="navbar-brand-box horizontal-logo">
                            <a href="#" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="/assets/images/logo-sm.png" alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src="/assets/images/logo-dark.png" alt="" height="17" />
                                </span>
                            </a>

                            <a href="#" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src="/assets/images/logo-sm.png" alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src="/assets/images/logo-light.png" alt="" height="17" />
                                </span>
                            </a>
                        </div>

                        <button
                            type="button"
                            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                            id="topnav-hamburger-icon">
                            <span className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="ms-1 header-item d-none d-sm-flex">
                            <button
                                type="button"
                                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                data-toggle="fullscreen">
                                <i className="bx bx-fullscreen fs-22"></i>
                            </button>
                        </div>

                        <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                            <button
                                type="button"
                                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                id="page-header-notifications-dropdown"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className="bx bx-bell fs-22"></i>
                                <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                                    3<span className="visually-hidden">unread messages</span>
                                </span>
                            </button>
                        </div>

                        <div className="dropdown ms-sm-3 header-item topbar-user">
                            <button
                                type="button"
                                className="btn"
                                id="page-header-user-dropdown"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    <img
                                        className="rounded-circle header-profile-user"
                                        src="/assets/images/users/avatar-1.jpg"
                                        alt="Header Avatar"
                                    />
                                    <span className="text-start ms-xl-2">
                                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                                            Anna Adame
                                        </span>
                                        <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                                            Founder
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                <h6 className="dropdown-header">Welcome Anna!</h6>
                                <a className="dropdown-item" href="#">
                                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{' '}
                                    <span className="align-middle">Profile</span>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{' '}
                                    <span className="align-middle">Messages</span>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{' '}
                                    <span className="align-middle">Lock screen</span>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
                                    <span className="align-middle" data-key="t-logout">
                                        Logout
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
