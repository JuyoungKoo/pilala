import { GET_TEACHERS, POST_TEACHER, DELETE_TEACHER } from "../modules/TeacherModule";

export const callTeacherListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/teachers?page=${currentPage}`;

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
            console.log('[callTeacherListAPI] callTeacherListAPI result : ', result);
            dispatch({ type: GET_TEACHERS, payload: result.data });
        }
    }

}

export const callTeacherRegistAPI = ({ form }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/teachers`;
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                teacherName : form.teacherName
            })

        })
        console.log("!!!!!!!!!!!!!!!", result)
        .then(response => response.json())
        .catch(error => console.log("등록 api 오류:::",error));

        if(result.status === 200) {
            console.log('[callTeacherListAPI] callTeacherRegistAPI result : ', result);
            dispatch({ type: POST_TEACHER, payload: result });
        }
    }

}


