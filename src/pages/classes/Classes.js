import ClassesCSS from './Classes.module.css';
import Class from "../../components/classes/Classes";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassListAPI } from '../../apis/ClassAPICalls';

function Classes() {

    /* 상품 목록 데이터 조회 */
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classReducer);
    const classList = classes.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callClassListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    );
    
    /* 페이징 버튼 */
    const pageInfo = classes.pageInfo;
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div className={ ClassesCSS.classDiv }>
            {
                Array.isArray(classList) 
                && classList.map((classes) => (<Class key={ classes.classCode } classes={ classes } />))
            }
            </div>
            <div style={ { listStyleType: 'none', display: 'flex'} }>
            {
                Array.isArray(classList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                    className={ ClassesCSS.pagingBtn }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ ClassesCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(classList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={ currentPage === pageInfo.maxPage || pageInfo.endPage === 1 }
                    className={ ClassesCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            </div>
        </>
    );
}

export default Classes;