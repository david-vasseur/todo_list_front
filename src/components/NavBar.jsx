import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function NavBar() {
    const { state } = useContext(UserContext);
  return (
    <div className="fixed top-0 right-0 w-[100vw] z-50 backdrop-blur-sm blur-[0.5px] bg-gradient-to-r from-[#3e065f9a] via-[#6f0b9793] to-[#8d05c29f] flex justify-between items-center">
        <img src='./images/icon.jpg' className="w-[3rem] rounded-3xl p-1 ml-5" />
        <ul className=' text-[#DBD8E3] flex gap-5 h-16 justify-end pr-5 items-center font-extrabold'>
            <li>
                <Link to="/">Accueil</Link>
            </li>
            
                {
                    state.isConnected === true ? (
                    <>
                        <li>
                            <Link to="/todo">Mes listes</Link>
                        </li>
                        <li>
                            <Link to="/profile">{state.firstName}</Link>
                        </li>
                    </>
                    ) : (
                        <li>
                            <Link to="/sign">Se connecter</Link>
                        </li>
                    )
                }
        </ul>
    </div>
  )
}

export default NavBar