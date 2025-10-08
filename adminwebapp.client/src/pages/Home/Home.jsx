import HeadingMain from "../../components/HeadingMain";
import Breadcrumb from "../../components/Breadcrumb";
import LayoutMain from "../../layouts/LayoutMain";
const Home = () => {
    return (
        <>
            <title>Màn hình chính</title>
            <LayoutMain>
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">

                                    {/* HeadingMain */}
                                    <h4 className="mb-sm-0">
                                        <HeadingMain>
                                            Màn hình chính
                                        </HeadingMain>
                                    </h4>
                                    {/* ucBreadcrumb */}
                                    <Breadcrumb />
                                </div>
                            </div>
                        </div>

                        {/* ContentMain */}
                        <div className="content-main">
                            {/* Nội dung chính đặt tại đây */}
                        </div>
                        {/* ContentMain./. */}
                    </div>
                </div>
            </LayoutMain>
        </>
    );
};

export default Home;
