import TeacherManagementCSS from './TeacherManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import{ callTeacherListAPI } from '../../apis/TeacherAPICalls';

function TeacherManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const teacher  = useSelector(state => state.teacherReducer);      
    const teacherList = teacher.data;
    console.log('TeacherMenagement', teacherList);

    const pageInfo = teacher.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callTeacherListAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickTeacherInsert = () => {
        console.log('[TeacherManagement] onClickTeacherInsert');
        navigate("/teacher-registration", { replace: false })
    }

        


    return (
        <>
        <div className={ TeacherManagementCSS.bodyDiv }>
            <div className={ TeacherManagementCSS.buttonDiv }>
                <button
                    onClick={ onClickTeacherInsert }
                >
                    강사등록
                </button>
            </div>            
            <table className={ TeacherManagementCSS.teacherTable }>
                <colgroup>
                    <col width="15%" />
                    <col width="45%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>강사번호</th>
                        <th>강사이름</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(teacherList) && teacherList.map((t) => (
                        <tr
                            key={ t.teacherCode }
                        >
                            <td>{ t.teacherCode }</td>
                            <td>{ t.teacherName }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(teacherList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ TeacherManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ TeacherManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(teacherList) &&
            <button 
                className={ TeacherManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default TeacherManagement;