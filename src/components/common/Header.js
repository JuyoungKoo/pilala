import { NavLink, useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from './LoginModal';
import { AiOutlineSearch } from 'react-icons/ai';

function Header() {
  /* localStorage에 저장 된 토큰 정보가 있으면 로그인 한 상태이다. */
  const isLogin = window.localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [loginModal, setLoginModal] = useState(false);

  /* 로고 클릭 시 메인 페이지로 이동  */
  const onClickLogoHandler = () => {
    navigate('/', { replace: true });
  };

  /* 검색 키워드 입력 시 입력 값 상태 저장*/
  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  /* enter 키 입력 시 검색 화면으로 넘어가는 처리 */
  const onEnterKeyHandler = (e) => {
    if (e.key == 'Enter') {
      console.log('Enter Key', search);

      navigate(`/search?value=${search}`, { replace: false });
    }
  };

  const onClickMyPageHandler = () => {
    //토큰이 만료 되었다면 다시 로그인 -> 로그인 모달창 띄우기
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    if (token.exp * 1000 < Date.now()) {
      setLoginModal(true);
      return;
    }
    navigate('/mypage', { replace: true });
  };

  /* 로그아웃 버튼 이벤트 */
  const onClickLogoutHandler = () => {
    window.localStorage.removeItem('accessToken');
    dispatch(callLogoutAPI());
    alert('로그아웃 후 메인으로 이동합니다.');
    navigate('/', { replace: true });
  };

  function BeforeLogin() {
    return (
      <div>
        <NavLink to="/login">로그인</NavLink> | <NavLink to="/register">회원가입</NavLink>
      </div>
    );
  }

  function AfterLogin() {
    return (
      <div>
        <button className={HeaderCSS.HeaderBtn} onClick={onClickMyPageHandler}>
          마이페이지
        </button>{' '}
        |
        <button className={HeaderCSS.HeaderBtn} onClick={onClickLogoutHandler}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
      <div className="flex flex-row justify-between mx-14 my-2">
        <div className="flex flex-row">
          <img className="w-6 h-6 mr-4" src="./images/yoga.png" />
          <button className={HeaderCSS.LogoBtn} onClick={onClickLogoHandler}>
            PILALA
          </button>
        </div>
        <div className="flex flex-row items-center">
          <input
            className="ml-24 px-4 py-1 mr-2 text-sm border-1 border-gray-300"
            type="text"
            placeholder="수업명을 입력해보세요~"
            value={search}
            onKeyUp={onEnterKeyHandler}
            onChange={onSearchChangeHandler}
          />
          <AiOutlineSearch className="mr-24" />
        </div>
        {/* 로그인 상황에 따라 다른 컴포넌트 랜더링 */}
        {!isLogin ? <BeforeLogin /> : <AfterLogin />}
      </div>
    </>
  );
}

export default Header;
