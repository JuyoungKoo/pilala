import { combineReducers } from "redux";
import classReducer from "./ClassModule";
import memberReducer from "./MemberModule";
import teacherReducer from "./TeacherModule";


const rootReducer = combineReducers({
    classReducer,
    memberReducer,
    teacherReducer
  
});

export default rootReducer;