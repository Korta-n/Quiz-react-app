import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'
const ActiveQuiz = (props) => (
    <div className={classes.ActiveQuiz + ' ' + props.className}>
        <p
            className={classes.GuidanceAnswerList}
            style={{
                margin: 0,
                fontSize: 14,

                fontFamily: '"Poppins" , sans-serif',
            }}
        >
            Question:
        </p>
        <p
            className={classes.CurrentQuestionTitle}
            style={{
                borderWidth: '0px 0px 1px 0px',
                borderStyle: 'solid',
                boxSizing: 'border-box',
                paddingBottom: 5,
                margin: 0,
            }}
        >
            <span>
                <span className={classes.CurrentQuizNumber}>
                    {props.CurrentQuizNumber}
                </span>
                <span className={classes.CurrentQuestion}>
                    .{' ' + props.Question}
                </span>
            </span>

            <span className={classes.QuestionsLeft}>
                {props.CurrentQuizNumber} of {props.quizLength}
            </span>
        </p>
        <p
            className={classes.GuidanceAnswerList}
            style={{
                margin: '40px 0 0 0',
                fontSize: 14,
                fontFamily: '"Poppins" , sans-serif',
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            Choose the correct answer:{' '}
            <span style={{ fontSize: 20, paddingRight: 10 }}>&#128218;</span>
        </p>
        <AnswersList
            Answers={props.Answers}
            ClickHandler={props.ClickHandler}
            state={props.State}
        />
    </div>
)

export default ActiveQuiz
