//src/hooks/useSignIn.js

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
    //Dùng để chuyển hướng đến trang chính sau khi login
    const navigate = useNavigate();

    // State lưu trữ thông tin đăng nhập: username và password
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    // State lưu trữ thông báo: kiểu và nội dung
    const [message, setMessage] = useState({ type: 'info', content: 'Mời nhập thông tin đăng nhập' });

    // State kiểm soát việc hiển thị mật khẩu (true = hiển thị, false = ẩn)
    const [showPassword, setShowPassword] = useState(false);

    // State kiểm tra xem người dùng có chọn "ghi nhớ tôi" hay không
    const [rememberMe, setRememberMe] = useState(false);

    // Effect khôi phục username và password đã lưu trong localStorage nếu có
    const restoreCredentials = () => {
        const savedUsername = localStorage.getItem('rememberedUser');
        const savedPassword = localStorage.getItem('rememberedPassword');

        if (savedUsername && savedPassword) {
            setCredentials(prev => ({
                ...prev,
                username: savedUsername,
                password: savedPassword
            }));
            setRememberMe(true);
        }
    };

    // Hàm useEffect để gọi các function Effect
    useEffect(() => {
        restoreCredentials();
    }, []);

    // Hàm kiểm tra dữ liệu đã nhập là hợp lệ
    const isValidData = (username, password) => {
        // Dữ liệu nhập không hợp lệ
        if (!username.trim() && !password.trim()) {
            setMessage({ type: 'warning', content: 'Mời nhập thông tin đăng nhập' });
            return false;
        }
        else if (!username.trim()) {
            setMessage({ type: 'warning', content: 'Mời nhập username' });
            return false;
        }
        else if (!password.trim()) {
            setMessage({ type: 'warning', content: 'Mời nhập password' });
            return false;
        }

        // Dữ liệu nhập hợp lệ
        setMessage({ type: 'info', content: 'Xin mời đăng nhập' });
        return true;
    };

    // Hàm xử lý thay đổi giá trị của input
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Cập nhật state credentials với giá trị mới
        setCredentials(prev => ({
            ...prev,
            [id]: value
        }));

        // Lấy giá trị username + password mới nhất trong các ô
        const username = (id === 'username' ? value : credentials.username);
        const password = (id === 'password' ? value : credentials.password);

        // Kiểm tra dữ liệu
        isValidData(username, password);
    };

    // Hàm xử lý submit form, phụ thuộc vào nhiều giá trị nên không dùng useCallback
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lấy giá trị username + password mới nhất trong usestate
        const username = credentials.username;
        const password = credentials.password;

        // Kiểm tra dữ liệu nếu không hợp lệ thì dừng submit
        if (!isValidData(username, password)) {
            return;
        }

        try {
            // Gọi hàm fetchLogin để gửi request
            const data = await fetchLogin(credentials);

            if (data.success) {
                // Nếu đăng nhập thành công
                setMessage({ type: 'success', content: data.message });

                // Lưu username và password vào localStorage nếu người dùng chọn "ghi nhớ tôi"
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', credentials.username);
                    localStorage.setItem('rememberedPassword', credentials.password);
                } else {
                    localStorage.removeItem('rememberedUser');
                    localStorage.removeItem('rememberedPassword');
                }

                // Lưu token vào localStorage để sử dụng cho các request sau
                localStorage.setItem('authToken', data.token);

                // Điều hướng đến trang chính ("/") sau 3 giây
                setTimeout(() => navigate('/'), 3000);
            } else {
                // Nếu server trả về lỗi, hiển thị thông báo lỗi
                setMessage({ type: 'error', content: data.message || 'Đăng nhập thất bại' });
            }
        } catch (error) {
            // Log lỗi ra console để debug
            console.log('Lỗi khi gọi API:', error);

            // Hiển thị thông báo lỗi kết nối đến máy chủ
            setMessage({ type: 'error', content: 'Lỗi kết nối đến máy chủ' });
        }
    };

    // Hàm fetchLogin để gửi request POST đến API
    const fetchLogin = async (credentials) => {
        const response = await fetch('/api/authentication/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        return response.json(); // Parse response thành JSON
    };

    // Hàm xử lý toggle hiển thị mật khẩu với useCallback để tránh tạo lại hàm mỗi lần render
    const togglePassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    // Trả về các state và hàm để sử dụng trong component
    return {
        credentials,
        message,
        showPassword,
        rememberMe,
        handleInputChange,
        handleSubmit,
        togglePassword,
        setRememberMe,
        setMessage
    };
};
