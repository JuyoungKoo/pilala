import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { callClassDetailAPI } from '../../apis/ClassAPICalls';
import LoginModal from '../../components/common/LoginModal';
import { decodeJwt } from '../../utils/tokenUtils';
import ClassDetailCSS from './ClassDetail.module.css';

function ClassDetail() {

    const dispatch = useDispatch();
    const classes = useSelector(state => state.classReducer);
    const params = useParams();
    const classCode = params.classCode;
    const [amount, setAmount] = useState(1);
    const [loginModel, setLoginModal] = useState(false);
    //console.log('classCode ', classCode);


    /* 구매 수량 변화시 적용 */
    const onChangeAmountHandler = (e) => {
        setAmount(e.target.value);
    }

    useEffect(
        () => {
            dispatch(callClassDetailAPI({
                classCode : classCode
            }));
        },
        []
    );

    //console.log('class', class);

    /* 구매하기 버튼 이벤트 */
    const onClickPurchaseHandler = () => {

        // 1. 로그인 상태인지 확인 
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[onClickPurchaseHandler] token' , token)

        if(!token) {
            alert("구매 전 로그인이 필요합니다.");
            setLoginModal(true)
            return;
        }

        // 2. 토큰이 만료 되었을 때 다시 로그인
        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        } 

    }

    return (
        <>
            { loginModel ? <LoginModal setLoginModal={ setLoginModal }/> : null }
            <div className={ ClassDetailCSS.DetailDiv } >
                <div className={ ClassDetailCSS.imgDiv }>
                    <img src={ classes.classImageUrl } alt="테스트"/>
                    <button
                        className={ ClassDetailCSS.reviewBtn }
                    >
                        리뷰보기
                    </button>
                </div>
                <div className={ ClassDetailCSS.descriptionDiv }>
                    <table className={ ClassDetailCSS.descriptionTable }>
                        <tbody>
                            <tr>
                                <th>수업 코드</th>
                                <td>{ classes.classCode || '' }</td>
                            </tr>
                            <tr>
                                <th>수업 이름</th>
                                <td>{ classes.className || '' }</td>
                            </tr>
                            <tr>
                                <th>수업 날짜</th>
                                <td>{ classes.classDate || '' }</td>
                            </tr>
                            <tr>
                                <th>시작 시간</th>
                                <td>{ classes.startTime || '' }</td>
                            </tr>
                            <tr>
                                <th>종료 시간</th>
                                <td>{ classes.endTime || '' }</td>
                            </tr>
                            <tr>
                                <th>수강 인원</th>
                                <td>{ classes.numStudent || '' }</td>
                            </tr>
                            <tr>
                                <th>강사</th>
                                <td>{ classes.teacherName }</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className={ ClassDetailCSS.classBuyBtn }
                        onClick = { onClickPurchaseHandler }
                    >
                        신청하기
                    </button>
                </div>
            </div>
        </>
    );

}

export default ClassDetail;