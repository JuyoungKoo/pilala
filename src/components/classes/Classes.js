import ClassCSS from './Class.module.css';
import { useNavigate } from 'react-router-dom';

/* pros
properties의 약어, 컴포넌트 속성을 설정할 때 사용하는 요소
Main에서 Product 컴포넌트를 생성할 때 <Product product={ product(상품 정보가 담긴 객체) } />와 같이 생성하면
Product에서 전달 된 값을 꺼내서 사용할 수 있다. 구조 분해 할당을 이용해서 꺼낸다. */
function Class({ classes : {classCode, classImageUrl, className, classDate, classRoom, startTime, endTime, numStudent }}) {

    const navigate = useNavigate();

    const onClickClassHandler = (classCode) => {
        /* 상품 div 클릭 시 전달 된 productCode를 기반으로 /product/1 와 같은 navigate 요청을 보낸다.
        replace : true -> 뒤로 가기 불가, replace : false -> 뒤로 가기 가능 */
        navigate(`/class/${classCode}`, { replace : false });
    }

    return (
        <div
            className={ ClassCSS.classDiv }
            onClick={ () => onClickClassHandler(classCode) }
        >
            <img src={ classImageUrl } alt="테스트"/>
            <h5>{ className }</h5>
            <h5> { classDate }</h5>
            <h5> { startTime }-{ endTime }</h5>
            <h5> { classRoom }</h5>
        </div>
    );

}

export default Class;