import React, { useContext, useEffect, useState } from 'react';
import { deleteTree, getAllTrees, updateTree } from '../services/treeService'
import { UserContext } from '../context/UserContext';
import { useModal } from '../context/ModalContext';
import Card from '../components/Card';
import TodoInput from '../components/TodoInput';
import { FaPlusCircle } from 'react-icons/fa';

function Todo() {

  const { showModal } = useModal()
  const { state } = useContext(UserContext);
  const [add, setAdd] = useState(true)
  console.log(state);
  const [lists, setLists] = useState([]);
  const [isModified, setIsModified] = useState();  
  const [updateValue, setUpdateValue] = useState('');
  console.log(updateValue);
  
  
  

  useEffect(() => {
    const fetchTrees = async () => {
      const trees = await getAllTrees(state.familyId);
      console.log(trees);  
      if (trees !== undefined) {
        setLists(trees);
      }    
      
    };
    fetchTrees();
  }, [state.familyId]);

  const addList = (newList) => {
    setLists(prev => [newList, ...prev]);
  }

  const handleDelete = async (id) => {
    const deletedList = await deleteTree(id);
    showModal('BRAVO', deletedList.message);
    setLists(prev => prev.filter(list => list.id !== id));
  };

  const handleUpdate = async (id, name) => {
    await updateTree(id, name);
    setLists(prev => prev.map(list => (list.id === id ? { ...list, name: updateValue } : list)));
    showModal('BRAVO', "La liste a été mis à jour.");
  };

  return (
    <div className="mt-28">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-[2.5rem] font-extrabold text-[#dbd8e3]">Les listes de la famille {state.family}</h2>
          <div className="flex gap-5 relative">
              {!add && (
                <div className="absolute -translate-x-[60%] transition-all duration-300">
                  <TodoInput familyId={state.familyId} addList={addList} />
                </div>
              )}
              <FaPlusCircle 
                className={`text-[#3e065f] rounded-full text-[3rem] transition ease duration-300 absolute right-0 sm:translate-x-[400%] hover:cursor-pointer ${!add ? "rotate-45 bg-[red]" : "bg-[green]"}`} 
                onClick={() => { setAdd(!add) }} 
              />
            </div>
          <div className="flex flex-col gap-10 mt-20 justify-center items-center">
            {lists.length > 0 ? lists.map(list => (
              <Card key={list.id} item={list} onDelete={handleDelete} onUpdate={handleUpdate} isModified={isModified} setIsModified={setIsModified} updateValue={updateValue} setUpdateValue={setUpdateValue} />
            ))
              : (
              <p>aucune liste n'a encore été créé.</p>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Todo;