import { useState } from "react"
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()

    handleLogin({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={login}>
        <div className="basicText">
          username:
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
            className="inputBox"
          />
        </div>
        <div className="basicText">
          password:
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
            className="inputBox"
          />
        </div>
        <button type="submit" className="loginButton">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func
}

export default LoginForm