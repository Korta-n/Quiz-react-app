import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/button'
import { createControl, validate, validateForm } from '../../Form/FormFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {
    finishCreateQuiz,
    createQuizItem,
    RefreshQuizCreation,
} from '../../store/actions/QuizCreator'
const createForm = (label, errMessage, req, id, Maxlength) => {
    return createControl(
        {
            label: label ? label : '',
            errorMessage: errMessage ? errMessage : '',
            id: id ? id : null,
        },
        { Maxlength: Maxlength ? Maxlength : null, required: req ? req : null }
    )
}
const createFormControls = () => {
    return {
        question: createForm(
            'Question',
            "Question can't be empty",
            true,
            null,
            35
        ),
        option1: createForm('1.', "Answer can't be empty", true, 1, 35),
        option2: createForm('2.', "Answer can't be empty", true, 2, 35),
        option3: createForm('3.', "Answer can't be empty", true, 3, 35),
        option4: createForm('4.', "Answer can't be empty", true, 4, 35),
    }
}
class QuizCreator extends Component {
    state = {
        // Themes: [
        //     {
        //         id: 0,
        //         value: 'rgb(145, 145, 145)',
        //     },
        //     {
        //         id: 1,
        //         value: '#ddbea9',
        //     },
        //     {
        //         id: 2,
        //         value: '#3d405b',
        //     },
        //     {
        //         id: 3,
        //         value: 'linear-gradient(90deg,#434343 0% , #000000 100%)',
        //     },
        //     {
        //         id: 4,
        //         value: 'linear-gradient(90deg ,#eb3349 0% , #f45c43 100%)',
        //     },
        //     {
        //         id: 5,
        //         value: 'linear-gradient(90deg , #de6262 0%,  #ffb88c 100%)',
        //     },
        //     {
        //         id: 6,
        //         value: 'linear-gradient(90deg , #06beb6 0% , #48b1bf 100%)',
        //     },
        //     {
        //         id: 7,
        //         value: 'linear-gradient(90deg , #ffafbd 0% , #ffc3a0 100%)',
        //     },
        // ],
        Themes: [],
        CurrentQuestion: 0,
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        CurrentTheme: {
            id: 0,
            value: 'rgb(167, 167, 167)',
        },
        Title: {
            value: '',
            complited: false,
        },
        loadingThemes: true,
        TitleInputInvalid: true,
        ShowComplite: false,
    }
    componentDidMount = async () => {
        try {
            const response = await axios.get('themes.json')
            const ThemesData = response.data
            let Themes = this.state.Themes
            for (let k in response.data) {
                Themes = ThemesData[k]
                this.setState({
                    Themes,
                    loadingThemes: false,
                })
            }
        } catch (e) {
            console.error(e)
        }
    }
    FinishTitleAndThemeChoose = async () => {
        const Title = this.state.Title
        Title.complited = true

        this.setState({ Title })
    }
    AddQuestionHandler = (e) => {
        const {
            question,
            option1,
            option2,
            option3,
            option4,
        } = this.state.formControls
        const CurrentTheme = this.state.CurrentTheme.value
        const title =
            this.currentQuestion > 0 ? null : { title: this.state.Title.value }
        const questionItem = {
            CurrentTheme: CurrentTheme,
            ...title,
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ],
        }
        this.props.createQuizItem(questionItem)
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        })
    }
    FinishCreateQuiz = (e) => {
        e.preventDefault()
        this.props.finishCreateQuiz()
        const Title = this.state.Title
        Title.complited = false
        Title.value = ''
        this.setState({
            CurrentQuestion: 0,
            Title,
            TitleInputInvalid: true,
            ShowComplite: true,
        })
        setTimeout(() => {
            this.setState({ ShowComplite: false })
        }, 1000)
    }
    RestartTitleChoose = () => {
        this.props.RefreshQuizCreation()
        const Title = this.state.Title
        Title.complited = false
        this.setState({ quiz: [], CurrentQuestion: 0, Title })
    }
    renderInputs = () => {
        return Object.keys(this.state.formControls).map((option, index) => {
            const controlParam = this.state.formControls[option]
            const QuestionStyles =
                option === 'question'
                    ? {
                          height: 40,
                          fontSize: 20,
                      }
                    : null
            // const reversed = this.state.CurrentTheme.value

            const hr =
                index === 0 ? (
                    <React.Fragment>
                        <div className={classes.AnswersWrapper}>
                            <div
                                style={{
                                    background: this.state.CurrentTheme.value,
                                }}
                            ></div>
                            <p>Answers</p>
                            <div
                                style={{
                                    background: this.state.CurrentTheme.value.replace(
                                        '90',
                                        '270'
                                    ),
                                }}
                            ></div>
                        </div>
                    </React.Fragment>
                ) : null

            const TitledQuestion = (
                <div>
                    <Input
                        option={option}
                        styles={{ ...QuestionStyles, marginBottom: 20 }}
                        label={controlParam.label}
                        value={controlParam.value}
                        index={index + Math.random()}
                        placeholder={
                            option !== 'question'
                                ? 'Enter answer'
                                : 'Enter your question'
                        }
                        valid={controlParam.valid}
                        shouldValidate={!!controlParam.validation}
                        touched={controlParam.touched}
                        onChange={(e) =>
                            this.changeHandler(e.target.value, option)
                        }
                        errorMesssage={controlParam.errorMessage}
                    />
                </div>
            )

            return (
                <div key={index + 123}>
                    {TitledQuestion}
                    {hr}
                </div>
            )
        })
    }
    changeHandler = (value, option) => {
        const formControls = { ...this.state.formControls }
        const CurrControl = { ...formControls[option] }
        CurrControl.value = value
        CurrControl.touched = true
        CurrControl.valid = validate(CurrControl.value, CurrControl.validation)
        formControls[option] = CurrControl
        this.setState({ formControls, isFormValid: validateForm(formControls) })
    }

    selectHandler = (e) => {
        this.setState({ rightAnswerId: +e.target.value })
    }
    RenderTitleInput = () => {
        const Ck = this.state.Title
        const Col = this.state.TitleInputInvalid ? '#000' : 'red'
        return (
            <Input
                option={Ck.option}
                styles={{
                    borderWidth: '2px 0px 2px 2px ',
                    borderStyle: 'solid',
                    borderColor: Col,
                    height: 60,
                    fontSize: 30,
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: 5,
                }}
                label={''}
                value={Ck.value}
                index={Math.random()}
                placeholder={'Enter title'}
                touched={Ck.touched}
                onChange={(e) => this.TitleChangeHandler(e)}
            />
        )
    }
    CheckChangeHandler = (e) => {
        const CurrentTheme = this.state.Themes[e.target.value]
        this.setState({ CurrentTheme })
    }
    TitleChangeHandler = (e) => {
        const Val = e.target.value
        const Title = this.state.Title
        if (Val.length < 18 && Val.trim() !== '') {
            Title.value = Val
            this.setState({ TitleInputInvalid: true })
        } else {
            this.setState({ TitleInputInvalid: false })
        }
        this.setState({ Title })
    }
    renderThemeChecker = () => {
        const Themes = this.state.Themes
        return Themes.map((e, i) => {
            const CurrId = Themes[i].id
            return (
                <div
                    key={{ i } + Math.random()}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: Math.floor(100 / Themes.length) - 5 + '%',
                    }}
                >
                    <input
                        style={{
                            transform: 'translateY(-40%)',
                            marginRight: 3,
                            display: 'none',
                        }}
                        id={'radio' + i}
                        checked={this.state.CurrentTheme.id === e.id}
                        type="radio"
                        name={'themeChooser'}
                        value={i}
                        onChange={(e) => this.CheckChangeHandler(e)}
                    ></input>
                    <label htmlFor={'radio' + i}>
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                boxShadow:
                                    CurrId === this.state.CurrentTheme.id
                                        ? '0 0 10px 0 #000'
                                        : 'none',
                                display: 'inline-block',
                                id: Themes[i].id,
                                border: '2px solid #000',
                                background: Themes[i].value,
                            }}
                        ></div>
                    </label>
                </div>
            )
        })
    }
    // RENDER RENDER RENDER RENDER RENDER RENDERRENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDERRENDER RENDER RENDERRENDER RENDER RENDER
    render() {
        const ShowComplite = this.state.ShowComplite ? '0' : '-100%'
        const Col = this.state.TitleInputInvalid ? '#000' : 'red'
        const select = (
            <Select
                label={'Choose the correct answer'}
                options={[
                    { value: 1, text: 1 },
                    { value: 2, text: 2 },
                    { value: 3, text: 3 },
                    { value: 4, text: 4 },
                ]}
                onChange={this.selectHandler}
            />
        )
        const QuizTitle =
            this.state.Title.value !== '' ? (
                <p style={{ fontFamily: "'Poppins' , sans-serif" }}>
                    {this.state.Title.value}
                </p>
            ) : (
                'Creating quiz'
            )
        // -------------------------------------------------- Choosing title Block -----------------------------------------
        const ChooseTitle = !this.state.Title.complited ? (
            <div className={classes.Of}>
                <h1>Customize your quiz</h1>
                <form
                    className={classes.TitleForm}
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >
                    <div className={classes.TitleInputDiv}>
                        {this.RenderTitleInput()}
                        <div
                            className={classes.ButtonWrapper}
                            style={{
                                borderWidth: '2px 2px 2px 0px',
                                borderStyle: 'solid',
                                borderColor: Col,
                            }}
                        >
                            <Button
                                text={'NEXT'}
                                onClick={this.FinishTitleAndThemeChoose}
                                cls={'Next_button_hover'}
                                styles={{
                                    fontFamily: "'Poppins' , sans-serif",
                                    height: 64,
                                    width: 102,
                                    borderRadius: 0,
                                    fontSize: 24,
                                    display: 'block',
                                    transition: '0.3s',
                                    transform: 'translate(-5px,-4px)',
                                    color: '#000',
                                    border: 'none',
                                    background: this.state.CurrentTheme.value,
                                    padding: '7px 11px 7px 5px',
                                }}
                                disabled={this.state.Title.value === ''}
                            ></Button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div className={classes.UIline}></div>
                    </div>
                    <p
                        style={{
                            textAlign: 'left',
                            fontSize: 20,
                            fontWeight: 500,
                            fontFamily: "'Poppins' , sans-serif",
                            margin: '10px 0 5px 0 ',
                        }}
                    >
                        Choose color theme:
                    </p>
                    <div className={classes.ThemeChoosers}>
                        {this.state.loadingThemes ? (
                            <Loader />
                        ) : (
                            this.renderThemeChecker()
                        )}
                    </div>
                </form>
            </div>
        ) : (
            <div style={{ transform: 'translate(0,-3%)' }}>
                <div className={classes.Of}>
                    <h1>
                        {QuizTitle}
                        <span>
                            {this.state.CurrentQuestion + ' '}
                            of{' '}
                            {this.props.quiz.length === 0
                                ? this.props.quiz.length
                                : this.props.quiz.length}
                        </span>
                    </h1>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    {this.renderInputs()}

                    <div className={classes.Buttons}>
                        <Button
                            cls={'Quiz_Create_Button'}
                            text={'Add question'}
                            onClick={this.AddQuestionHandler}
                            styles={{
                                color: '#fff',
                                borderRadius: 10,
                                border: 'none',
                                background: this.state.CurrentTheme.value,
                                padding: '5px 10px',
                            }}
                            disabled={!this.state.isFormValid}
                        ></Button>
                        {select}
                        <Button
                            cls={'Quiz_Create_Button'}
                            text={'Create quiz'}
                            onClick={this.FinishCreateQuiz}
                            styles={{
                                color: '#fff',
                                borderRadius: 10,
                                border: 'none',
                                background: this.state.CurrentTheme.value,
                                padding: '5px 10px',
                            }}
                            disabled={this.props.quiz.length === 0}
                        ></Button>
                    </div>
                    <div className={classes.ChooseTitleAgainBtn}>
                        <Button
                            cls={'Restart_Title_Choose'}
                            onClick={this.RestartTitleChoose}
                            text={'Choose title again'}
                            styles={{
                                marginTop: 5,
                                color: '#ccc',
                                borderWidth: '0 0 2px 0',
                                borderStyle: 'solid',
                                borderColor: '#ccc',
                                fontSize: 18,
                                borderRadius: 0,
                            }}
                            disabled={false}
                        ></Button>
                    </div>
                </form>
            </div>
        )

        return (
            <div
                className={classes.QuizCreator}
                style={{
                    background: this.state.CurrentTheme.value,
                    transition: '0.2s',
                }}
            >
                <div
                    className={classes.alertQuizCreatorEnd}
                    style={{
                        transform: 'translate(-50% ,' + ShowComplite + ')',
                    }}
                >
                    <p>Creating complited</p>
                </div>
                {ChooseTitle}
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        quiz: state.Create.quiz,
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        createQuizItem: (item) => dispatch(createQuizItem(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
        RefreshQuizCreation: () => dispatch(RefreshQuizCreation()),
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(QuizCreator)
