import TeacherRegistrationCSS from "./TeacherRegistration.module.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//mport { decodeJwt } from '../../utils/tokenUtils';
import{ callTeacherRegistAPI } from '../../apis/TeacherAPICalls';

function TeacherRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        teacherName : ''
       
    })

   // const token = decodeJwt(window.localStorage.getItem('accessToken'));

    /* 입력 양식의 값 변경될 때  */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
        
    /* 강사 등록 버튼 클릭 이벤트 */
    const onClickTeacherRegistrationHandler = () => {

        dispatch(callTeacherRegistAPI({
            form : form
        }));
        
        alert("강사등록이 완료 되었습니다.");
        navigate('/teacher-management', {replace : true});
        window.location.reload();
    }

    

    return (
        <div>
            <div className={ TeacherRegistrationCSS.teacherButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button
                   // onClick = { () => console.log("찍히냐?") }      
                    onClick={ onClickTeacherRegistrationHandler }             
                >
                    강사 등록
                </button>
            </div>        
            <div className={ TeacherRegistrationCSS.teacherSection }>
                <div className={ TeacherRegistrationCSS.teacherInfoDiv }>
                </div>
                <div className={ TeacherRegistrationCSS.teacherInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>강사이름</label></td>
                                <td>
                                    <input 
                                        name='teacherName'
                                        placeholder='강사 이름'
                                        autoComplete='off'
                                        className={ TeacherRegistrationCSS.teacherInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>                   
                          
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );

}

export default TeacherRegistration;