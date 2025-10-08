import { useState } from 'react';
import PropTypes from 'prop-types';

const MessageBox = ({ type, message }) => {
    // Thiết lập usestate lưu trạng thái ẩn/hiện 
    const [isVisible, setIsVisible] = useState(true);

    // Lấy class CSS cho alert dựa trên type
    const getAlertClass = () => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'error':
                return 'alert-danger';
            case 'warning':
                return 'alert-warning';
            default:
                return 'alert-info';
        }
    };

    // Lấy class CSS cho icon dựa trên type
    const getIconClass = () => {
        switch (type) {
            case 'success':
                return 'ri-checkbox-circle-line';
            case 'error':
                return 'ri-close-circle-line';
            case 'warning':
                return 'ri-alert-line';
            default:
                return 'ri-information-line';
        }
    };

    // Nếu không hiển thị hoặc không có message, trả về null (ẩn thông báo)
    if (!isVisible || !message) return null; 

    return (
        <div className="mt-3 alert-box">
            {/* Info Alert */}
            <div className={`alert ${getAlertClass()} alert-dismissible alert-label-icon rounded-label fade show`} role="alert">
                <i className={`${getIconClass()} label-icon`} />
                <span>{ message }</span>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setIsVisible(false)}
                />
            </div>
        </div>
    );
};

// Định nghĩa propTypes
MessageBox.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    message: PropTypes.string
};

// Giá trị mặc định
MessageBox.defaultProps = {
    type: 'info',
    message: ''
};

export default MessageBox;
