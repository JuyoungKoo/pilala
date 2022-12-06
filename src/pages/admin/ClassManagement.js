import ClassManagementCSS from './ClassManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import{ callClassListForAdminAPI } from '../../apis/ClassAPICalls';

function ClassManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes  = useSelector(state => state.classReducer);      
    const classList = classes.data;
    console.log('ClassManagement', classList);

    const pageInfo = classes.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callClassListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickClassInsert = () => {
        console.log('[ClassManagement] onClickClassInsert');
        navigate("/class-registration", { replace: false })
    }

    const onClickTableTr = (classCode) => {
        navigate(`/class-update/${classCode}`, { replace: false });
    }

    return (
        <>
        <div className={ ClassManagementCSS.bodyDiv }>
            <div className={ ClassManagementCSS.buttonDiv }>
                <button
                    onClick={ onClickClassInsert }
                >
                    강의 등록
                </button>
            </div>            
            <table className={ ClassManagementCSS.classTable }>
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
                        <th>번호</th>
                        <th>수업이름</th>
                        <th>수업날짜</th>
                        <th>수업시간</th>
                        <th>수업기구</th>
                        <th>강사명</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(classList) && classList.map((c) => (
                        <tr
                            key={ c.classCode }
                            onClick={ () => onClickTableTr(c.classCode) }
                        >
                            <td>{ c.classCode }</td>
                            <td>{ c.className }</td>
                            <td>{ c.classDate }</td>
                            <td>{ c.startTime}-{c.endTime}</td>
                            <td>{ c.classRoom}</td>
                            <td>{ c.teacher.teacherName }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(classList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ ClassManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ ClassManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(classList) &&
            <button 
                className={ ClassManagementCSS.pagingBtn }
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

export default ClassManagement;