import { useContext } from "react";
import AuthContext from "@dashboard/contexts/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
