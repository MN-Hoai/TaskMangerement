import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Scripts from '../../components/Scripts';

const LayoutMain = ({ children }) => {
    return (
        <div id="layout-wrapper">
            {/*Header*/}
            <Header />

            {/*Nav*/}
            <Nav />

            <div className="main-content">
                {/*PAGE-WRAPPER*/}
                {children}

                {/*Footer*/}
                <Footer />
            </div>

            <Scripts />
        </div>
    );
};

LayoutMain.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutMain;
