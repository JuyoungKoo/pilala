import LayoutCSS from "./Layout.module.css"
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* Outlet : 라우팅 되는 컴포넌트를 대체하기 위한 마커 역할 */
function Layout() {

    return (
        <>
            <Header/>
            <Navbar/>
            <main className={ LayoutCSS.main }>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}

export default Layout;