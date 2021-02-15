import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes, DeleteQuiz } from '../../store/actions/quiz'
class QuizList extends Component {
    DeleteHandler = (id) => {
        this.props.DeleteQuiz(id)
    }
    renderQuizes() {
        return this.props.quizes.map((e, i) => {
            const Theme = e.Theme
            const BlackTheme =
                e.Theme === 'linear-gradient(90deg,#434343 0% , #000000 100%)'
                    ? '#f0efeb'
                    : '#000'
            return (
                <div key={e.id + 'index' + i} className={classes.QuizItem}>
                    <div className={classes.QuizBlock}>
                        <div
                            className={classes.ColorTheme}
                            style={{ background: Theme }}
                        >
                            <div className={classes.ColorMask}>
                                <div className={classes.InfoBlock}>
                                    <p
                                        style={{
                                            color: BlackTheme,
                                            fontSize: 14,
                                            fontWeight: 900,
                                            fontFamily: "'Poppins', sans-serif",
                                            marginLeft: 5,
                                        }}
                                    >
                                        #{i + 1}
                                    </p>
                                    <p
                                        className={classes.QuizTitle}
                                        style={{ color: BlackTheme }}
                                    >
                                        {e.name}
                                    </p>
                                </div>

                                <p
                                    className={classes.QuizBlockLength}
                                    style={{
                                        color: BlackTheme,
                                        fontWeight: 700,
                                    }}
                                >
                                    of {e.length}
                                </p>
                            </div>
                        </div>
                        <div className={classes.ButtonsBlock}>
                            <div className={classes.StartHover}>
                                <NavLink to={'/quiz/' + e.id}>
                                    <button className={classes.StartButton}>
                                        Start
                                    </button>
                                </NavLink>
                                <p>{'<- Start quiz'}</p>
                            </div>
                            <div className={classes.DelHover}>
                                <NavLink to={'/'}>
                                    <button
                                        className={classes.DelButton}
                                        onClick={() => this.DeleteHandler(e.id)}
                                    >
                                        Delete
                                    </button>
                                </NavLink>
                                <p key={i + ' ' + i}>{'Delete quiz ->'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    componentDidMount() {
        fetchQuizes()
    }
    render() {
        const ShowDelete = this.props.Deleted ? '0%' : '100%'
        const BlockAllQuizes =
            this.props.quizes.length || 0 ? (
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <p
                        className={classes.Bruh}
                        style={{
                            marginLeft: 30,
                            fontSize: 30,
                            fontWeight: 500,
                            fontFamily: '"Poppins", sans-serif }}',
                        }}
                    >
                        {' '}
                        All quizes :
                    </p>
                </div>
            ) : null
        const Guidance = this.props.IsLogged ? (
            <p>
                You can create quiz in{' '}
                <NavLink to={'/create-quiz'} exact>
                    Create-Quiz
                </NavLink>{' '}
                page
            </p>
        ) : (
            <p>Only logged users allowed create quizes</p>
        )
        const MakeNewOne = this.props.IsLogged ? (
            <div>
                <p
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        color: 'rgba(160, 160, 160 , 0.7 )',
                    }}
                >
                    {' '}
                    You don't have any quizes{' :('} <br />
                    Click{' '}
                    <NavLink
                        to={'/create-quiz'}
                        style={{
                            color: 'rgb(160, 160, 160,0.7 )',
                        }}
                    >
                        here
                    </NavLink>{' '}
                    to create one
                </p>
            </div>
        ) : (
            <div>
                <p
                    style={{
                        fontSize: 28,
                        letterSpacing: '1px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        color: 'rgba(160, 160, 160 , 0.7 )',
                    }}
                >
                    <NavLink
                        to={'/auth'}
                        style={{
                            color: 'rgb(160, 160, 160,0.7 )',
                        }}
                    >
                        Log in
                    </NavLink>{' '}
                    or{' '}
                    <NavLink
                        to={'/auth'}
                        style={{
                            color: 'rgb(160, 160, 160,0.7 )',
                        }}
                    >
                        Create new account
                    </NavLink>{' '}
                    <br />
                    to start creating new quizes
                </p>
            </div>
        )
        return (
            <div className={classes.MainPage}>
                <div
                    className={classes.alertQuizDelete}
                    style={{ transform: 'translate(0%,' + ShowDelete + ')' }}
                >
                    <p>Deleted</p>
                </div>
                <div className={classes.TopBar}>
                    <p>Quizer</p>
                </div>
                <div className={classes.QuizChooseTitle}>
                    <p>
                        <span>Here you can</span>
                        <br />
                        Choose quiz
                    </p>
                    {Guidance}
                </div>
                <div className={classes.BorderGradient}></div>
                {BlockAllQuizes}
                <div className={classes.QuizesWrapper}>
                    <div className={classes.QuizBlocks}>
                        {this.props.loading ? (
                            <Loader />
                        ) : this.props.quizes.length > 0 ? (
                            this.renderQuizes()
                        ) : (
                            MakeNewOne
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
        Deleted: state.quiz.Deleted,
        IsLogged: state.auth.token,
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: dispatch(fetchQuizes()),
        DeleteQuiz: (id) => dispatch(DeleteQuiz(id)),
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(QuizList)
