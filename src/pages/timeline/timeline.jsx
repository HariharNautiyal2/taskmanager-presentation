import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskGanttChart from "./components/TaskGanttChart";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { projectCollection } from "../../queries/project";

export default function Timeline() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
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

        setTasks(tasksData.filter((task) => task !== null));
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [projectId]);

  const formatTasksForGantt = (tasks) => {
    console.log(tasks)
    return tasks.map((task) => ({
      id: task.id,
      name: task.name,
      start: dayjs(task.startDate.seconds * 1000 || task.startDate.toMillis()).format('YYYY-MM-DD'),
      end: dayjs(task.deadline.seconds * 1000 || task.deadline.toMillis()).format('YYYY-MM-DD'),
    }));

  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen w-full bg-blur text-white">
      <div className="w-2/12 h-full bg-black flex flex-col items-start justify-start">
        <Sidebar />
      </div>
      <div className="w-10/12 h-full">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TaskGanttChart tasks={formatTasksForGantt(tasks)} />
        )}
      </div>
    </div>
  );
}
