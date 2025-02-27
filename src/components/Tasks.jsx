import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addTask, removeTask, updateTask} from "../redux/taskSlice.js";
import {fetchTasks} from "../firebase/firebasetasks.js";
import '/src/assets/Tasks.css';
import {db} from '../firebase/firebase.js';
import {collection, addDoc, deleteDoc,updateDoc, doc} from 'firebase/firestore';

export default function Tasks() {
    const tasks = useSelector((state)=>state.tasker.tasks);
    const dispatch = useDispatch();
    const[taskToAdd, setTaskToAdd] = useState({});
    const taskCollection = collection(db,"tasks");

    //local react
    const handleTaskChange = (event)=>{
        const objTask = {
            name: event.target.value,
            complete: false
        };
        setTaskToAdd(objTask);
    }

    const handleTaskCompleted = async (event, taskIndex, task)=>{
        const checkboxParentElement = event.target.closest();
        const taskToUpdatedId = checkboxParentElement.id;

        if(task.complete ===  true){
            await handleUpdateTask(taskToUpdatedId,task);
        }else{
            console.log("")
        }

    }

    //Redux Actions
    const handleAddTask = async ()=>{
        let taskToAddToFirebase = {};
        if(taskToAdd.name ===""){
            alert("Task description cannot be left empty. Please enter a task.")
        }
        else{
            taskToAddToFirebase = taskToAdd;

            setTaskToAdd({
                name: '',
                complete: false
            })

            try{
                const newTaskReference = await addDoc(taskCollection,taskToAddToFirebase);
                dispatch(addTask(taskToAdd));
                console.log("new task added to firebase" + newTaskReference.id)
            }
            catch(error){
                console.error(error);
            }
        }
    }

    const handleRemoveTask = async (taskIndex)=>{
        await deleteTaskFromFirebase(taskIndex);
        dispatch(removeTask(taskIndex));
    }

    const deleteTaskFromFirebase = async (taskID)=>{
        const taskToBeDeleted = doc(db,"tasks", taskID);
        await deleteDoc(taskToBeDeleted);
        console.log("Deleted " + taskToBeDeleted.id );
    };

    const handleUpdateTask = async (taskIndex, task)=>{
        await updateTaskToFirebase(taskIndex, task);
        dispatch(updateTask({
            name: task.name,
            complete: !task.complete
    }));
    };

    const updateTaskToFirebase = async (taskID, updatedTask)=>{
        const taskToUpdated = doc(db,"tasks", taskID);
        await updateDoc(taskToUpdated,updatedTask,{merge:true});
    }

    return (
        <>
            <div className="task_adding_section">
                <input type={"text"} onChange={handleTaskChange} />
                <button onClick={handleAddTask} className={"task_addbutton"}>Add task</button>
            </div>


            <ul className={"task_area"}>
                {
                    tasks.map((task) => (
                        <li key={task.id} className={"task_item"} id={task.id}>
                            {task.name}

                            <input type={'checkbox'}
                                   value={task.complete}
                                   checked={task.complete}
                                   onChange={async ()=>{
                                       await handleUpdateTask(task.id, {
                                           name: task.name,
                                           complete: !task.complete
                                       });
                                   }}
                            />

                            <button onClick={()=>{handleRemoveTask(task.id)}} className={'task_button'}>
                                <img src={"src/assets/delete-icon.svg"} width={"25px"} height={"25px"} />
                            </button>
                        </li>
                    ))
                }
            </ul>

        </>
    )
}