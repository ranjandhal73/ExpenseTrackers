import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {logout, resetTimeout} from '../features/authSlice'

const useAutoLogout = (timeout = 15 * 60 * 1000) => {
    const dispatch = useDispatch();

    const reset = useCallback(() => {
        dispatch(resetTimeout());
    }, [dispatch]);

    useEffect(() => {
        const handleActivity = () => {
            reset();
            clearTimeout(window.logoutTimeout);
            window.logoutTimeout = setTimeout(() => {
                dispatch(logout());
            }, timeout);
        };

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);
        window.addEventListener("scroll", handleActivity);

        // Initialize the timeout
        window.logoutTimeout = setTimeout(() => {
            dispatch(logout());
        }, timeout);

        return () => {
            clearTimeout(window.logoutTimeout);
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
            window.removeEventListener("scroll", handleActivity);
        };
    }, [dispatch, reset, timeout]);
};

export default useAutoLogout;
