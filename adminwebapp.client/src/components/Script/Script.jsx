//Cần cài: npm install prop-types nếu chưa có 
import { useEffect } from "react";
import PropTypes from "prop-types";
const Script = ({
    src,
    async = false,
    defer = false,
    onLoad,
    onError
}) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        if (async) script.async = true;
        if (defer) script.defer = true;
        script.onload = () => onLoad?.();
        script.onerror = () => onError?.();
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [src, async, defer, onLoad, onError]);
    return null;
};

// Khai báo PropTypes
Script.propTypes = {
    src: PropTypes.string.isRequired, // Bắt buộc
    async: PropTypes.bool,
    defer: PropTypes.bool,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

export default Script;