import { NavLink } from 'react-router-dom';
import NavCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';

function Navbar() {
  const isLogin = window.localStorage.getItem('accessToken');
  let decode = null;

  if (isLogin) {
    const temp = decodeJwt(isLogin);
    decode = temp.auth[0];
  }

  return (
    <div className={NavCSS.NavbarDiv}>
      <ul className="flex flex-row justify-between mx-80 my-4">
        <li>
          <NavLink to="/">센터소개</NavLink>
        </li>
        <li>
          <NavLink to="/classes">수업조회</NavLink>
        </li>
        {decode === 'ROLE_ADMIN' && (
          <li>
            <NavLink to="/class-management">수업관리</NavLink>
          </li>
        )}
        {decode === 'ROLE_ADMIN' && (
          <li>
            <NavLink to="/teacher-management">강사관리</NavLink>
          </li>
        )}
        {decode === 'ROLE_ADMIN' && (
          <li>
            <NavLink to="/member-management">회원관리</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
