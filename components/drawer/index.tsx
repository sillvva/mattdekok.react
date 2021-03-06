import { useContext, useEffect, useState } from "react";
import MainLayoutContext, { menuItems } from "../../store/main-layout.context";
import HexMenu from "../../components/hex-menu";
import styles from "./Drawer.module.scss";

const defaultMenuClasses = ["sm:scale-100", "md:scale-125"];

const Drawer = () => {
  const { drawer } = useContext(MainLayoutContext);
  let [menuClasses, setMenuClasses] = useState(defaultMenuClasses);
  let [drawerClasses, setDrawerClasses] = useState("hidden opacity-0");

  useEffect(() => {
    if (drawer.action == "opening") {
      setMenuClasses([...defaultMenuClasses, styles.Open]);
      setTimeout(() => {
        setDrawerClasses("flex opacity-100");
      }, 50);
    } else if (drawer.action == "closing") {
      setMenuClasses([...defaultMenuClasses, styles.Close]);
      setDrawerClasses("flex opacity-0");
    } else if (!drawer.state) setDrawerClasses("hidden opacity-0");
  }, [drawer]);

  return (
    <nav className={`${styles.Drawer} ${drawerClasses}`} onClick={drawer.toggle}>
      <HexMenu items={menuItems} maxLength={3} classes={menuClasses} itemClasses={["menu-bounce"]} rotated={menuItems.length % 2 == 0} />
    </nav>
  );
};

export default Drawer;
