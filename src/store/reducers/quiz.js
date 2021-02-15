import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    DELETE_QUIZ_RERENDER,
    DELETE_QUIZ_SUCCESS_ALERT,
    FETCH_CURRENT_QUIZ_SUCCESS,
    CLICK_CONTROL,
    CURRENT_QUIZ_SET_STATE,
    CURRENT_QUIZ_EVENT,
    NEXT_QUESTION_HANDLER,
    REFRESH_QUIZ_STATES,
} from '../actions/actionsTypes'
const initialState = {
    // ------------- ANSWER QUIZ ----------------------------------
    loadingQuiz: true,
    results: {},
    ClickControl: false,
    ItemState: {},
    CurrentEvent: 'quiz',
    CurrentScore: 0,
    ActiveQuestion: 0,
    CurrentQuiz: null,
    // --------- QUIZ LIST ----------------------------------------
    quizes: [],
    loading: false,
    Deleted: false,
    error: null,
}
const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        // --------------------------------------- QUIZ LIST -----------------------------------------------
        case FETCH_QUIZES_START:
            return {
                ...state,
                loadingQuiz: true,
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false,
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case DELETE_QUIZ_RERENDER:
            return {
                ...state,
                quizes: action.NewQuizes,
            }
        case DELETE_QUIZ_SUCCESS_ALERT:
            return {
                ...state,
                Deleted: !state.Deleted,
            }
        // --------------------------------------- QUIZ ANSWER BLOCK -----------------------------------------------
        case FETCH_CURRENT_QUIZ_SUCCESS:
            return {
                ...state,
                loadingQuiz: false,
                CurrentQuiz: action.CurrentQuiz,
            }
        case CLICK_CONTROL:
            return {
                ...state,
                ClickControl: !state.ClickControl,
            }
        case CURRENT_QUIZ_SET_STATE:
            return {
                ...state,
                CurrentScore: state.CurrentScore + action.ScoreADD,
                results: action.results,
                ItemState: action.ItemState,
            }
        case NEXT_QUESTION_HANDLER:
            return {
                ...state,
                ItemState: {},
                ActiveQuestion: state.ActiveQuestion + 1,
            }
        case CURRENT_QUIZ_EVENT:
            return {
                ...state,
                CurrentEvent: action.event,
            }
        case REFRESH_QUIZ_STATES:
            return {
                ...state,
                results: {},
                ClickControl: false,
                ItemState: {},
                CurrentScore: 0,
                ActiveQuestion: 0,
                CurrentQuiz: action.Restart ? state.CurrentQuiz : null,
            }
        // --------------------------------------- DEFAULT ---------------------------------------------------------
        default:
            return state
    }
}
export default quizReducer
