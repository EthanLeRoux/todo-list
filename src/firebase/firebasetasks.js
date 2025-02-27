import {db} from './firebase.js';
import {collection, addDoc, getDocs} from 'firebase/firestore';

const addTask = async (task) => {
    try {
        const documentReference = await addDoc(collection(db, 'tasks'), {
            name: task.name,
            completed: task.completed,
        });

        console.log("New task added. ID: " + documentReference.id);
    }
    catch (error) {
        console.error(error);
    }
};

const fetchTasks = async () => {
    const arrayTasks= [];
    try{
        const querySnapshot = (await getDocs(collection(db, 'tasks'))).docs;

        console.log("Getting task documents...");

        if(querySnapshot ==null || querySnapshot.length == 0){
            console.log("No tasks found in firebase firestore");
        }
        return querySnapshot.map((task)=>({
            id: task.id,
            name:task.data().name,
            complete: task.data().complete,
        }));
    }
    catch(error) {
        console.error(error);
    }
    return arrayTasks;
}

export {addTask, fetchTasks};