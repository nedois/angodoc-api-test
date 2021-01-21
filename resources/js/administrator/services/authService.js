import axios from "axios";
import { INDEX_URL } from "../config";

class AuthService {
    setAxiosInterceptors = ({ onLogout }) => {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    this.logout();

                    if (onLogout) {
                        onLogout();
                    }
                }

                return Promise.reject(error);
            }
        );
    };

    logout = async () => {
        await axios.get(INDEX_URL + "/logout");
    };
}

const authService = new AuthService();

export default authService;
