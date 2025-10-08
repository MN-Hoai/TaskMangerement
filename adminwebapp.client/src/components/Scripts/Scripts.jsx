import { useEffect, useState } from "react";
import Script from '../../components/Script';

const Scripts = () => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        if (isScriptLoaded) {
            window.init();
        }
    }, [isScriptLoaded]);

    return (
        <>
            <Script
                src="/assets/js/app.js"
                defer="true"
                key={location.pathname} // Force reload khi route thay đổi
                onLoad={() => setIsScriptLoaded(true)}
            />
        </>
    );
};

export default Scripts;
