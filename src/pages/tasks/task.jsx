import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProjectTasks } from "../../queries/task";
import { getProjectMembersById } from "../../queries/project";
import Sidebar from "../../component/sidebar/sidebar";
import CreateTaskModal from "./components/create-task-modal";
import { Button } from "@mui/material";
import "./task.scss";
import {
  doc,
  onSnapshot,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { projectCollection } from "../../queries/project";
import { taskCollection } from "../../queries/task";
import EditTaskModal from "./components/edit-task-modal";
import TaskDetailsModal from "./components/task-details-modal";
import { removeTask } from "../../queries/task";
import { toast } from "react-toastify";

const Task = () => {
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


  if (loading) {
    return (
      <div className="flex flex-row h-screen w-full">
        <div className="w-2/12">
        <Sidebar />
        </div>
        <div className="flex flex-col w-10/12 h-full items-center justify-center bg-blur">
          <div  className="text-lg text-white spin">
             +
            </div>
        </div>
        </div>
    );
  }

  function removeTaskNow(taskid, pid) {
    removeTask(taskid, pid)
      .then(() => {
        toast.success("Member removed successfully.");
      })
      .catch((error) => {
        console.error("Error removing member:", error);
        toast.error("Error removing member.");
      });
  }

  return (
    <div className="flex flex-row h-screen w-full">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="flex-col overflow-x-hidden h-full overflow-y-scroll flex space-x-1 p-5 bg-blur w-10/12">
        <h1 className="text-xl font-bold mb-4 text-white">Tasks</h1>
        <div className="flex flex-wrap h-full w-full gap-2 items-center justify-center">
          <CreateTaskModal members={members} />
          {tasks.map((item) => (
            <div key={item.id} className="text-white flex flex-col backdrop: p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12">
              <h1 className="mb-1 text-2xl font-bold text-white">{item.name}</h1>
              <p>Checklist:</p>
              <p className="font-mono text-white">{ item.checklist}</p>
              <div className="flex mt-1 md:mt-6 flex-col w-full space-y-1">
                {/* <EditTaskModal task={item,} /> */}
                <div className="w-full">
                 <TaskDetailsModal task={item} fullWidth />
                </div>
              
                <EditTaskModal members={members} task={item} />
                <Button variant="outlined" color="secondary" className="w-full" fullWidth onClick={() => removeTaskNow(item.id, projectId)}>Remove</Button>
                
                
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
