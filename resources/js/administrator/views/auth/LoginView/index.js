import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { APP_URL, INDEX_URL } from "../../../config";
import { login } from "../../../actions/accountActions";

export default function LoginView() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const initAuth = async () => {
            try {
                await dispatch(login());
                history.push(APP_URL + "/dashboard");
            } catch (e) {
                window.location.replace(INDEX_URL + "/login");
            }
        };

        initAuth();
    });
    return null;
}
