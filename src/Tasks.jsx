import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addTask, removeTask, updateTask} from "./redux/taskSlice.js";

export default function Tasks() {
    const tasks = useSelector((state)=>state.tasker.tasks);
    const dispatch = useDispatch();

    const[taskName, setTaskName] = useState("");
    const[taskToAdd, setTaskToAdd] = useState({});

    const handleTaskChange = (event)=>{
        const objTask = {
            name: event.target.value,
            complete: false
        };
        setTaskToAdd(objTask);
    }

    //Redux Actions
    const handleAddTask = ()=>{
        dispatch(addTask(taskToAdd));
        setTaskToAdd({
            name: '',
            complete: false
        })
    }

    const handleRemoveTask = (taskIndex)=>{
        dispatch(removeTask(taskIndex));
    }

    const handleTaskCompleted = (taskIndex, task)=>{
        setTaskToAdd({
            name: task.name,
            complete: task.complete
        });
    }

    return (
        <>
            <input type={"text"} onChange={handleTaskChange} value={taskToAdd.name}/>
            <button onClick={handleAddTask}>Add task</button>

            <ul>
                {
                    tasks.map((task, index) => (
                        <li key={index}>
                            {task.name}
                            <input type={'checkbox'} checked={task.completed} onChange={()=>{handleTaskCompleted(index, task)}}/>
                            <button onClick={()=>{handleRemoveTask(index)}}>Delete task</button>
                        </li>
                    ))
                }
            </ul>

        </>
    )
}