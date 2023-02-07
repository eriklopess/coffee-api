import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/User';
import { setUser } from '../../redux/User.store';
import doRegister from '../../services/api/doRegister';
import { Form, LoginButton, LoginInput } from '../Login/style';
import { LoginContainer, RegisterLink } from './../Login/style';

function Register() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const verifyForm = () => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (name.length > 0 && email.length > 0 && password.length > 0 && emailRegex.test(email) && password.length >= 6) {
            setIsDisabled(false);
        }
    }
    const dispatch = useDispatch()
    React.useEffect(() => {
        verifyForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, email, password]);
    const handleSubmit = () => {
        doRegister({
            name,
            email,
            password,
        }).then((response: User | { error: string }) => {
            if ('error' in response) {
                alert(response.error);
                return;
            }
            dispatch(setUser(response as User))
        });
    }
  return (
    <LoginContainer>
        <Form>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                    marginBottom: '3rem',
                }}
            >Register</h1>
            <LoginInput type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            placeholder="Name" />
            <LoginInput type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" />
            <LoginInput type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" />
            <LoginButton
                disabled={isDisabled}
                onClick={handleSubmit}
                type="button"
            >Registrar</LoginButton>
            <RegisterLink>
                Do you have an account?
                <Link to="/login">Login</Link>
            </RegisterLink>
        </Form>
    </LoginContainer>
  )
}

export default Register;