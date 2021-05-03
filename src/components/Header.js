import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
    selectUserName,
    selectPhoto,
    setUserLogin,
    setSignOut
} from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth, provider } from '../firebase';

function Header() {

    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push('/')
            }
        })

    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                let user = result.user
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push('/')
            })
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOut())
                history.push('/login')
            })

    }
    return (
        <Nav>
            <Logo>
                <img src='/images/logo.svg' alt="Disney+" />
            </Logo>

            {
                !userName ? (
                    <LoginContainer>


                        <Login onClick={signIn}>Login</Login>
                    </LoginContainer>) :
                    <>

                        <NavMenu>

                            <a>
                                <img alt="" src='/images/home-icon.svg' />
                                <span>HOME</span>

                            </a>


                            <a>
                                <img alt="" src='/images/watchlist-icon.svg' />
                                <span>WATCHLIST</span>

                            </a>

                            <a>
                                <img alt="" src='/images/original-icon.svg' />
                                <span>ORIGINALS</span>

                            </a>
                            <a>
                                <img alt="" src='/images/movie-icon.svg' />
                                <Menu>
                                    <li className="dropdown">
                                        <span>MOVIES</span>
                                        <div className="dropdown-content">
                                            <a href="#">English</a>
                                            <a href="#">Hindi</a>
                                            <a href="#">Bengali</a>
                                            <a href="#">Tamil</a>
                                            <a href="#">Telugu</a>
                                            <a href="#">Malyalam</a>
                                        </div>
                                    </li>
                                </Menu>

                            </a>
                            <a>
                                <img alt="" src="/images/series-icon.svg" />
                                <Menu>
                                    <li className="dropdown">
                                        <span>SERIES</span>
                                        <div className="dropdown-content">
                                            <a href="#">Comedy</a>
                                            <a href="#">Action</a>
                                            <a href="#">Drama</a>
                                            <a href="#">Romance</a>
                                            <a href="#">Sci-Fi</a>
                                            <a href="#">Suspense</a>
                                        </div>
                                    </li>
                                </Menu>

                            </a>



                        </NavMenu>
                        <Search>
                            <input className="search" placeholder="Search" />
                            <div className="search-icon">
                                <i className="icon" />

                            </div>

                        </Search>
                        <Menu>
                            <li className="dropdown">
                                <UserImg src={userPhoto} />

                                <div className="dropdown-content">
                                    <a onClick={signOut}>Sign Out</a>

                                </div>
                            </li>
                        </Menu>


                    </>
            }
        </Nav>
    )
}

export default Header;

const Nav = styled.nav`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`

  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`

const NavMenu = styled.div`
    
    display:flex;    
    flex:1;
    margin-left:25px;
    align-items:center;
    a {
        display:flex;
        align-items:center;
        padding: 0 12px;
        cursor: pointer;

        img{
            height: 20px;
            padding: 0 10px;
            
        }

        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position:relative;
            padding: 2px 0px;

            &:after{
                content:"";
                height:2px;
                background:white;
                position:absolute;
                left:0px;
                right:0px;
                bottom:-6px;
                opacity:0;
                transfrom-origin: left center;
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                transfrom:scaleX(0);

            }

        }

        &:hover{
            span:after{
                transfrom : scaleX(1);
                opacity:1;
            }
        }
    }
`

const UserImg = styled.img`
width:48px;
height:48px;
border-radius:50%;
cursor: pointer;
`
const Search = styled.div`
    
        height:50px;
        padding:10px 10px;
        background:#090b13;
        cursor:pointer;

        & > .search-icon{
            
            display: inline-block;
            position: relative;
            top: 6px;
            right: 0px;
            pointer-events: none;
            height: 30px;
            width: 30px;
            -webkit-opacity: .7;
            -moz-opacity: .7;
            -o-opacity: .7;
            opacity: .7;
           

            & > .icon{
            background:url("/images/search-icon.svg" );
            display: inline-block;
            width: 100%;
            height: 100%;
            transform: scale(0.9);
            }

        }

        
        
     & > .search {
        
        height: 32px;
        border: none;
        position: relative;
        border-bottom: 1px solid #d3d3d3;
        color: var(--TEXT_COLOR_L2);
        padding: 0 100px 0 0px;
        color:#fff;
        border-radius: 0;
        background: none;
        transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
        
        
    }
    .search:focus {
    outline: none !important;
    padding: 0 200px 0 0px;
    border-bottom:1px solid;
    transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;

}
    

`
const Login = styled.div`

    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing:5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    

    &:hover {
        background-color: #f9f9f9;
        color:#000;
        border-color: transparent;
        cursor:pointer

    }
`

const LoginContainer = styled.div`
    flex:1;
    display:flex;
    justify-content:flex-end;
    
`

const Menu = styled.ul`

  /* main UL component called: "Menu" */

  margin: 0;
  padding: 0;
  overflow: hidden;
  align-items:center;
  background-color: #090b13;
  


  /* main LI */
  & > li {
    

    & > a {
      display: inline-block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      
      &:hover {
        background-color: #232b4a;
        
      }
    }
  }

  /* dropdown LI */
  & > .dropdown {
      display: inline-block;
      border-radius:10px;
      transition: slideup 0.3s,hs-fadeIn 0.3s;
      
  
      & > .dropdown-content {
        display: none;
        position: absolute;
        border-radius:10px;
        background-color: #1c2135;
        
        min-width: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;

        & > a {
          
          padding: 12px 16px;
          text-decoration: none;
          letter-spacing:1px;
          color:#fff;
          display: block;
          text-align: left;
          &:hover {
            background-color: #232b4a;

          }
        }
      }

      &:hover .dropdown-content {
        display: block;
        transition: slideup 0.3s,hs-fadeIn 0.3s;

        
      }
      
    }
`