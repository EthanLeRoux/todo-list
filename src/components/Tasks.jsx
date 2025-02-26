import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addTask, removeTask, updateTask} from "../redux/taskSlice.js";
import {fetchTasks} from "../firebase/firebasetasks.js";
import '/src/assets/Tasks.css';

export default function Tasks() {
    const tasks = useSelector((state)=>state.tasker.tasks);
    const dispatch = useDispatch();
    const[taskToAdd, setTaskToAdd] = useState({});

    //local react
    const handleTaskChange = (event)=>{
        const objTask = {
            name: event.target.value,
            complete: false
        };
        setTaskToAdd(objTask);
    }

    const handleTaskCompleted = (taskIndex, task)=>{
        setTaskToAdd({
            complete: task.complete
        });
    }

    //Redux Actions
    const handleAddTask = ()=>{
        if(taskToAdd.name ===""){
            alert("Task description cannot be left empty. Please enter a task.")
        }
        else{
            dispatch(addTask(taskToAdd));

            setTaskToAdd({
                name: '',
                complete: false
            })
        }

    }

    const handleRemoveTask = (taskIndex)=>{
        dispatch(removeTask(taskIndex));
    }

    const handleUpdateTask = (taskIndex, task)=>{
        handleTaskCompleted(taskIndex);
        dispatch(updateTask(taskIndex, task));
    };

    return (
        <>
            <div className="task_adding_section">
                <input type={"text"} onChange={handleTaskChange} value={taskToAdd.name} />
                <button onClick={handleAddTask} className={"task_addbutton"}>Add task</button>
            </div>


            <ul className={"task_area"}>
                {
                    tasks.map((task, index) => (
                        <li key={index} className={"task_item"}>
                            {task.name}
                            <input type={'checkbox'} value={task.completed} checked={task.completed} onChange={()=>{handleTaskCompleted(index, task)}}/>
                            <button onClick={()=>{handleRemoveTask(index)}} className={'task_button'}>
                                <img src={"src/assets/delete-icon.svg"} width={"25px"} height={"25px"} />
                            </button>
                        </li>
                    ))
                }
            </ul>

        </>
    )
}