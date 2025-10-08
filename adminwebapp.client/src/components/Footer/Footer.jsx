const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <p className="mb-0">
                                &copy; {currentYear} Computing Academy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
