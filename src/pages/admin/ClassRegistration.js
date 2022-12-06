import ClassRegistrationCSS from "./ClassRegistration.module.css";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { callClassRegistAPI } from '../../apis/ClassAPICalls';
import { useDispatch } from 'react-redux';


function ClassRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({
        className : '',
        classDate : '',
        startTime : '',
        endTime : '',
        classRoom : '',
        numStudent : 0,
        teacherCode : 0
       
    })

    useEffect(() => {
        //image 값이 바뀔 때 마다 랜더링 -> 파일첨부가 다시 일어날 때마다 preview보여주기 
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
    [image])

    /* 입력 양식의 값 변경될 때  */
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

    /* 강의 등록 버튼 클릭 이벤트 */
    const onClickClassRegistrationHandler = () => {
        const formData = new FormData();

        formData.append("className", form.className);
        formData.append("classDate", form.classDate);
        formData.append("startTime", form.startTime);
        formData.append("endTime", form.endTime);
        formData.append("classRoom", form.classRoom);
        formData.append("numStudent", form.numStudent);
        formData.append("teacher.teacherCode", form.teacherCode);

        if(image){
            formData.append("classImage", image);
        }

        console.log('formdata', form);

        dispatch(callClassRegistAPI({
            form : formData,
        }));

        navigate('/class-management', {replace : true});
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
                <button
                   // onClick = { () => console.log("찍히냐?") }      
                    onClick={ onClickClassRegistrationHandler }             
                >
                    수업 등록
                </button>
            </div>        
            <div className={ ClassRegistrationCSS.classSection }>
                <div className={ ClassRegistrationCSS.classInfoDiv }>
                    <div className={ ClassRegistrationCSS.classImageDiv }>
                        { imageUrl && <img 
                            className={ ClassRegistrationCSS.classImage } 
                            src={ imageUrl } 
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
                                    />
                                </td>
                            </tr>                   
                            <tr>
                                <td><label>수업 날짜</label></td>
                                <td>
                                    <input 
                                        name='classDate'
                                        type="date"
                                        placeholder='수업 날짜'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
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
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>기구선택</label></td>
                                <td>
                                    <input 
                                        name='classRoom'
                                        placeholder='기구선택'
                                        className={ ClassRegistrationCSS.classInfoInput }
                                        onChange={ onChangeHandler }
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

export default ClassRegistration;