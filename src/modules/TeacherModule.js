import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_TEACHERS = 'teacher/GET_TEACHERS';
export const POST_TEACHER = 'teacher/POST_TEACHER';
export const DELETE_TEACHER = 'teacher/DELETE_TEACHER';

const actions = createActions({
    [GET_TEACHERS]: () => {},
    [POST_TEACHER]: () => {},
    [DELETE_TEACHER]: () => {}
});

/* 리듀서 */
const teacherReducer = handleActions(
    {
        [GET_TEACHERS] : (state, { payload }) => {
            return payload;
        },
        [POST_TEACHER] : (state, { payload }) => {
            return payload;
        },
        [DELETE_TEACHER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default teacherReducer;