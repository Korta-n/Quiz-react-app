import { CREATE_QUIZ_ITEM, RESET_QUIZ_CREATION } from './actionsTypes'
import axios from '../../axios/axios-quiz'
export const createQuizItem = (item) => {
    return {
        type: CREATE_QUIZ_ITEM,
        item,
    }
}
export const RefreshQuizCreation = () => {
    return {
        type: RESET_QUIZ_CREATION,
    }
}
export const finishCreateQuiz = () => {
    return async (dispatch, getState) => {
        try {
            await axios.post('quizes.json', getState().Create.quiz)
            dispatch(RefreshQuizCreation())
        } catch (e) {
            console.error(e)
        }
    }
}
