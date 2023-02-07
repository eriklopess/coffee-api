import styled from 'styled-components';

export const HeaderStyle = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;
    height: 60px;
    width: 100%;
    background-color: #3B2518;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: all 0.3s ease-in-out;
`

export const IconsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    a {
        color: #fff;
        text-decoration: none;
        font-size: 20px;
    }
`

export const Logo = styled.img`
    justify-self: center;
    align-self: center;
    height: 100%;
`
export const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 10px;
    height: 100%;
    input {
        padding: 10px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px 0px 0px 5px;
        border-right: none;
        height: 100%;  
        font-size: 15px;
        font-weight: normal
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        height: 100%;
        border: none;
        font-size: 18px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-left: none;
        border-radius: 0px 5px 5px 0px;
        background-color: #3B2518;
        color: #fff;
        cursor: pointer;
    }
` 
