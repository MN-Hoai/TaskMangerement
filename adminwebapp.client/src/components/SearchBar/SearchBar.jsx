import { useCallback } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
    categoryOptions = [],
    onAdd,
    onTyping,
    onSearch,
    onClearSearch,
    categorySearch = '',
    keywordSearch = '',
    onSelectedCategorySearchChange,
    onKeywordSearchChange,
    isLoading = false,
}) => {

    // Hàm xử lý khi thay đổi giá trị category
    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (onSelectedCategorySearchChange) {
            onSelectedCategorySearchChange(value);
        }
    };

    // Hàm xử lý khi gõ vào ô input để tìm kiếm
    const handleKeywordChange = (event) => {
        const value = event.target.value;
        if (onKeywordSearchChange) {
            onKeywordSearchChange(value);
        }
    };

    // Hàm xử lý phím Enter và Escape
    const handleKeywordKeyUp = (event) => {
        if (event.key === 'Enter') {
            if (onSearch) {
                onSearch();
            }
        } else if (event.key === 'Escape') {
            if (onClearSearch) {
                onClearSearch;
            }
        }
    };

    // Hàm xử lý khi gõ các phím, hoặc paste văn bản trong ô keyword
    const handleKeywordInput = () => {
        if (onTyping) {
            onTyping();
        }
    }

    // Xử lý khi nhấn nút Lọc
    const triggerSearch = useCallback(() => {
        if (onSearch) {
            onSearch();
        }
    }, [onSearch]);

    // Xử lý khi nhấn nút Xóa Lọc
    const triggerClearSearch = useCallback(() => {
        if (onClearSearch) {
            onClearSearch();
        }
    }, [onClearSearch]);

    return (
        <div className="card-header align-items-center d-flex gap-2">
            {/* Nút Thêm */}
            <div className="flex-shrink-0 d-flex gap-2">
                <a
                    href="#"
                    className="btn btn-success add-btn waves-effect waves-light"
                    onClick={onAdd}
                >
                    <i className="ri-add-line align-bottom me-1" />
                    Thêm
                </a>
            </div>
            {/* Khu vực tìm kiếm */}
            <div className="d-flex gap-2 flex-grow-1">
                <div className="search-box">
                    <i className="ri-stackshare-line search-icon" />
                    <select className="form-control form-select bg-light border-light"
                            value={categorySearch || ''}
                            onChange={handleCategoryChange}
                    >
                        {/* Option mặc định */}
                        <option value="" selected>
                            Chọn thể loại
                        </option>

                        {/* Option động */}
                        {categoryOptions.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.text}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ô tìm kiếm */}
                <div className="search-box flex-grow-1">
                    <i className="ri-search-line search-icon" />
                    <input
                        type="search"
                        className="form-control search bg-light border-light"
                        placeholder="Search..."
                        value={keywordSearch}
                        onChange={handleKeywordChange}
                        onInput={handleKeywordInput}
                        onKeyUp={handleKeywordKeyUp}
                    />
                </div>
            </div>
            <div className="flex-shrink-0 d-flex gap-2">
                <button
                    className="btn btn-primary waves-effect waves-light"
                    onClick={triggerSearch}
                    disabled={isLoading}>
                    <>
                        {isLoading && <i className="spinner-border spinner-border-sm me-1" />}
                        {!isLoading && <i className="ri-equalizer-fill align-bottom me-1" />}
                        <span role="status">Lọc</span>
                    </>
                </button>
                <button
                    className="btn btn-outline-primary waves-effect waves-light"
                    onClick={triggerClearSearch}>
                    <i className="ri-close-circle-fill me-1 align-bottom" />
                    Clear
                </button>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    categoryOptions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
    onAdd: PropTypes.func.isRequired,
    onTyping: PropTypes.func,
    onSearch: PropTypes.func,
    onClearSearch: PropTypes.func,
    categorySearch: PropTypes.string,
    keywordSearch: PropTypes.string,
    onSelectedCategorySearchChange: PropTypes.func,
    onKeywordSearchChange: PropTypes.func,
    isLoading: PropTypes.bool,
};
export default SearchBar;
