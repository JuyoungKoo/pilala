import { GET_MEMBERS, GET_MEMBER, POST_LOGIN, POST_REGISTER, PUT_MEMBER } from "../modules/MemberModule";

export const callLoginAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            },
            body : JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] callLoginAPI result : ', result);
            // 클라이언트 측의 localStorage에 로그인 완료 시 발급 된 accessToken을 저장한다.
            // 이후 토큰이 필요한 요청에는 저장된 토큰을 넣어서 요청하도록 한다.
            window.localStorage.setItem('accessToken', result.data.accessToken);
            dispatch({ type: POST_LOGIN, payload: result });
        }
    }

}

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {

        dispatch({ type: POST_LOGIN, payload: ''});
        console.log('[MemberAPICalls] callLogoutAPI result : SUCCESS');
    }
}

/* 회원가입 API */
export const callRegisterAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/join`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword,
                memberName: form.memberName,
                memberEmail: form.memberEmail                
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_REGISTER,  payload: result });
        }        
    };
}

/* 회원정보 조회 API */
export const callGetMemberAPI = ({memberId}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/members/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);        
        
        if(result.status === 200){
            dispatch({ type: GET_MEMBER,  payload: result });
        }        
    };
}

/* 전체 회원 정보 조회 API */
export const callMemberListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/members?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] callMemberListForAdminAPI result : ', result);
            dispatch({ type: GET_MEMBERS, payload: result.data });
        }
    }

}

export const callMemberDetailAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/member/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] calㅣMemberDetailAPI RESULT : ', result);
            dispatch({ type: GET_MEMBER, payload : result.data });
        }
    }
}

export const callMemberUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/members`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                memberCode : form.memberCode,
                memberRole : form.memberRole
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] callMemberUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_MEMBER, payload : result.data });
        }
    }
}













