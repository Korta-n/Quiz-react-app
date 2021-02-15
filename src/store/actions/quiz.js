import axios from '../../axios/axios-quiz'
import { delay } from '../../modules/delay'
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
} from './actionsTypes'
// ---------------------------------------- QUIZ LIST -------------------------------------------------------------
export const fetchQuizes = () => {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            const data = response.data
            const length = response.data
            Object.keys(data).forEach((key, i) => {
                quizes.push({
                    Theme: data[key][0].CurrentTheme,
                    id: key,
                    name: data[key][0].title,
                    length: length[key].length,
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START,
    }
}
export const fetchQuizesSuccess = (quizes) => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    }
}
export const fetchQuizesError = (e) => {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e,
    }
}
// ----------------------------------------------DELETE QUIZ LIST HANDLER ------------------------------------------------
export const DeleteQuiz = (id) => {
    return async (dispatch) => {
        try {
            const QuizeResponse = await axios.get('quizes.json')
            let quizes = []
            const data = QuizeResponse.data
            const length = QuizeResponse.data
            Object.keys(data).forEach((key, i) => {
                quizes.push({
                    Theme: data[key][0].CurrentTheme,
                    id: key,
                    name: data[key][0].title,
                    length: length[key].length,
                })
            })
            await axios.delete('quizes/' + id + '.json')
            quizes = quizes.filter((quiz) => quiz.id !== id)
            dispatch(DeleteQuizSuccessReRender(id, quizes))
            dispatch(DeleteQuizSuccessAlert())
            setTimeout(() => {
                dispatch(DeleteQuizSuccessAlert())
            }, 1000)
        } catch (e) {
            console.error(e)
        }
    }
}
export const DeleteQuizSuccessReRender = (id, Newquizes) => {
    return {
        type: DELETE_QUIZ_RERENDER,
        id: id,
        NewQuizes: Newquizes,
    }
}
export const DeleteQuizSuccessAlert = () => {
    return {
        type: DELETE_QUIZ_SUCCESS_ALERT,
    }
}
// ------------------------------------------------ QUIZ ANSWER BLOCK -------------------------------------------
export const fetchQuizById = (quizId) => {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const CurrentQuiz = response.data
            dispatch(RefreshQuizStates())
            dispatch(QuizEventHandler('quiz'))
            dispatch(fetchCurrentQuizSuccess(CurrentQuiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export const fetchCurrentQuizSuccess = (CurrentQuiz) => {
    return {
        type: FETCH_CURRENT_QUIZ_SUCCESS,
        CurrentQuiz,
    }
}
export const onAnswerClickHandler = (answerId) => {
    return async (dispatch, getState) => {
        const state = getState().quiz
        if (!state.ClickControl) {
            dispatch(clickControl())
            const question = state.CurrentQuiz[state.ActiveQuestion]
            const results = state.results
            const ItemState = state.ItemState
            if (answerId === question.rightAnswerId) {
                ItemState[answerId] = 'success'
                results[question.id] = 'success'
                dispatch(QuizSetState(results, ItemState, 1))
            } else {
                ItemState[answerId] = 'error'
                results[question.id] = 'error'
                dispatch(QuizSetState(results, ItemState))
            }
            if (state.ActiveQuestion + 1 < state.CurrentQuiz.length) {
                await delay(500)
                dispatch(clickControl())
                dispatch(NextQuestionHandler())
                // this.setState({
                //     ActiveQuestion: state.ActiveQuestion + 1,
                //     ItemState: {},
                // })
            } else {
                await delay(500)
                dispatch(QuizEventHandler('score'))
                dispatch(clickControl())
                // this.setState({ CurrentEvent: 'score', ClickControl: false })
            }
        }
    }
}
export const clickControl = () => {
    return {
        type: CLICK_CONTROL,
    }
}
export const QuizSetState = (results, ItemState, ScoreADD = 0) => {
    return {
        type: CURRENT_QUIZ_SET_STATE,
        results,
        ItemState,
        ScoreADD,
    }
}
export const NextQuestionHandler = () => {
    return {
        type: NEXT_QUESTION_HANDLER,
    }
}
export const QuizEventHandler = (e) => {
    return {
        type: CURRENT_QUIZ_EVENT,
        event: e,
    }
}
export const RefreshQuizStates = (Restart = false) => {
    return {
        type: REFRESH_QUIZ_STATES,
        Restart: Restart,
    }
}
// -------------------------------------------------- RESTART CURRENT QUIZ ---------------------------------------------
export const RestartQuiz = () => {
    return (dispatch) => {
        dispatch(QuizEventHandler('quiz'))
        dispatch(RefreshQuizStates(true))
    }
}
export const GoToQuizList = () => {
    return (dispatch) => {
        dispatch(QuizEventHandler('quiz'))
        dispatch(RefreshQuizStates())
    }
}
