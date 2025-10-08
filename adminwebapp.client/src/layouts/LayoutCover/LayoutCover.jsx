import PropTypes from 'prop-types';
import Footer from '../../components/Footer';

const LayoutCover = ({ children }) => {
    return (
        <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-overlay"></div>

            {/* PAGE-WRAPPER */}
            {children}

            {/* ucFooter */}
            <Footer />
        </div>
    );
};

LayoutCover.propTypes = {
    children: PropTypes.node,
};

export default LayoutCover;
