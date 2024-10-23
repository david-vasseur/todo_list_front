import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { useState } from 'react';
import { fetchLogout, getAllUsers } from '../services/userService';
import { SecurityContext } from '../context/SecurityContext';
import { createFamily } from '../services/familyService';
import { TfiExport } from 'react-icons/tfi';

function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const { jwt, csrf } = useContext(SecurityContext);   
  const { showModal } = useModal();
  const [seeUsers, setSeeUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [create, setCreate] = useState(false);
  const [add, setAdd] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();


  const handleDisconnect = async (dispatch) => {
    const response = await fetchLogout(csrf);  
    showModal(response.message, `A bientot ${state.firstName}`);
    dispatch({ type: 'remove user' });
    navigate('/');
  }

  useEffect (() => {    
    const fetchUsers = async () => {
      if (state.familyId && seeUsers) {
        const users = await getAllUsers(csrf, state.familyId);
        setUsers(users.data)
      };    
    };
    if (state.familyId) {
      fetchUsers();
    }
    
  }, [seeUsers, state.familyId]);

  const handleSubmit = async (value) => {
    const id = state.id;
    const name = value;
    const result = await createFamily(csrf, id, name);
    if (result) {
      dispatch({ type: 'add family', payload: { family: value, familyId: result.data.id } })
    }
    return result.message;
  };

  return (
    <div className="mt-28">
        <div className="flex flex-col gap-5 items-center text-[#dbd8e3]">
          <h2>Bienvenue {state.firstName}</h2>
        
          <div className="p-10 backdrop-blur-md font-bold rounded-lg ">
            <ul>
              <li>Nom: {state.name}</li>
              <li>Prenom: {state.firstName}</li>
              <li>Email: {state.email}</li>
              {
              state.family === null || state.family === undefined ? (
                <div className="flex flex-col gap-2 mt-5">
                  <button onClick={() => {setCreate(!create)}} className=" rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform">Creer une famille</button> 
                  <button onClick={() => {setAdd(!add)}} className=" rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform">Ajouter une famille</button> 
                </div>
              )
                : 
                <li>Famille: <button onClick={() => {setSeeUsers(!seeUsers)}}>{state.family}</button></li>
                }
                {state.isOwner && state.hash !== null && state.hash !== undefined && 
                  <div className="flex gap-5 items-center">
                    <li>{state.hash}</li>
                    <TfiExport />
                  </div>
                }
              {
                seeUsers && users.length > 0 &&
                  users.map(user => (
                    <li key={user.id}>{user.firstName}</li>
                ))
              }
            </ul>
            {
              create && (
                <div>
                  <input type="text" name="" id="" placeholder="Entrer le nom de votre famille" onChange={(e) => {setInputValue(e.target.value)}} value={inputValue} />
                  <button type="submit" onClick={() => {
                    handleSubmit(inputValue);
                    setCreate(!create);
                    }}>Creer</button>
                </div>
              )
            }
          </div>
        </div>
          <button className="ml-[45%] rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform" onClick={() => {handleDisconnect(dispatch)}}>Se deconnecter</button>
        
    </div>
  )
}

export default Profile;