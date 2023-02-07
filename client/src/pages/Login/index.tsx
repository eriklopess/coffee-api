import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import doLogin from '../../services/api/doLogin';
import { useDispatch } from 'react-redux';
import { Form, LoginInput, LoginContainer, LoginButton, RegisterLink } from './style';
import { setUser } from '../../redux/User.store';

const Login: React.FC = () => {
    const [email, setEmail] = React.useState('t@t.com');
    const [password, setPassword] = React.useState('133c333b-af99-464d-b35e-6194d5784fc1');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requestLogin = () => {
        setLoading(true);
        doLogin(email, password).then((response) => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/');
                dispatch(setUser(response))
            } else {
                setError(response.error);
            }
            console.log(response)
        })
        setLoading(false);
        setEmail('');
        setPassword('');
    }
  return (
    <LoginContainer>
        {
            loading ?
            <p>Loading...</p>
        :
        <Form>
            <h1>COFFEE API</h1>
            <img src={require("../../assets/images/Logo.png")} alt="logo" />

            <label htmlFor="email">
                <LoginInput type="email"
                placeholder='Email'
                value={email}
                onChange={
                    (e) => setEmail(e.target.value)
                } name="email" id="email" />
            </label>
            <label htmlFor="password">
                <LoginInput type="password"
                value={password}
                placeholder='Password'
                onChange={
                    (e) => setPassword(e.target.value)
                } name="password" id="password" />
            </label>
            <LoginButton onClick={requestLogin} type="button">Login</LoginButton>
                <span>
                    {error}
                </span>
                <RegisterLink>
                    <span>
                        Don't have an account?
                    </span>
                    <Link to="/register">Register</Link>
                </RegisterLink>
        </Form>
        }
    </LoginContainer>
  )
}

export default Login;
