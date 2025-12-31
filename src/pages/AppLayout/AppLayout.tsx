import { useEffect } from "react";
import { User } from "@components/User";
import { Maps } from "../../components/Maps";
import { Sidebar } from "../../components/Sidebar";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  useEffect(() => {
    import("flag-icons/css/flag-icons.min.css");
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Maps />
      <User />
    </div>
  );
};

export default AppLayout;
