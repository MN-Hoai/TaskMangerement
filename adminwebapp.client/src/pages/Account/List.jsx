import HeadingMain from '../../components/HeadingMain';
import Breadcrumb from '../../components/Breadcrumb';
import LayoutMain from '../../layouts/LayoutMain';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import ActionMenu from '../../components/ActionMenu';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const List = () => {
    // Đối tượng hỗ trợ chuyển trang
    const navigate = useNavigate();

    // Search states
    const [isLoading, setIsLoading] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const [keywordSearch, setKeywordSearch] = useState('');

    // Data states
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [accounts, setAccounts] = useState([]);

    // Paging states
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    // Hàm tải danh sách danh mục
    const loadCategoryOptions = useCallback(async () => {
        try {
            const response = await fetch('/api/account-categories/options');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setCategoryOptions(result.data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách danh mục:', error);
        }
    }, []);

    // Hàm tải dữ liệu
    const loadAccounts = useCallback(async () => {
        try {
            const response = await fetch(`/api/accounts?category=${categorySearch}&keyword=${keywordSearch}&page=${currentPage}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();

            setAccounts(result.data.accounts);
            setTotalRecords(result.data.totalRecords);
            setPageSize(result.data.pageSize);
        } catch (error) {
            console.error('Lỗi khi tải danh sách tài khoản:', error);
        }
    }, [categorySearch, keywordSearch, currentPage]);

    // Xử lý thay đổi vị trí trang trong paging
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Xử lý thay đổi danh mục
    const handleCategorySearchChange = (catId) => {
        setCategorySearch(catId);
        setCurrentPage(1);
    };

    // Xử lý thay đổi từ khóa
    const handleKeywordSearchChange = (keyword) => {
        setKeywordSearch(keyword);
        setCurrentPage(1);
    };

    // Xử lý đang gõ từ khóa
    const handleTyping = () => {
        //Bật spinner
        setIsLoading(true);

        //Tắt spinner
        setTimeout(function () {
            setIsLoading(false);
        }, 2000);
    };

    // Xử lý khi nhấn nút Lọc
    const handleSearch = () => {
        loadAccounts();
    };

    // Xử lý khi nhấn nút Hủy lọc
    const handleClearSearch = () => {
        setCategorySearch('');
        setKeywordSearch('');
        setCurrentPage(1);
        loadAccounts();
    };

    // Hàm xử lý khi nhấn nút thêm mới
    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/account-add");
    };

    // Hàm xử lý khi nhấn nút xem chi tiết
    const handleView = (account) => (e) => {
        e.preventDefault();
        navigate(`/account-view/${account.username}`);
    };

    // Hàm xử lý khi nhấn nút chỉnh sửa
    const handleEdit = (account) => (e) => {
        e.preventDefault();
        navigate(`/account-edit/${account.username}`);
    };

    // Hàm xử lý khi nhấn nút kích hoạt
    const handleActivate = (account) => async (e) => {
        e.preventDefault();

        setIsLoading(true); // Bật spinner
        try {
            const response = await fetch(`/api/accounts/${account.username}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: true }),
            });

            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
                return;
            }

            const result = await response.json();

            if (result.success) {
                console.log('Kích hoạt tài khoản thành công: ' + result.data.username);
                loadAccounts();
            } else {
                console.log('Không thể kích hoạt tài khoản:' + result.message);
            }
        } catch (error) {
            console.log('Lỗi khi kích hoạt tài khoản: ' + error);
        } finally {
            setIsLoading(false); // Tắt spinner
        }
    };

    // Hàm xử lý khi nhấn nút tạm khóa
    const handleDeactivate = (account) => async (e) => {
        e.preventDefault();

        setIsLoading(true); // Bật spinner loading...
        try {
            const response = await fetch(`/api/accounts/${account.username}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: false }),
            });

            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
                return;
            }
            const result = await response.json();

            if (result.success) {
                console.log('Tạm khóa tài khoản thành công: ' + result.data.username);
                loadAccounts();
            } else {
                console.log('Không thể tạm khóa tài khoản: ' + result.message);
            }
        } catch (error) {
            console.log('Lỗi khi tạm khóa tài khoản: ' + error);
        } finally {
            setIsLoading(false); // Tắt spinner
        }
    };

    // Hàm xử lý khi nhấn nút xóa
    const handleDelete = (account) => async (e) => {
        e.preventDefault();

        // Hiển thị cảnh báo xác nhận xóa
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${account.username}?`);
        if (!confirmDelete) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/accounts/${account.username}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.log('Lỗi khi xóa tài khoản');
                return;
            }

            const result = await response.json();

            if (result.success) {
                loadAccounts();
                console.log('Xóa tài khoản thành công');
            }
            else {
                console.log('Lỗi khi xóa tài khoản');
                return;
            }

        } catch (error) {
            console.log('Lỗi khi xóa tài khoản: ' + error);
        } finally {
            setIsLoading(false); // Tắt spinner
        }
    };

    // Tự động tải danh sách danh mục khi mount
    useEffect(() => {
        loadCategoryOptions();
    }, [loadCategoryOptions]);

    // Tự đông load dữ liệu khi mount
    useEffect(() => {
        loadAccounts();
    }, [loadAccounts]);

    return (
        <>
            <title>Danh sách tài khoản</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    {/* HeadingMain */}
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>Danh sách tài khoản</HeadingMain>
                                    </h4>
                                    {/* ucBreadcrumb */}
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* ContentMain */}
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    {/* ucSearchBar */}
                                    <SearchBar
                                        categoryOptions={categoryOptions}
                                        onSelectedCategorySearchChange={handleCategorySearchChange}
                                        onKeywordSearchChange={handleKeywordSearchChange}
                                        onAdd={handleAdd}
                                        onTyping={handleTyping}
                                        onSearch={handleSearch}
                                        onClearSearch={handleClearSearch}
                                        isLoading={isLoading}
                                        keywordSearch={keywordSearch}
                                        categorySearch={categorySearch}
                                    />

                                    <div className="card-body">
                                        <div className="live-preview">
                                            <div className="table-responsive">
                                                <table className="table align-middle table-nowrap mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th className="text-center">
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                    />
                                                                </div>
                                                            </th>
                                                            <th className="text-center">STT</th>
                                                            <th className="text-center">Tên đăng nhập</th>
                                                            <th className="text-left">Thông tin cá nhân</th>
                                                            <th className="text-left">Token code</th>
                                                            <th className="text-center">
                                                                <i className="ri-more-2-fill" />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {accounts.map((account, index) => (
                                                            <tr key={account.username}>
                                                                <td className="text-center">
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                   {/* {(currentPage - 1) * pageSize + index + 1}*/}
                                                                </td>
                                                                <td className="text-center">
                                                                    <strong className="text-primary">
                                                                        {account.username}
                                                                    </strong>
                                                                </td>
                                                                <td className="text-left">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="flex-shrink-0 me-3">
                                                                            <div className="avatar-xl bg-light rounded p-1">
                                                                                <img
                                                                                    src={account.avatar || "/assets/images/users/user-dummy-img.jpg"}
                                                                                    alt=""
                                                                                    className="img-fluid d-block"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1">
                                                                            <div className="item-category mb-1">
                                                                                <a
                                                                                    href="#"
                                                                                    className="badge text-primary bg-primary-subtle text-uppercase"
                                                                                >
                                                                                    #{account.accountCategoryID}
                                                                                </a>
                                                                            </div>
                                                                            <h5 className="fs-14 mb-1">
                                                                                <strong>
                                                                                    <i className="ri-account-circle-line" />
                                                                                    <span className="fw-medium">
                                                                                        {account.fullName}
                                                                                    </span>
                                                                                </strong>
                                                                            </h5>
                                                                            <div className="text-muted mb-0">
                                                                                <i className="ri-mail-line" />
                                                                                <span className="fw-medium">
                                                                                    {account.email}
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-muted mb-0">
                                                                                <i className="ri-phone-line" />
                                                                                <span className="fw-medium">
                                                                                    {account.mobile}
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-muted mb-0">
                                                                                <i className="ri-map-pin-line" />
                                                                                <span className="fw-medium">
                                                                                    {account.address}
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-muted mb-0">
                                                                                <i className="ri-shield-flash-line" />
                                                                                <span className={`badge bg-success-subtle ${account.status ? 'text-success' : 'text-body-tertiary'}`}>
                                                                                    {account.status ? "Kích hoạt" : "Tạm khóa"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    <div className="token-info-box">
                                                                        <div className="input-group input-group-sm">
                                                                            <span className="input-group-text">
                                                                                <i className="ri-time-line me-1" />
                                                                                Ngày khởi tạo tài khoản
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={account.createTime ?? ''}
                                                                                readOnly
                                                                            />
                                                                        </div>

                                                                        <div className="input-group input-group-sm">
                                                                            <span className="input-group-text">
                                                                                <i className="ri-time-line me-1" />
                                                                                Ngày cập nhật thông tin
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={account.updateTime ?? ''}
                                                                                readOnly
                                                                            />
                                                                        </div>

                                                                        <div className="input-group input-group-sm">
                                                                            <span className="input-group-text">
                                                                                <i className="ri-time-line me-1" />
                                                                                Ngày cập nhật mật khẩu
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={account.passwordUpdatedTime ?? ''}
                                                                                readOnly
                                                                            />
                                                                        </div>

                                                                        <div className="input-group input-group-sm">
                                                                            <span className="input-group-text">
                                                                                <i className="ri-time-line me-1" />
                                                                                Ngày đăng nhập gần nhất
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={account.lastLoginTime ?? ''}
                                                                                readOnly
                                                                            />
                                                                        </div>
                                                                        <div className="input-group input-group-sm">
                                                                            <span className="input-group-text">
                                                                                <i className="ri-time-line me-1" />
                                                                                Ngày khởi tạo RefreshToken
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={account.refreshTokenCreateTime ?? ''}
                                                                                readOnly
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    {/*ActionMenu*/}
                                                                    <ActionMenu
                                                                        isActive={account.status}
                                                                        onEdit={handleEdit(account)}
                                                                        onView={handleView(account)}
                                                                        onActivate={handleActivate(account)}
                                                                        onDeactivate={handleDeactivate(account)}
                                                                        onDelete={handleDelete(account)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        
                                                    </tbody>
                                                    <tfoot className="table-light">
                                                        <tr>
                                                            <td colSpan="6">
                                                                {/* ucPagination */}
                                                                <Pagination
                                                                    totalRecords={totalRecords}
                                                                    currentPage={currentPage}
                                                                    pageSize={pageSize}
                                                                    onPageChange={handlePageChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
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

export default List;