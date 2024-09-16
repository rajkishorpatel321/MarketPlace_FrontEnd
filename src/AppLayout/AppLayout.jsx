import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import Header from "../Component/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default AppLayout;
