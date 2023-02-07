import styled from 'styled-components';
import { Container, Input } from '../../global';

export const LoginContainer = styled(Container)`
    background-color: #3B2518;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    max-width: 400px;
    height: 550px;
    background-color: rgba(255, 255, 255, 0.01);
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: 5px solid #683E26;
    font-size: 1.2rem;
    color: #fff;
    place-items: center;
    place-content: center;
`;

export const LoginInput = styled(Input)`
    background-color: #3B2518;
    border: 2px solid #683E26;
    &:focus {
        outline: none;
    }
`;

export const LoginButton = styled.button`
    padding: 10px;
    width: 80%;
    margin: 10px 0;
    border: 2px solid #683E26;
    border-radius: 5px;
    background-color: transparent;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: #fff;
        color: #3B2518;
    }
    &:disabled {
        background-color: #fff;
        color: #3B2518;
        cursor: not-allowed;
    }
`;

export const RegisterLink = styled.div`
    text-align: left;
    width: 80%;
    font-size: 0.8rem;
    color: #fff;
    a {
        margin-left: 5px;
        font-weight: 600;
        color: #fff;
        transition: all 0.1s ease-in-out;
        &:hover {
            color: #683E26;
        }
    }

`;