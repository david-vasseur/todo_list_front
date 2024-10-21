import React, { useEffect, useState } from 'react'
import TodoInput from '../components/TodoInput'
import { getTree } from '../services/treeService'
import { useParams } from 'react-router-dom'
import { deleteTask, getAllTasks, updateTask } from '../services/taskService'
import Card from '../components/Card'
import { useModal } from '../context/ModalContext'
import { FaPlusCircle } from 'react-icons/fa'
import io from 'socket.io-client';
import BackButton from '../components/BackButton'

function List() {

    const { showModal } = useModal()
    const params = useParams();
    const { id } = params;
    const [add, setAdd] = useState(true);
    const [list, setList] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isModified, setIsModified] = useState(null); 
    const [updateValue, setUpdateValue] = useState('');
    console.log(tasks);
    
    const socket = io('http://91.134.90.159/');

    useEffect(() => {
        const fetchList = async () => {
            const fetchedList = await getTree(id);
            setList(fetchedList);
        }
        const fetchTasks = async () => {
            const fetchedTasks = await getAllTasks(id);
            setTasks(fetchedTasks);
        }
        fetchList();
        fetchTasks();
    }, [id]);

    useEffect(() => {
      
      socket.on('taskAdded', (newTask) => {
        setTasks(prevTasks => [newTask, ...prevTasks]); 
      });

      socket.on('taskUpdated', (updatedTask) => {
        setTasks(prev => prev.map(task => (task.id === updatedTask.id ? { ...task, content: updatedTask.content } : task)));
      });

      socket.on('taskDeleted', (deletedTask) => {
        setTasks(prev => prev.filter(task => task.id !== deletedTask.id));
      });
  
      return () => {
        socket.off('taskAdded');
        socket.off('taskUpdated');
        socket.off('taskDeleted');
        socket.disconnect();
      };
    }, [socket]);

    const handleDelete = async (id) => {
        const deletedTask = await deleteTask(id);
        showModal('BRAVO', deletedTask.message);
      };
    
      const handleUpdate = async (id, content) => {
        console.log({ id, content });
        
        const updatedTask = await updateTask(id, content);
        setTasks(prev => prev.map(task => (task.id === id ? { ...task, content: updateValue } : task)));
        showModal('BRAVO', updatedTask.message);
      };

  return (
    <div className="mt-28">
        <div className="flex gap-10 justify-between items-center w-[50vw] ml-5">
            <BackButton />
        </div>
        <div className="flex flex-col gap-5 items-center">
        <h2 className="text-[2.5rem] font-extrabold text-[#dbd8e3]">{list.name}</h2>
            <div className="flex gap-5 relative">
              {!add && (
                <div className="absolute scale-[0.8] sm:scale-[1] -translate-x-[65%] sm:-translate-x-[60%] transition-all duration-300">
                  <TodoInput id={id} />
                </div>
              )}
              <FaPlusCircle 
                className={`text-[#3e065f] rounded-full text-[3rem] transition ease duration-300 absolute translate-x-[300%] sm:translate-x-[400%] hover:cursor-pointer ${!add ? "rotate-45 bg-[red]" : "bg-[green]"}`} 
                onClick={() => { setAdd(!add) }} 
              />
            </div>
            <div className="flex flex-col gap-5 mt-20">
                {tasks.map(task => (
                <Card key={task.id} item={task} setIsModified={setIsModified} isModified={isModified} onDelete={handleDelete} onUpdate={handleUpdate} updateValue={updateValue} setUpdateValue={setUpdateValue} />
                ))}
            </div>
          </div>
    </div>
  )
}

export default List;