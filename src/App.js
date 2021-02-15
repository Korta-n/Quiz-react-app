import React from 'react'
import Layout from './hoc/Layout/Layout'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import { connect } from 'react-redux'
import LogOut from './components/LogOut/LogOut'
import { autoLogIn } from './store/actions/auth'
class App extends React.Component {
    componentDidMount = () => {
        this.props.autoLogIn()
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" exact component={Auth} />
                <Route path="/quiz/:id" exact component={Quiz} />
                <Route path="/" exact component={QuizList} />
                <Redirect to="/" />
            </Switch>
        )
        if (this.props.isAuthenticated)
            routes = (
                <Switch>
                    <Route path="/create-quiz" exact component={QuizCreator} />
                    <Route path="/quiz/:id" exact component={Quiz} />
                    <Route path="/" exact component={QuizList} />
                    <Route path="/logout" component={LogOut} />
                    <Redirect to="/" />
                </Switch>
            )
        return <Layout>{routes}</Layout>
    }
}
const MapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        autoLogIn: () => dispatch(autoLogIn()),
    }
}
export default withRouter(connect(MapStateToProps, MapDispatchToProps)(App))
