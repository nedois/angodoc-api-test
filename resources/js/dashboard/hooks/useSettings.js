import { useContext } from "react";
import SettingsContext from "@dashboard/contexts/SettingsContext";

const useSettings = () => useContext(SettingsContext);

export default useSettings;
