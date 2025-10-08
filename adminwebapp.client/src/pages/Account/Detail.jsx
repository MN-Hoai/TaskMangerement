import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LayoutMain from '../../layouts/LayoutMain';
import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import MessageBox from "../../components/MessageBox";
const Detail = ({ mode }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State
    const [isLoading, setIsLoading] = useState();
    const [message, setMessage] = useState({ type: 'info', content: 'Mời nhập thông tin tài khoản' });
    const [formErrors, setFormErrors] = useState({})

    // Data State
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rePassword: '',
        fullName: '',
        avatar: '',
        email: '',
        mobile: '',
        address: '',
        gender: 'true',
        status: 'true',
        passwordEncodeKey: '',
        passwordUpdatedTime: '',
        lastLoginTime: '',
        refreshToken: '',
        refreshTokenCreateTime: '',
        createTime: '',
        updateTime: '',
        createBy: '',
        accountCategoryID: ''
    });

    // Data State
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [accountOptions, setAccountOptions] = useState([]);

    // Hàm tải danh sách danh mục
    const loadCategoryOptions = useCallback(async () => {
        try {
            const response = await fetch('/api/account-categories/options');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setCategoryOptions(result.data);
        } catch (error) {
            console.log('Lỗi khi tải danh sách danh mục:', error);
        }
    }, []);

    // Hàm tải danh sách tùy chọn tài khoản
    const loadAccountOptions = useCallback(async () => {
        try {
            const response = await fetch('/api/accounts/options');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setAccountOptions(result.data);
        } catch (error) {
            console.log('Lỗi khi tải danh sách danh mục:', error);
        }
    }, []);

    // Hàm tải dữ liệu tài khoản
    const loadAccount = useCallback(async () => {
        if (!id || mode === 'add') return; // Không tải dữ liệu nếu ở chế độ add

        try {
            setIsLoading(true);
            const response = await fetch(`/api/accounts/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();

            if (result.success) {
                setFormData(result.data); // Điền dữ liệu vào form
            } else {
                setMessage({ type: 'error', content: result.message || 'Không tìm thấy tài khoản.' });
            }
        } catch (error) {
            console.log('Lỗi khi tải thông tin tài khoản:', error);
            setMessage({ type: 'error', content: 'Lỗi khi tải thông tin tài khoản.' });
        } finally {
            setIsLoading(false);
        }
    }, [id, mode]);

    // Hàm xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //
    };


    // Hàm chung để xử lý điều hướng đến trang mới
    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleEdit = () => {
        handleNavigate(`/account-edit/${id}`);
    };

    const handleBack = () => {
        handleNavigate('/account-list');
    };

    // Hàm upload ảnh/nhiều ảnh cùng lúc
    const handleUpload = async (inputContent) => {
        if (!inputContent) {
            inputContent=''; // Trả về chuỗi rỗng nếu không có nội dung
        }
        const fileUrls = inputContent.split("#\n").map(url => url.trim()).filter(url => url);

        const isPublicInternetFile = (url) => /^https?:\/\//.test(url); // Kiểm tra xem URL có phải là public internet file không
        const isBlobUrl = (url) => url.startsWith("blob:"); // Kiểm tra xem URL có phải là local blob file không

        // Hàm upload public internet file, vd: https://domain.com/images/demo.jpg
        const uploadPublicFile = async (url) => {
            const response = await fetch("/api/uploads/upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });
            return await response.json();
        };

        // Hàm upload local blob file, vd: blob:https://localhost/9cf6d666-e1ef-4465-9e13-d165e6fa001e#jpg
        const uploadBlobFile = async (blobUrl, fileName) => {
            try {
                // Lấy dữ liệu blob từ URL
                const blob = await fetch(blobUrl).then(res => res.blob());

                // Tạo FormData và thêm file với tên gốc (bao gồm extension)
                const formData = new FormData();
                formData.append("file", blob, fileName); // Sử dụng tên file gốc

                // Gửi file lên backend
                const response = await fetch("/api/uploads/upload-file", {
                    method: "POST",
                    body: formData,
                });

                return await response.json();
            } catch (error) {
                console.log("Lỗi khi upload file blob:", error);
                throw error; // Ném lỗi để xử lý ở nơi gọi hàm
            }
        };

        // Hàm upload các loại file khác, vd: /uploads/demo.jpg
        const uploadOtherFile = async (url) => {
            const response = await fetch("/api/uploads/upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });
            return await response.json();
        };

        // Hàm xử lý upload danh sách file đã chọn
        const updatedUrls = await Promise.all(
            fileUrls.map(async (url) => {
                try {
                    let response;

                    if (isPublicInternetFile(url)) {
                        // Xử lý public internet file
                        response = await uploadPublicFile(url);
                    } else if (isBlobUrl(url)) {
                        // Xử lý local blob file
                        const fileName = url;
                        response = await uploadBlobFile(url, fileName);
                    } else {
                        // Xử lý relative file
                        response = await uploadOtherFile(url);
                    }

                    if (response.success) {
                        return response.data.savedFileUrl; // Thay thế bằng relative URL đã lưu
                    } else {
                        console.log(response.data.error); // Log lỗi nếu có
                        return ""; // Thay thế bằng chuỗi rỗng nếu thất bại
                    }
                } catch (error) {
                    console.log(`Lỗi khi xử lý file: ${url}`, error); // Log lỗi nếu có
                    return ""; // Thay thế bằng chuỗi rỗng nếu thất bại
                }
            })
        );

        // Trả về nội dung đã cập nhật dưới dạng chuỗi
        return updatedUrls.join("#\n");
    }

    // Hàm định dạng chuỗi ngày tháng từ 1 ngày hợp lệ
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0'); // Ngày (2 chữ số)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (2 chữ số, tháng bắt đầu từ 0)
        const year = date.getFullYear(); // Năm
        const hours = String(date.getHours()).padStart(2, '0'); // Giờ (2 chữ số)
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Phút (2 chữ số)
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Giây (2 chữ số)

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    // Hàm kiểm tra tính hợp lệ của một trường cụ thể
    const validateField = (fieldName, value, formData) => {
        const errors = {};

        switch (fieldName) {
            case 'username':
                if (!value) {
                    errors.username = 'Username không được để trống.';
                }
                break;
            case 'password':
                if (mode === 'add' && !value) { // Chỉ kiểm tra password ở chế độ add
                    errors.password = 'Password không được để trống.';
                } else if (mode === 'edit' && value && !formData.password) {
                    errors.password = 'Password không được để trống nếu bạn muốn thay đổi.';
                }
                break;
            case 'rePassword':
                if (mode === 'add' && !value) { // Chỉ kiểm tra password ở chế độ add
                    errors.rePassword = 'Xác nhận mật khẩu không được để trống.';
                } else if (mode === 'add' && value !== formData.password) { // Chỉ kiểm tra rePassword ở chế độ add
                    errors.rePassword = 'Mật khẩu và xác nhận mật khẩu không khớp.';
                } else if (mode === 'edit' && value && value !== formData.password) {
                    errors.rePassword = 'Mật khẩu và xác nhận mật khẩu cần giống nhau.';
                }
                break;
            case 'fullName':
                if (!value) {
                    errors.fullName = 'Họ và tên không được để trống.';
                }
                break;
            case 'email':
                if (!value) {
                    errors.email = 'Email không được để trống.';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = 'Email không đúng định dạng.';
                }
                break;
            case 'mobile':
                if (!value) {
                    errors.mobile = 'Số điện thoại không được để trống.';
                } else if (!/^\d{10,11}$/.test(value)) {
                    errors.mobile = 'Số điện thoại phải là 10 hoặc 11 chữ số.';
                }
                break;
            case 'accountCategoryID':
                if (!value) {
                    errors.accountCategoryID = 'Vui lòng chọn loại tài khoản.';
                }
                break;
            case 'createBy':
                if (!value) {
                    errors.createBy = 'Vui lòng chọn người tạo tài khoản.';
                }
                break;
            case 'createTime':
            case 'refreshTokenCreateTime':
            case 'passwordUpdatedTime':
            case 'lastLoginTime':
            case 'updateTime':
                if (value) {
                    // Kiểm tra định dạng dd/MM/yyyy HH:mm:ss
                    const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
                    if (!dateTimeRegex.test(value)) {
                        errors[fieldName] = 'Thời gian không đúng định dạng (dd/MM/yyyy HH:mm:ss).';
                    } else {
                        // Kiểm tra tính hợp lệ của giá trị thời gian
                        const [datePart, timePart] = value.split(' ');
                        const [day, month, year] = datePart.split('/').map(Number);
                        const [hour, minute, second] = timePart.split(':').map(Number);

                        // Thử ép kiểu sang Date
                        const date = new Date(year, month - 1, day, hour, minute, second);

                        // Sau khi ép kiểu, kiểm tra lại nếu khác giá trị ban đầu thì không hợp lệ
                        if (
                            date.getDate() !== day ||
                            date.getMonth() + 1 !== month ||
                            date.getFullYear() !== year ||
                            date.getHours() !== hour ||
                            date.getMinutes() !== minute ||
                            date.getSeconds() !== second
                        ) {
                            errors[fieldName] = 'Để trống hoặc nhập đúng định dạng (dd/MM/yyyy HH:mm:ss).';
                        }
                    }
                }
                break;
            default:
                break;
        }

        return errors;
    };
                        
    // Hàm kiểm tra toàn bộ form
    const validateFormData = (formData) => {
        const errors = {};
        let hasError = false;

        // Lặp qua tất cả các trường trong formData
        for (const fieldName in formData) {
            const fieldErrors = validateField(fieldName, formData[fieldName], formData);
            if (Object.keys(fieldErrors).length > 0) {
                Object.assign(errors, fieldErrors); // Gộp lỗi vào danh sách lỗi
                hasError = true; // Đánh dấu rằng có lỗi
            }
        }

        return { hasError, errors };
    };
    //Hàm chuẩn hóa dữ liệu trước khi lên backend
    const normalizeFormData = (prevData) => {
        const currentDate = formatDate(new Date());
        return {
            ...prevData,
            //Gán giá trị ngày giờ mặc định cho ô trường ngày giờ
            createTime: prevData.createTime || currentDate,
            updateTime: prevData.updateTime || currentDate,
            passwordUpdatedTime: prevData.passwordUpdatedTime || currentDate,
            lastLoginTime: prevData.lastLoginTime || currentDate,
            refreshTokenCreateTime: prevData.refreshTokenCreateTime || currentDate,
            // Chuyển đổi các trường boolean thành chuỗi 'true' hoặc 'false'
            gender: prevData.gender === 'true' ? true : false,
            status: prevData.status === 'true' ? true : false,
        }
    };


    // Hàm xử lý khi nhấn nút "Lưu"
    const handleSave = () => {
        const inputContent = formData.avatar; // Lấy nội dung từ input
        // Kiểm tra tính hợp lệ của dữ liệu form
        const { hasError, errors } = validateFormData(formData);
        if (hasError) {
            setMessage({ type: 'error', content: 'Vui lòng kiểm tra lại thông tin đã nhập.' });
            setFormErrors(errors); // Cập nhật lỗi vào state

        }
        else {
            setFormErrors({}); // Xóa lỗi nếu không có lỗi
        }
        handleUpload(inputContent).then(updatedContent => {
            // Cập nhật giá trị mới và gọi hành động tiếp theo
            setFormData((prevData) => {
                const updatedFormData = normalizeFormData({
                    ...prevData,
                    avatar: updatedContent,
                    //acb
                 
                    

                });

                // Kiểm tra mode để quyết định hành động tiếp theo
                if (mode === 'add') {
                    handleAdd(updatedFormData); // Thêm mới
                } else if (mode === 'edit') {
                    handleUpdate(updatedFormData); // Cập nhật
                }
                return updatedFormData;
            });

        });
    };

    // Hàm thêm mới tài khoản
    const handleAdd = async (formData) => {
        setIsLoading(true); // Bắt đầu trạng thái loading
        try {
            const response = await fetch('/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Gửi dữ liệu form lên backend
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Thêm mới tài khoản thất bại.');
            }

            const result = await response.json();
            setMessage({ type: 'success', content: result.message || 'Thêm mới tài khoản thành công!' });

            // Chuyển hướng về danh sách tài khoản sau khi cập nhật thành công
            handleBack();
        } catch (error) {
            setMessage({ type: 'error', content: error.message || 'Thêm mới tài khoản thất bại.' });
        } finally {
            setIsLoading(false); // Kết thúc trạng thái loading
        }
    };

    // Hàm cập nhật tài khoản
    const handleUpdate = async (formData) => {
        setIsLoading(true); // Bắt đầu trạng thái loading
        try {
            const response = await fetch(`/api/accounts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Gửi dữ liệu form lên backend
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Cập nhật tài khoản thất bại.');
            }

            const result = await response.json();
            setMessage({ type: 'success', content: result.message || 'Cập nhật tài khoản thành công!' });

            // Chuyển hướng về danh sách tài khoản sau khi cập nhật thành công
            handleBack();
        } catch (error) {
            setMessage({ type: 'error', content: error.message || 'Cập nhật tài khoản thất bại.' });
        } finally {
            setIsLoading(false); // Kết thúc trạng thái loading
        }
    };

    // Tải dữ liệu ban đầu khi component mount hoặc khi `mode` thay đổi
    useEffect(() => {
        setMessage({ type: 'info', content: 'Mời nhập thông tin tài khoản' });

        if (mode === 'add') {
            // Chế độ thêm mới: Khởi tạo form với giá trị mặc định
            setFormData({
                username: '',
                password: '',
                fullName: '',
                avatar: '',
                email: '',
                mobile: '',
                address: '',
                gender: 'true',
                status: 'true',
                passwordEncodeKey: '',
                passwordUpdatedTime: null,
                lastLoginTime: null,
                refreshToken: '',
                refreshTokenCreateTime: null,
                createTime: null,
                updateTime: null,
                createBy: '',
                accountCategoryID: '',
            });
        } else {
            // Chế độ xem hoặc chỉnh sửa: Tải dữ liệu tài khoản
            loadAccount();
        }

        //Tải danh sách thể loại tùy chọn
        loadCategoryOptions();

        //Tải danh sách tài khoản tùy chọn
        loadAccountOptions();
    }, [mode, id, loadAccount, loadCategoryOptions, loadAccountOptions]);

    return (
        <>
            <title>Chi tiết tài khoản</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    {/* HeadingMain */}
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>Chi tiết tài khoản</HeadingMain>
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
                                            <h5 className="card-title mb-0">Thông tin cơ bản</h5>
                                        </div>

                                        <div className="card-body pb-0">
                                            <label className="form-label">Loại tài khoản</label>
                                            <select
                                                name="accountCategoryID"
                                                value={formData.accountCategoryID?.toLowerCase() || ''}
                                                disabled={mode === 'view'}
                                                className={`form-select ${formErrors.accountCategoryID ? 'is-invalid' : ''}`}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Chọn loại tài khoản</option>
                                                {categoryOptions.map((category) => (
                                                    <option key={category.value} value={category.value.toLowerCase()}>
                                                        {category.text}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.accountCategoryID && (
                                                <div className="invalid-feedback d-block ">
                                                    {formErrors.accountCategoryID}
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-body pb-0">
                                            <label className="form-label">Trạng thái tài khoản</label>
                                            <select
                                                name="status"
                                                value={String(formData.status)}
                                                disabled={mode === 'view'}
                                                className={`form-select ${formErrors.status ? 'is-invalid' : ''}`}
                                                onChange={handleInputChange}
                                            >
                                                <option key="true" value="true">Kích hoạt</option>
                                                <option key="false" value="false">Tạm khóa</option>
                                            </select>
                                            {formErrors.status && (
                                                <div className="invalid-feedback d-block ">
                                                    {formErrors.status}
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-body pb-0">
                                            <label className="form-label">Ngày tạo tài khoản</label>
                                            <input
                                                type="text"
                                                name="createTime"
                                                value={formData.createTime}
                                                readOnly={mode === 'view'}
                                                className="form-control date-time-mask"
                                                placeholder="dd/mm/yyyy hh:mm:ss"
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="card-body pb-0">
                                            <label className="form-label">Người tạo tài khoản</label>
                                            <select
                                                name="createBy"
                                                value={formData.createBy || ''}
                                                disabled={mode === 'view'}
                                                className={`form-select ${formErrors.createBy ? 'is-invalid' : ''}`}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Chọn người tạo tài khoản</option>
                                                {accountOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.value} - {option.text}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.createBy && (
                                                <div className="invalid-feedback d-block ">
                                                    {formErrors.createBy}
                                                </div>
                                            )}
                                        </div>

                                        {/*Avatar*/}
                                        <div className="card-body pb-0 avatar-container">
                                            <label className="form-label">Hình đại diện</label>
                                            <div className="text-center">
                                                <div className="position-relative d-flex justify-content-center border border-dark rounded">
                                                    <div className="position-absolute top-0 start-100 translate-middle">
                                                        <label
                                                            htmlFor="avatar-file-upload"
                                                            className="mb-0"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="right"
                                                            title="Upload ảnh đại diện"
                                                        >
                                                            <div className="avatar-xs">
                                                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                    <i className="ri-upload-cloud-2-fill" />
                                                                </div>
                                                            </div>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="avatar-file-upload"
                                                            accept="image/png, image/gif, image/jpeg"
                                                            className="form-control d-none"
                                                        />
                                                    </div>
                                                    <div className="avatar-xxl">
                                                        <div className="avatar-title bg-light rounded">
                                                            <a data-fancybox="avatar" data-caption={formData.avatar || ''} href={formData.avatar || ''}>
                                                                <img
                                                                    className="avatar-preview avatar-xxl p-2 h-auto"
                                                                    alt={formData.avatar || '/assets/images/users/user-dummy-img.jpg'}
                                                                    src={formData.avatar || '/assets/images/users/user-dummy-img.jpg'}
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-group mt-2 mb-3">
                                                <textarea
                                                    type="text"
                                                    rows="1"
                                                    name="avatar"
                                                    value={formData.avatar || ''}
                                                    readOnly={mode === 'view'}
                                                    className="form-control avatar-file-url"
                                                    placeholder="Url hình đại diện"
                                                    onInput={handleInputChange}
                                                ></textarea>
                                                <a
                                                    className="btn btn-icon border bg-light text-danger avatar-remove"
                                                    href="#"
                                                >
                                                    <i className="ri-delete-bin-5-line" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">Thông tin chính</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    {/* Username */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Username</label>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username || ''}
                                                            readOnly={mode === 'view' || mode === 'edit'}
                                                            className="form-control"
                                                            placeholder="Nhập username"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* Full Name */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Họ và tên</label>
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            value={formData.fullName || ''}
                                                            readOnly={mode === 'view'}
                                                            className="form-control"
                                                            placeholder="Nhập họ và tên"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* Password */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Password</label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password || ''}
                                                            readOnly={mode === 'view'}
                                                            className="form-control"
                                                            placeholder="Password"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* RePassword */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Nhập lại password</label>
                                                        <input
                                                            type="password"
                                                            name="rePassword"
                                                            value={formData.rePassword || ''}
                                                            readOnly={mode === 'view'}
                                                            className="form-control"
                                                            placeholder="Nhập lại password"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* Email */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email || ''}
                                                            readOnly={mode === 'view'}
                                                            className="form-control"
                                                            placeholder="Nhập email"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* Mobile */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Số điện thoại</label>
                                                        <input
                                                            type="text"
                                                            name="mobile"
                                                            value={formData.mobile || ''}
                                                            readOnly={mode === 'view'}
                                                            className="form-control"
                                                            placeholder="Nhập số điện thoại"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* Address */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Địa chỉ</label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={formData.address || ''}
                                                            readOnly={mode === 'view'}
                                                            className="form-control"
                                                            placeholder="Nhập địa chỉ"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    {/* Gender */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Phái</label>
                                                        <select
                                                            name="gender"
                                                            value={String(formData.gender)}
                                                            disabled={mode === 'view'}
                                                            className="form-select"
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="false">Nam</option>
                                                            <option value="true">Nữ</option>
                                                        </select>
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
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Refresh token code</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-refresh-line" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="refreshToken"
                                                                value={formData.refreshToken || ''}
                                                                readOnly={mode === 'view'}
                                                                className="form-control"
                                                                placeholder="Refresh token code"
                                                                onChange={handleInputChange}
                                                            />
                                                            <div className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Ngày khởi tạo RefreshToken</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-time-line" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="refreshTokenCreateTime"
                                                                value={formData.refreshTokenCreateTime}
                                                                readOnly={mode === 'view'}
                                                                className="form-control date-time-mask"
                                                                placeholder="dd/mm/yyyy hh:mm:ss"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Key mã hóa password</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-refresh-line" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="passwordEncodeKey"
                                                                value={formData.passwordEncodeKey || ''}
                                                                readOnly={mode === 'view'}
                                                                className="form-control"
                                                                placeholder="Key mã hóa password"
                                                                onChange={handleInputChange}
                                                            />
                                                            <div className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Ngày cập nhật password</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-time-line" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="passwordUpdatedTime"
                                                                value={formData.passwordUpdatedTime}
                                                                readOnly={mode === 'view'}
                                                                className="form-control date-time-mask"
                                                                placeholder="dd/mm/yyyy hh:mm:ss"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Ngày đăng nhập gần nhất</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-time-line" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="lastLoginTime"
                                                                value={formData.lastLoginTime}
                                                                readOnly={mode === 'view'}
                                                                className="form-control date-time-mask"
                                                                placeholder="dd/mm/yyyy hh:mm:ss"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Ngày cập nhật tài khoản</label>
                                                        <div className="input-group has-validation mb-3">
                                                            <span className="input-group-text">
                                                                <i className="ri-time-line" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="updateTime"
                                                                value={formData.updateTime}
                                                                readOnly={mode === 'view'}
                                                                className="form-control date-time-mask"
                                                                placeholder="dd/mm/yyyy hh:mm:ss"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Box */}
                                    <MessageBox
                                        type={message.type}
                                        message={message.content}
                                    />

                                    {/* buttonbox */}
                                    <div className="text-center mb-3">
                                        {/* Nút Lưu */}
                                        {(mode === 'add' || mode === 'edit') && (
                                            <button
                                                type="button"
                                                className="btn btn-primary w-sm mx-1"
                                                onClick={handleSave}
                                                disabled={isLoading}
                                            >
                                                <>
                                                    {isLoading && <i className="spinner-border spinner-border-sm me-1" />}
                                                    {!isLoading && <i className="ri-send-plane-line me-1" />}
                                                    Lưu
                                                </>
                                            </button>
                                        )}

                                        {/* Nút Chỉnh sửa */}
                                        {mode === 'view' && (
                                            <button
                                                type="button"
                                                className="btn btn-primary w-sm mx-1"
                                                onClick={handleEdit}
                                            >
                                                <i className="ri-edit-fill me-1" />
                                                Chỉnh sửa
                                            </button>
                                        )}

                                        {/* Nút Trở về */}
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary w-sm mx-1"
                                            onClick={handleBack}
                                        >
                                            <i className="ri-arrow-go-back-line me-1" />
                                            Trở về
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

// Khai báo PropTypes
Detail.propTypes = {
    mode: PropTypes.oneOf(['add', 'view', 'edit']).isRequired,
};
export default Detail;