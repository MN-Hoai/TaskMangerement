import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Nav = () => {
    const location = useLocation();
    const isDropdownOpen = (paths) => {
        return paths.some((path) => location.pathname.startsWith(path));
    };

    return (
        <>
            <div className="app-menu navbar-menu">
                {/* MENU LOGO */}
                <div className="navbar-brand-box">
                    {/* Dark Logo*/}
                    <NavLink to="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-dark.png" alt="" height="35" />
                        </span>
                    </NavLink>
                    {/* Light Logo*/}
                    <NavLink to="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-light.png" alt="" height="35" />
                        </span>
                    </NavLink>

                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>

                {/* MENU LIST */}
                <div id="scrollbar">
                    <div className="container-fluid">

                        <div id="two-column-menu">
                        </div>
                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="menu-title"><span>DASHBOARDS</span></li>

                            {/* Index */}
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link menu-link">
                                    <i className="ri-home-4-line"></i>
                                    <span>Dashboards</span>
                                </NavLink>
                            </li>

                            <li className="menu-title"><span>AUTHENCATION</span></li>

                            {/* Account */}
                            <li className="nav-item">
                                <a className="nav-link menu-link"
                                    href="#group2"
                                    data-bs-toggle="collapse"
                                    aria-expanded={isDropdownOpen(['/account-category', '/account-list', '/account-detail'])}
                                >
                                    <i className="ri-account-circle-line"></i>
                                    <span>Tài khoản</span>
                                </a>
                                <div className={`collapse menu-dropdown ${isDropdownOpen(['/account-category', '/account-list', '/account-detail']) ? 'show' : ''}`}
                                    id="group2">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to="/account-category" className="nav-link">Thể loại tài khoản</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/account-list" className="nav-link">Danh sách tài khoản</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="menu-title"><span>PAGES</span></li>

                            {/* Task */}
                            <li className="nav-item">
                                <a className="nav-link menu-link"
                                    href="#group3"
                                    data-bs-toggle="collapse"
                                    aria-expanded={isDropdownOpen(['/task-list', '/task-target', '/task-schedule', '/task-progress', '/task-comment'])}
                                >
                                    <i className="ri-file-list-3-line"></i>
                                    <span data-key="t-forms">Quản lý kế hoạch</span>
                                </a>
                                <div className={`collapse menu-dropdown ${isDropdownOpen(['/task-list', '/task-target', '/task-schedule', '/task-progress', '/task-comment']) ? 'show' : ''}`}
                                    id="group3">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to="/task-list" className="nav-link">Lập kế hoạch</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/task-target" className="nav-link">Lập chỉ tiêu</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/task-schedule" className="nav-link">Lên lịch tuyển sinh</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/task-progress" className="nav-link">Tiến độ công việc</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/task-comment" className="nav-link">Phản hồi công việc</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            {/* Member */}
                            <li className="nav-item">
                                <a className="nav-link menu-link"
                                    href="#group4"
                                    data-bs-toggle="collapse"
                                    aria-expanded={isDropdownOpen(['/member-list', '/member-report'])}
                                >
                                    <i className="ri-file-list-3-line"></i>
                                    <span data-key="t-forms">Thành viên</span>
                                </a>
                                <div className={`collapse menu-dropdown ${isDropdownOpen(['/member-list', '/member-task-of-member']) ? 'show' : ''}`}
                                    id="group4">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to="/member-list" className="nav-link">Danh sách thành viên</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/member-task-of-member" className="nav-link">Công việc của thành viên</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/* Report */}
                            <li className="nav-item">
                                <a className="nav-link menu-link"
                                    href="#group5"
                                    data-bs-toggle="collapse"
                                    aria-expanded={isDropdownOpen(['/report'])}
                                >
                                    <i className="ri-file-list-3-line"></i>
                                    <span data-key="t-forms">Báo cáo</span>
                                </a>
                                <div className={`collapse menu-dropdown ${isDropdownOpen(['/report', '/report-history']) ? 'show' : ''}`}
                                    id="group5">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to="/report" className="nav-link">Báo cáo</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/report-history" className="nav-link">Lịch sử báo cáo</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </div>
                    {/* Sidebar */}
                </div>
                <div className="sidebar-background"></div>
            </div>
            <div className="vertical-overlay"></div>{/* Vertical Overlay*/}
        </>
    );
};

export default Nav;
