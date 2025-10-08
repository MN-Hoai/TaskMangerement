import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";
import Script from '../../components/Script';
const List = () => {
    return (
        <>
            <title>Danh sách icon</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">

                                    {/*<!-- HeadingMain -->*/}
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>
                                            Danh sách icon
                                        </HeadingMain>
                                    </h4>
                                    {/*<!-- ucBreadcrumb -->*/}
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/*<!-- ContentMain -->*/}

                        <div className="row">
                            <div className="col-12" id="icons"></div>
                            <Script src="/assets/js/remix-icons-listing.js" defer></Script>
                        </div>

                        {/*<!-- ContentMain./. -->*/}

                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default List;
