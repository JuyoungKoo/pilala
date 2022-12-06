import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_CLASS = 'class/GET_CLASS';
export const GET_CLASSES = 'class/GET_CLASSES';
export const POST_CLASS = 'class/POST_CLASS';
export const PUT_CLASS = 'class/PUT_CLASS';

const actions = createActions({
    [GET_CLASS]: () => {},
    [GET_CLASSES]: () => {},
    [POST_CLASS]: () => {},
    [PUT_CLASS]: () => {},
});

/* 리듀서 */
const classReducer = handleActions(
    {
        [GET_CLASS] : (state, { payload }) => {
            return payload;
        },
        [GET_CLASSES] : (state, { payload }) => {
            return payload;
        },
        [POST_CLASS] : (state, { payload }) => {
            return payload;
        },
        [PUT_CLASS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default classReducer;