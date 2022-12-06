import MemberManagementCSS from './MemberManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import{ callMemberListForAdminAPI } from '../../apis/MemberAPICalls';

function MemberManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member  = useSelector(state => state.memberReducer);      
    const memberList = member.data;
    console.log('MemberManagement', memberList);

    const pageInfo = member.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = pageInfo.startPage ; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {         
            dispatch(callMemberListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickTableTr = (memberCode) => {
        navigate(`/member-update/${memberCode}`, { replace: false });
    }

    return (
        <>
        <div className={ MemberManagementCSS.bodyDiv }>   
            <table className={ MemberManagementCSS.memberTable }>
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
                        <th>회원이름</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>권한</th>        
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(memberList) && memberList.map((m) => (
                        <tr
                            key={ m.memberCode }
                            onClick={ () => onClickTableTr(m.memberCode) }
                        >
                            <td>{ m.memberCode }</td>
                            <td>{ m.memberName }</td>
                            <td>{ m.memberId }</td>
                            <td>{ m.memberEmail}</td>
                            <td>{ m.joinDate}</td>
                            <td>{ m.memberRole }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(memberList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ MemberManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ MemberManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(memberList) &&
            <button 
                className={ MemberManagementCSS.pagingBtn }
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

export default MemberManagement;