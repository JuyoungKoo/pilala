import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERS = 'member/GET_MEMBERS';
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const PUT_MEMBER = 'member/PUT_MEMBER';

const actions = createActions({
    [GET_MEMBERS]: () => {},
    [GET_MEMBER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [PUT_MEMBER]: () => {},
});

/* 리듀서 */
const memberReducer = handleActions(
    {
        [GET_MEMBERS] : (state, { payload }) => {
            return payload;
        },
        [GET_MEMBER] : (state, { payload }) => {
            return payload;
        },
        [POST_LOGIN] : (state, { payload }) => {
            return payload;
        },
        [POST_REGISTER] : (state, { payload }) => {
            return payload;
        },
        [PUT_MEMBER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default memberReducer;