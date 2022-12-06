import ClassRegistrationCSS from './ClassRegistration.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassDetailAPI, callClassUpdateAPI } from '../../apis/ClassAPICalls';

function ClassUpdate(){

    const params = useParams();
    const classDetail = useSelector(state => state.classReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        dispatch(callClassDetailAPI({
            classCode : params.classCode
        }));
    }, []);

    useEffect(() => {
        // image 값이 바뀔 때마다 랜더링 -> 파일 첨부가 다시 일어날 때마다 preview 보여주기
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 이미지 첨부 버튼 클릭 이벤트 */
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    /* 파일 첨부 시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            classCode : classDetail.classCode,
            className : classDetail.className,
            classDate : classDetail.classDate,
            startTime : classDetail.startTime,
            endTime: classDetail.endTime,
            classRoom: classDetail.classRoom,
            numStudent: classDetail.numStudent,
            teacherCode : classDetail.teacher.teacherCode
        });
    }

    /* 상품 수정 저장 버튼 클릭 이벤트 */
    const onClickClassUpdateHandler = () => {

        const formData = new FormData();

        formData.append("classCode", form.classCode);
        formData.append("className", form.className);
        formData.append("classDate", form.classDate);
        formData.append("startTime", form.startTime);
        formData.append("endTime", form.endTime);
        formData.append("classRoom", form.classRoom);
        formData.append("numStudent", form.numStudent);
        
        formData.append("teacher.teacherCode", form.teacherCode);

        if(image) {
            formData.append("classImage", image);
        }

        dispatch(callClassUpdateAPI({
            form : formData
        }));

        navigate('/class-management', { replace : true });
        window.location.reload();
    }

    return (
        <div>
            <div className={ ClassRegistrationCSS.classButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                    onClick={ onClickClassUpdateHandler }
                >
                    수업 수정 저장하기
                </button>
            }
            </div>        
            <div className={ ClassRegistrationCSS.classSection }>
                <div className={ ClassRegistrationCSS.classInfoDiv }>
                    <div className={ ClassRegistrationCSS.classImageDiv }>
                        { classDetail && <img 
                            className={ ClassRegistrationCSS.classImage } 
                            src={ (imageUrl == null) ? classDetail.classImageUrl : imageUrl } 
                            alt="preview"
                        />}
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='classImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            className={ ClassRegistrationCSS.classImageButton }
                            onClick={ onClickImageUpload } 
                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                            disabled={ !modifyMode }
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div className={ ClassRegistrationCSS.classInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>수업이름</label></td>
                                <td>
                                    <input 
                                        name='className'
                                        placeholder='수업 이름'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.className : form.className) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>수업날짜</label></td>
                                <td>
                                    <input 
                                        name='classDate'
                                        placeholder='수업날짜'
                                        type='date'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.classDate : form.classDate) || 0 }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>시작시간</label></td>
                                <td>
                                    <input 
                                        name='startTime'
                                        placeholder='시작시간'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.startTime : form.startTime) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td><label>종료시간</label></td>
                                <td>
                                    <input 
                                        name='endTime'
                                        placeholder='종료시간'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.endTime : form.endTime) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td><label>수강인원</label></td>
                                <td>
                                    <input 
                                        name='numStudent'
                                        placeholder='수강인원'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.numStudent : form.numStudent) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td><label>운동기구</label></td>
                                <td>
                                    <input 
                                        name='classRoom'
                                        placeholder='운동기구'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.classRoom : form.classRoom) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td><label>강사선택</label></td>
                                <td>
                                    <input 
                                        name='teacherCode'
                                        placeholder='강사선택'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? classDetail.teacherCode : form.teacherCode) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
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

export default ClassUpdate;