import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillCartFill, BsPersonBadgeFill, } from 'react-icons/bs'
import { CiLogin } from 'react-icons/ci'
import { BiSearchAlt } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { UserInitialState } from '../../redux/User.store'
import { HeaderStyle, IconsDiv, Logo, Search } from './style'
import { Input } from '../../global'

const Header: React.FC = () => {
    const authData = useSelector<RootState>((state: any) => state.user) as UserInitialState;
    return (
        <HeaderStyle>
            <Link to="/" style={
                {
                    height: '100%',
                }
            }>
                <Logo src={require("../../assets/images/Logo.png")} alt="logo" />
            </Link>
            <Search>
                <Input />
                <button>
                    <BiSearchAlt />
                </button>
            </Search>
            <IconsDiv>
            <Link to="cart">
                <BsFillCartFill />
            </Link>
            {
                authData.isLogged ? (
                    <Link to="profile">
                        <BsPersonBadgeFill />
                    </Link>
                ) : (
                    <Link to="login">
                        <CiLogin />
                    </Link>
                )
            }            
            </IconsDiv>
        </HeaderStyle>
    )
}

export default Header
