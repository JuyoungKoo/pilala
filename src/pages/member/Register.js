import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterCSS from './Register.module.css';
import { callRegisterAPI } from '../../apis/MemberAPICalls';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    memberId: '',
    memberPassword: '',
    memberName: '',
    memberEmail: '',
  });

  const member = useSelector((state) => state.memberReducer);

  useEffect(() => {
    if (member.status === 201) {
      alert('회원가입이 완료 되었습니다. 로그인페이지로 이동합니다.');
      navigate('/login', { replace: true });
      console.log('[Register] register SUCCESS {}', member);
    }
  }, [member]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickBackHandler = () => {
    navigate('/', { replace: true });
  };

  const onClickRegisterHandler = () => {
    dispatch(
      callRegisterAPI({
        form: form,
      }),
    );
  };

  return (
    <div className={RegisterCSS.backgroundDiv}>
      <div className={RegisterCSS.registerDiv}>
        <h1 className='font-bold text-2xl'>회원가입</h1>
        <input
          className="border-1 border-gray-400 px-2 text-xs"
          type="text"
          name="memberId"
          placeholder="아이디를 입력하세요."
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <input
          className="border-1 border-gray-400 px-2 text-xs"
          type="password"
          name="memberPassword"
          placeholder="패스워드를 입력하세요."
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <input
          className="border-1 border-gray-400 px-2 text-xs"
          type="text"
          name="memberName"
          placeholder="이름을 입력하세요."
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <input
          className="border-1 border-gray-400 px-2 text-xs"
          type="text"
          name="memberEmail"
          placeholder="이메일을 입력하세요."
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <button className="border-1" onClick={onClickRegisterHandler}>
          가입
        </button>
        <button className='mt-4 text-xs text-blue-300' onClick={onClickBackHandler}>
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default Register;
