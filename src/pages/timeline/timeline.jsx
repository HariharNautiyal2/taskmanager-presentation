import React, { useState, useEffect, useContext } from "react";
import { useTasks } from "../../hooks/use-tasks";
import { useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../context/AuthContext";
import TaskGanttChart from "./components/TaskGanttChart";
import {
  doc, getDoc, onSnapshot
} from "firebase/firestore";
import { projectCollection } from "../../queries/project";


export default function Timeline() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const projectDocRef = doc(projectCollection, projectId);
    const unsubscribe = onSnapshot(projectDocRef, async (projectDoc) => {
      if (projectDoc.exists()) {
        const tasksRefs = projectDoc.data().tasks || [];
        const tasksData = await Promise.all(
          tasksRefs.map(async (taskRef) => {
            const taskDoc = await getDoc(taskRef);
            return taskDoc.exists() ? { id: taskDoc.id, ...taskDoc.data() } : null;
          })
        );
        const membersRefs = projectDoc.data().members || [];
        const membersData = await Promise.all(
          membersRefs.map(async (memberRef) => {
            const memberDoc = await getDoc(memberRef);
            return memberDoc.exists() ? { id: memberDoc.id, ...memberDoc.data() } : null;
          })
        );
        setMembers(membersData.filter((member) => member !== null));
        setLoading(false);
        setTasks(tasksData.filter((task) => task !== null));
      } else {
        console.log("No such document!");
      }
    });
    return () => unsubscribe();
  }, [projectId]);



  return (
    <div className="flex flex-row items-center justify-center min-h-screen w-full bg-blur text-white">
      <div className="w-2/12 h-full bg-black flex flex-col items-start justify-start">
       <Sidebar />
      </div>
      <div className="w-10/12 h-full ">
 <TaskGanttChart tasks={tasks}/>
      </div>
    </div>
  );
}
