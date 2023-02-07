import styled from "styled-components";

export const Card = styled.div`
    width: 20%;
    height: auto;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid #000;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    }

`
export const CardBody = styled.div`
        padding: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
`

export const CardText = styled.div`
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
`

export const CardBottom = styled.div`
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column wrap;
        justify-content: center;
        align-items: center;
`

export const CardButton = styled.button`
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
        }
`

export const CardPrice = styled.span`
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    margin: 10px 0;
    align-self: flex-start;
`

export const CardTitle = styled.h2`
    font-size: 1rem;
`

export const CardDescription = styled.p`
    font-size: 0.8rem;
    text-align: justify;
`

export const CardImage = styled.img`
    width: 80%;
`

export const CardStars = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 5px;
    svg {
        width: 16px;
        height: 16px;
        margin: 0 2px;
        fill: #EA8D2A;
        stroke: #000;
        stroke-width: 0.5px;
    }
    span {
        font-size: 0.8rem;
        font-weight: 600;
    }
`

