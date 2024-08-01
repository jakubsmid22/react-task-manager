import { useState, useEffect } from "react";
import Header from "./Header";
import app from "../firebaseconfig";
import Task from "./Task";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc
} from "firebase/firestore";

const TaskManager = ({ user }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [userExist, setUserExist] = useState(false);
  const [task, setTask] = useState("");
  const [tasksExist, setTasksExist] = useState(false);
  const db = getFirestore(app);

  const getData = async () => {
    if (id && userExist) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const subCollectionRef = collection(docRef, "tasks");
        const subCollectionSnap = await getDocs(subCollectionRef);

        const subCollectionData = subCollectionSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setTasks(subCollectionData);
        setTasksExist(subCollectionData.length > 0);
      } else {
        console.log("No such document!");
      }
    }
  };

  const getUser = async (userId) => {
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }

    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserExist(true);
      } else {
        await setDoc(docRef, {});
        setUserExist(true);
      }
    } catch (error) {
      console.error("Error getting or adding user:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, userExist]);

  useEffect(() => {
    if (user) {
      const { uid, email } = user;
      setName(email.split("@")[0]);
      setId(uid);
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  async function addTasksToUser(userId, data) {
    const userDocRef = doc(db, "users", userId);
    const subcollectionRef = collection(userDocRef, "tasks");
    await addDoc(subcollectionRef, data);
    getData();
  }

  const addTask = async (e) => {
    e.preventDefault();
    const data = { text: task };
    await addTasksToUser(id, data);
    setTask("");
  };

  const deleteTask = async (taskId) => {
    try {
      const userDocRef = doc(db, "users", id);
      const taskDocRef = doc(userDocRef, "tasks", taskId);
      await deleteDoc(taskDocRef);
      getData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Header name={name} logOut={logOut} />
      <main className="flex flex-col min-h-screen justify-center items-center gap-16 py-16 px-4">
        <h1 className="font-bold text-4xl">TASK MANAGER</h1>

        <form className="w-full max-w-md flex flex-col" onSubmit={e => addTask(e)}>
          <input type="text" value={task} className="border p-2 mb-2" onChange={(e) => setTask(e.target.value)} />
          <input type="submit" value="SUBMIT" className="p-2 bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-white cursor-pointer"/>
        </form>

        <div className="flex flex-col gap-3 items-center w-full">
          {!tasksExist ? <p>No tasks</p> : tasks.map((task) => (
            <Task key={task.id} text={task.text} deleteTask={() => deleteTask(task.id)} />
          ))}
        </div>
      </main>
    </>
  );
};

export default TaskManager;
