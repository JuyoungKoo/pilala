import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { useEffect } from 'react';
import { callGetMemberAPI } from '../../apis/MemberAPICalls';
import RegisterCSS from './Register.module.css';


function Profile() {

    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const memberDetail = member.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {

        if(token) {
            dispatch(callGetMemberAPI({
                memberId: token.sub
            }));
        }

    }, []);

    return (
        <div 
            className={ RegisterCSS.backgroundDiv}
            style={ { backgroundColor: 'white' } }
        >

            { memberDetail &&
            <div className={ RegisterCSS.registerDiv }>
                <h1>내 정보</h1>
                <input 
                    type="text" 
                    placeholder="아이디" 
                    readOnly={true}
                    value={ memberDetail.memberId || ''}
                />
                <input 
                    type="text" 
                    placeholder="이름" 
                    readOnly={true}
                    value={ memberDetail.memberName || ''}
                />
                <input 
                    type="text" 
                    placeholder="이메일" 
                    readOnly={true}
                    value={ memberDetail.memberEmail || ''}
                />
            </div>

            }
        </div>
    );
}

export default Profile;