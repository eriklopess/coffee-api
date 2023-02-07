import styled, { createGlobalStyle } from 'styled-components';
;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Opens Sans', sans-serif;
    }

    #root {
        margin: 0 auto;
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: px solid #fff;
    border-radius: 5px;
    background-color: transparent;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    &:focus {
        outline: none;
    }
`;