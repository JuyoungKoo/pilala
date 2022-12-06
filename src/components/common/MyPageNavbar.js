import MyPageNavbarCSS from './MyPageNavbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { Navigate, NavLink } from 'react-router-dom';


function MyPageNavbar() {

    /* accessToken 소지 및 유효 확인 */
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {
        return <Navigate to="/" />;
    }

    return (
        <div className={ MyPageNavbarCSS.MyPageNavbarDiv }>
            <ul className={ MyPageNavbarCSS.MyPageNavbarUl }>
                <li><NavLink to="/mypage/profile">회원 정보</NavLink></li>
                <li><NavLink to="/mypage/payment">수강 정보</NavLink></li>
            </ul>
        </div>
    );

}

export default MyPageNavbar;