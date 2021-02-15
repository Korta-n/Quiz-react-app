import React, { Component } from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import Score from '../../components/Score/Score'
import Loader from '../../components/UI/Loader/Loader'
import classes from './Quiz.module.css'
import { connect } from 'react-redux'
import {
    fetchQuizById,
    onAnswerClickHandler,
    RestartQuiz,
    GoToQuizList,
} from '../../store/actions/quiz'
class Quiz extends Component {
    onAnswerClickHandler = (e, answerId) => {
        this.props.onAnswerClickHandler(answerId)
    }
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    restartQuiz = () => {
        this.props.RestartQuiz()
    }
    goToQuizList = () => {
        this.props.history.push({
            pathname: '/',
        })
        this.props.GoToQuizList()
    }
    render() {
        const CurrentQuiz = this.props.CurrentQuiz
            ? this.props.CurrentQuiz
            : null
        return (
            <div
                className={classes.Quiz_block}
                style={{
                    background: CurrentQuiz
                        ? CurrentQuiz[0].CurrentTheme
                        : 'inherit',
                }}
            >
                <div className={classes.CurrentQuiz}>
                    <h1 className={classes.Quiz}>
                        <p
                            className={classes.GuidanceTitle}
                            style={{
                                margin: 0,
                                fontSize: 14,
                                fontFamily: '"Poppins" , sans-serif',
                            }}
                        >
                            Main title:
                        </p>
                        {CurrentQuiz ? CurrentQuiz[0].title : null}
                    </h1>
                    {this.props.loadingQuiz && !this.props.CurrentQuiz ? (
                        <Loader />
                    ) : this.props.CurrentEvent === 'quiz' ? (
                        <ActiveQuiz
                            ClickHandler={this.onAnswerClickHandler}
                            className={classes.QuizWrapper}
                            Answers={
                                this.props.CurrentQuiz[
                                    this.props.ActiveQuestion
                                ].answers
                            }
                            Question={
                                this.props.CurrentQuiz[
                                    this.props.ActiveQuestion
                                ].question
                            }
                            State={this.props.ItemState}
                            quizLength={this.props.CurrentQuiz.length}
                            CurrentQuizNumber={this.props.ActiveQuestion + 1}
                        />
                    ) : (
                        <Score
                            restartQuiz={this.restartQuiz}
                            results={this.props.results}
                            questions={this.props.CurrentQuiz}
                            Score={this.props.CurrentScore}
                            AvailableScore={this.props.CurrentQuiz.length}
                            QuizList={this.goToQuizList}
                        />
                    )}
                </div>
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    const quiz = state.quiz
    return {
        loadingQuiz: quiz.loadingQuiz,
        results: quiz.results,
        ClickControl: quiz.ClickControl,
        ItemState: quiz.ItemState,
        CurrentEvent: quiz.CurrentEvent,
        CurrentScore: quiz.CurrentScore,
        ActiveQuestion: quiz.ActiveQuestion,
        CurrentQuiz: quiz.CurrentQuiz,
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        onAnswerClickHandler: (answerId) =>
            dispatch(onAnswerClickHandler(answerId)),
        RestartQuiz: () => dispatch(RestartQuiz()),
        GoToQuizList: () => dispatch(GoToQuizList()),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Quiz)
