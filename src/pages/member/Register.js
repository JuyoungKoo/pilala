import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterCSS from './Register.module.css';
import { callRegisterAPI } from '../../apis/MemberAPICalls';

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [form, setForm] = useState({
        memberId : '',
        memberPassword : '',
        memberName: '',
        memberEmail:''
    });

      const member = useSelector(state => state.memberReducer);

      useEffect(() => {
              if(member.status === 201){
                  alert('회원가입이 완료 되었습니다. 로그인페이지로 이동합니다.');
                  navigate('/login', { replace : true });
                  console.log("[Register] register SUCCESS {}", member)    
              }
          }
          ,[member]
  
      );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickBackHandler = () => {
        navigate("/", { replace : true });
    }

    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form : form
        }));
    
    }


    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원가입</h1>
                <input 
                    type="text" 
                    name="memberId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name="memberPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberName"
                    placeholder="이름" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberEmail"
                    placeholder="이메일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Register;
