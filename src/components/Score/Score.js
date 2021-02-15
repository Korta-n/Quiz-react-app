import React from 'react'
import classes from './Score.module.css'
import Button from '../UI/Button/button'
const Score = (props) => {
    const question = props.questions.map((elem, i) => {
        const cls = [
            'fa',
            props.results[elem.id] === 'success' ? 'fa-check' : 'fa-times',
            classes[props.results[elem.id]],
        ]
        return (
            <li key={i}>
                <p style={{ margin: 0, fontSize: 20 }}>
                    <span>{i + 1}.</span>
                    {' ' + elem.question}
                </p>
                <i
                    style={{
                        fontSize: 40,
                        transform: 'translateY(-6px)',
                        fontWeight: 900,
                    }}
                    className={cls.join(' ')}
                />
            </li>
        )
    })

    const result = Math.floor((props.Score / props.AvailableScore) * 100)
    // const ResultRender =
    //     result >= 50 ? (
    //         <span className={classes.Results}>
    //             <span className={classes.SuccessEmoji}>&#127881;</span>
    //             You'd done greate
    //             <span className={classes.SuccessEmoji}>&#127881;</span>
    //         </span>
    //     ) : (
    //         <span className={classes.Results}>
    //             <span className={classes.SadEmoji}>&#128577;</span>
    //             Better luck next time
    //             <span className={classes.SadEmoji}>&#128577;</span>
    //         </span>
    //     )
    const Res = result >= 50 ? 'rgb(107, 180, 24)' : 'rgb(241, 64, 87)'
    const ResultRender =
        result === 0 ? (
            <span className={classes.BadResults}>
                <span className={classes.Emoji}>&#128560;</span>
                Maybe next time...
                <span className={classes.Emoji}>&#128560;</span>
            </span>
        ) : result === 100 ? (
            <span className={classes.SuccessResults}>
                <span className={classes.Emoji}>&#129488;</span>
                You're genius , well done
                <span className={classes.Emoji}>&#129488;</span>
            </span>
        ) : result < 50 ? (
            <span className={classes.BadResults}>
                <span className={classes.Emoji}>&#128577;</span>
                Better luck next time
                <span className={classes.Emoji}>&#128577;</span>
            </span>
        ) : (
            <span className={classes.SuccessResults}>
                <span className={classes.Emoji}>&#127881;</span>
                You'd done great
                <span className={classes.Emoji}>&#127881;</span>
            </span>
        )
    return (
        <div className={classes.scoreBlock}>
            <p
                className={classes.GuidanceAnswerList}
                style={{
                    margin: 0,
                    fontSize: 14,
                    color: 'rgb(114, 114, 114)',
                    fontFamily: '"Poppins" , sans-serif',
                }}
            >
                Results:
            </p>
            <ul className={classes.scoreUl}>{question}</ul>
            <div className={classes.ScoreBoard}>
                <p style={{ fontWeight: 500 }}>
                    <span>
                        Your score:
                        <span style={{ color: Res }}>{` ${result}`}</span>%
                        <br />
                        {`(${props.Score} / ${props.AvailableScore} )`}
                    </span>
                </p>
                <p>
                    <span className={classes.Results}>{ResultRender}</span>
                </p>
            </div>
            <div className={classes.Buttons}>
                <Button
                    styles={{ color: '#000', border: '2px solid #000' }}
                    onClick={props.restartQuiz}
                    text={'Restart'}
                    cls={classes.ScoreButton}
                    content={'Score'}
                    load={props.load}
                ></Button>
                <Button
                    styles={{ color: '#000', border: '2px solid #000' }}
                    onClick={props.QuizList}
                    text={'Choose quiz'}
                    content={'Score'}
                    cls={classes.ScoreButton}
                    load={props.load}
                ></Button>
            </div>
        </div>
    )
}

export default Score
