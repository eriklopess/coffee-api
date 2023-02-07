import styled from "styled-components";
import { Container } from "../../global";

export const HomeContainer = styled(Container)`
    flex-flow: row wrap;
    width: 100%;
    padding-top: 100px;
    h1 {
        flex-basis: 100%;
        text-align: center;
    }
`


export const ProductsContainer = styled(Container)`
    flex-flow: row wrap;
    width: 80%;
    min-height: 100vh;
    justify-content: space-evenly;
    align-items: flex-end;
`
