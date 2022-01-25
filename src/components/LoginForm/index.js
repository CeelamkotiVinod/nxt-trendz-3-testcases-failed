// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMessage: ''}

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  showErrorMsg = errMsg => {
    this.setState({errorMessage: `*${errMsg}`})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.showErrorMsg(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  usernamePasswordField = () => {
    const {username, password} = this.state

    return (
      <>
        <div>
          <label htmlFor="username" className="label-element">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-element"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div>
          <label htmlFor="password" className="label-element">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-element"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  render() {
    const {errorMessage} = this.state
    return (
      <div className="app-container">
        <img
          className="website-logo-sm"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        <img
          className="login-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />

        <form className="form-container" onSubmit={this.submitForm}>
          <img
            className="website-logo-lg"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          {this.usernamePasswordField()}
          <div className="login-button-container">
            <button type="submit" className="button">
              Login
            </button>
            <p className="error-message">{errorMessage}</p>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
