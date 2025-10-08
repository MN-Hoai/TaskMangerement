import PropTypes from 'prop-types';

const TaskActionMenu = ({ taskId, isActive, onView, onEdit, onDelete }) => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-sm btn-light rounded-circle shadow-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={!isActive}
                title={isActive ? "Tùy chọn tác vụ" : "Tác vụ đã hoàn thành"}
            >
                <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => onView(taskId)}
                        title="Xem chi tiết tác vụ"
                    >
                        <i className="bi bi-eye me-2"></i>Xem chi tiết
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={() => onEdit(taskId)}
                        disabled={!isActive}
                        title={isActive ? "Chỉnh sửa tác vụ" : "Không thể chỉnh sửa tác vụ đã hoàn thành"}
                    >
                        <i className="bi bi-pencil me-2"></i>Chỉnh sửa
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item text-danger"
                        onClick={() => onDelete(taskId)}
                        disabled={!isActive}
                        title={isActive ? "Xóa tác vụ" : "Không thể xóa tác vụ đã hoàn thành"}
                    >
                        <i className="bi bi-trash me-2"></i>Xóa
                    </button>
                </li>
            </ul>
        </div>
    );
};

TaskActionMenu.propTypes = {
    taskId: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskActionMenu;