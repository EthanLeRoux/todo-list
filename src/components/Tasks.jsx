import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addTask, removeTask, updateTask} from "../redux/taskSlice.js";
import '/src/assets/Tasks.css';
import {db} from '../firebase/firebase.js';
import {collection, addDoc, deleteDoc,updateDoc, doc} from 'firebase/firestore';
import {auth} from '../firebase/auth.js';

export default function Tasks() {
    const tasks = useSelector((state)=>state.tasker.tasks);
    const dispatch = useDispatch();
    const[taskToAdd, setTaskToAdd] = useState({});
    const taskCollection = collection(db,"tasks");

    //local react state for task changes
    const handleTaskChange = (event)=>{
        const objTask = {
            name: event.target.value,
            complete: false
        };
        setTaskToAdd(objTask);
    }

    //add task from redux store and firebase collection

    const handleAddTaskByUser = async ()=>{
        let taskToAddToFirebase = {};
            if (taskToAdd.name === "") {
                alert("Task description cannot be left empty. Please enter a task.")
            }
                const user = auth.currentUser;
                if(user ) {
                    taskToAddToFirebase = {
                        userid: user.uid,
                        name: taskToAdd.name,
                        complete: taskToAdd.complete,
                    };

                    setTaskToAdd({
                        name: '',
                        complete: false
                    })

                    try {
                        const newTaskReference = await addDoc(taskCollection, taskToAddToFirebase);
                        dispatch(addTask(taskToAdd));
                        console.log("new task added to firebase" + newTaskReference.id)
                    } catch (error) {
                        console.error(error);
                    }
                }else{
                    alert("You are not logged in. Please login to start creating notes.")
                }
    }

    //remove task from redux store and firebase collection
    const handleRemoveTask = async (taskIndex)=>{
        await deleteTaskFromFirebase(taskIndex);
        dispatch(removeTask(taskIndex));
    }

    const handleUpdateTask = async (taskIndex, task)=>{
        await updateTaskToFirebase(taskIndex, task);
        dispatch(
            updateTask(task));
    };

    //Firebase CRUD functions
    const deleteTaskFromFirebase = async (taskID)=>{
        const taskToBeDeleted = doc(db,"tasks", taskID);
        await deleteDoc(taskToBeDeleted);
        console.log("Deleted " + taskToBeDeleted.id );
    };

    const updateTaskToFirebase = async (taskID, updatedTask)=>{
        const taskToBeUpdated = doc(db,"tasks", taskID);
        await updateDoc(taskToBeUpdated,{
            complete: updatedTask.complete,
        });
        console.log("Updated task: " + taskToBeUpdated.id);
    }

    return (
        <>
            <div className="task_adding_section">
                <input type={"text"} onChange={handleTaskChange} value={taskToAdd.name}/>
                <button onClick={handleAddTaskByUser} className={"task_addbutton"}>Add task</button>
            </div>


            <ul className={"task_area"}>

                {
                    (tasks === undefined || tasks.length === 0)?<div>No tasks found.<br/> Add one by typing in the box above.</div> : tasks.map((task,index) => (
                    <li key={task.id || index} className={"task_item"} id={task.id}>
                        {task.name}
                        <input type={'checkbox'}
                               checked={
                                   task.complete
                               }
                               onChange={async ()=>{
                                   await handleUpdateTask(task.id, {
                                       name: task.name,
                                       complete: !(task.complete)
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