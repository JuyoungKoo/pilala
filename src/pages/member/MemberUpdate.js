import MemberUpdateCSS from './MemberUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberDetailAPI, callMemberUpdateAPI } from '../../apis/MemberAPICalls';

function MemberUpdate(){

    const params = useParams();
    const memberDetail = useSelector(state => state.memberReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [form, setForm] = useState({});


    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        console.log('[MemberDetail] MemberCode : ', params.memberCode);
        dispatch(callMemberDetailAPI({
            memberCode : params.memberCode
        }));
    }, []);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }


    /* 권한 수정 저장 버튼 클릭 이벤트 */
    const onClickMemberUpdateHandler = () => {

        const formData = new FormData();
        setForm({
            memberCode: memberDetail.memberCode,
            memberRole: memberDetail.memberRole
        })

        dispatch(callMemberUpdateAPI({
            form : formData
        }));

        //navigate('/member-management', { replace : true });
        //window.location.reload();
    }

    return (
        <div>
            <div className={ MemberUpdateCSS.memberButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button 
                    onClick={ onClickMemberUpdateHandler }
                >
                     멤버권한 변경
                </button>
            </div>        
            <div className={ MemberUpdateCSS.memberSection }>
                <div className={ MemberUpdateCSS.memberInfoDiv }>
                </div>
                <div className={ MemberUpdateCSS.memberInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                            <td><label>멤버권한</label></td>
                            
                                <select>
                                    <option
                                         name='memberRole'
                                         placeholder='멤버권한'
                                         className={ MemberUpdateCSS.memberInfoInput }
                                         onChange={ onChangeHandler }
                                         value={form.memberRole}
                                    >ROLE_ADMIN
                                    </option>
                                    <option
                                         name='memberRole'
                                         placeholder='회원'
                                         className={ MemberUpdateCSS.memberInfoInput }
                                         onChange={ onChangeHandler }
                                         value={form.memberRole}
                                    >ROLE_MEMBER
                                    </option>
                                    <option
                                         name='memberRole'
                                         placeholder='사용자'
                                         className={ MemberUpdateCSS.memberInfoInput }
                                         onChange={ onChangeHandler }
                                         value={form.memberRole}
                                    >ROLE_USER
                                    </option>
                                </select>
                                
                            </tr>                  
                           
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );

}

export default MemberUpdate;