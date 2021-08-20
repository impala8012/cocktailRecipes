import React, { useState, useContext } from "react";
import { IconContext } from "react-icons/lib";
import {
  Nav,
  NavBarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "./Navbar.element";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../contexts";
import {useHistory} from "react-router-dom"
const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  let history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setIsAuth(false)
    history.push("/")
  }
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavBarContainer>
          <NavLogo to="/" onClick={closeMobileMenu}>
            <NavIcon />
            理性癮酒
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <NavLinks href="/">首頁</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/recipes">酒譜列表</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/categories">分類列表</NavLinks>
            </NavItem>
            {isAuth && (
              <NavItem>
                <NavLinks href="/add-recipe">發表文章</NavLinks>
              </NavItem>
            )}
            {!isAuth && (
              <>
                <NavItem>
                  <NavLinks href="/login">登入</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks href="/register">註冊</NavLinks>
                </NavItem>
              </>
            )}

            {isAuth && (
              <NavItem>
                <NavLinks onClick={handleLogout}>登出</NavLinks>
              </NavItem>
            )}
          </NavMenu>
        </NavBarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
