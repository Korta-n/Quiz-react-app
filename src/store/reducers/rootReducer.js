import { combineReducers } from 'redux'
import quizReducer from './quiz'
import { QuizCreatorReducer } from './QuizCreator'
import { authReducer } from './auth'
export default combineReducers({
    quiz: quizReducer,
    Create: QuizCreatorReducer,
    auth: authReducer,
})
