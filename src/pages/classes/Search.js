import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import MainCSS from './Main.module.css';
import Product from "../../components/products/Product";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSearchListAPI } from '../../apis/ProductAPICalls';

function Search() {

    const { search } = useLocation();
    const { value } = queryString.parse(search);
    console.log('value', value);

    /* 상품 목록 데이터 조회 */
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callSearchListAPI({
                search : value,
                currentPage : currentPage
            }));
        }
        , [currentPage, value]
    );
    
    /* 페이징 버튼 */
    const pageInfo = products.pageInfo;
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div className={ MainCSS.productDiv }>
            {
                Array.isArray(productList) 
                && productList.map((product) => (<Product key={ product.productCode } product={ product } />))
            }
            </div>
            <div style={ { listStyleType: 'none', display: 'flex'} }>
            {
                Array.isArray(productList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                    className={ MainCSS.pagingBtn }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ MainCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(productList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={ currentPage === pageInfo.endPage }
                    className={ MainCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            </div>
        </>
    );
}

export default Search;