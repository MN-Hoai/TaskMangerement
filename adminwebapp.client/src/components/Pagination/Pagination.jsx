import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

const Pagination = ({
    totalRecords,
    currentPage,
    pageSize,
    onPageChange
}) => {
    // States
    const [pageNumbers, setPageNumbers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // Hàm tính toán danh sách số trang
    const buildPageNumbers = useCallback(() => {
        const totalPages = Math.ceil(totalRecords / pageSize);
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }

        // Cập nhật vào state
        setPageNumbers(numbers);
        setTotalPages(totalPages);
    }, [totalRecords, pageSize]);

    // Hàm xử lý khi nhấp vào 1 trang bất kỳ
    const handlePageClick = (e, pageNumber) => {
        e.preventDefault();

        // Nếu trang không hợp lệ, hoặc là trang hiện tại thì bỏ qua
        if (pageNumber < 1 || pageNumber > totalPages || pageNumber == currentPage) {
            return;
        }

        //Kích hoạt event onPageChange
        if (onPageChange) {
            onPageChange(pageNumber);
        }
    };

    // Hàm xử lý khi nút "Trang trước" được nhấp vào
    const handlePrevClick = (e) => {
        e.preventDefault();
        handlePageClick(e, currentPage - 1);
    };

    // Hàm xử lý khi nút "Trang sau" được nhấp vào
    const handleNextClick = (e) => {
        e.preventDefault();
        handlePageClick(e, currentPage + 1);
    };

    // Tự động tải danh sách trang khi mount
    useEffect(() => {
        buildPageNumbers();
    }, [buildPageNumbers]);

    return (
        <ul className="pagination pagination-separated justify-content-center mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a href="#"
                    className="page-link"
                    onClick={handlePrevClick}
                >
                    ←
                </a>
            </li>

            {pageNumbers.map((number) => (
                <li key={number}
                    className={`page-item ${number === currentPage ? 'active' : ''}`}>
                    <a  href="#"
                        className="page-link"
                        onClick={(e) => handlePageClick(e, number)}
                    >
                        {number}
                    </a>
                </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a href="#"
                    className="page-link"
                    onClick={handleNextClick}
                >
                    →
                </a>
            </li>
        </ul>
    );
};

// Định nghĩa propTypes cho component Pagination
Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
