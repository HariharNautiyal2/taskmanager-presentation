import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProjectById } from "../../queries/project";
import Loader from "../../component/loader/loader";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/constants";
import CreateTaskModal from "./components/create-task-modal";
import EditTaskModal from "./components/edit-task-modal";
import { useTasks } from "../../hooks/use-tasks";
import { DataGrid } from "@mui/x-data-grid";
import TaskPriority from "./components/task-priority";
import Status from "./components/status";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import TaskDetailsModal from "./components/task-details-modal";
import Sidebar from "../../component/sidebar/sidebar";
import { getUserById } from "../../queries/user";
import "./task.scss";
import { getProjectTasks } from "../../queries/task";
import { getProjectMembersById } from "../../queries/project";
const Task = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

   
 async function getTasks() {
    const result = await getProjectTasks(projectId);
   if (result) {
     setLoading(false);
     setTasks(result)
      }
  }
  const [usernames, setUsernames] = useState([]);
  async function getUsernames() {
    const result = await getProjectMembersById(projectId);
   if (result) {
     setUsernames(result);
      }
  }
  

 
  getTasks();
  getUsernames();





  return (
    <div className="flex flex-row h-screen w-full">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="flex-col overflow-x-hidden h-full overflow-y-scroll flex space-x-1 p-5 bg-blur w-10/12">
        <h1 className="text-lg font-bold mb-4 text-black">Tasks</h1>
        <div className="flex flex-wrap  h-full w-full gap-2 items-center justify-center">
          <CreateTaskModal members={usernames} />
          {tasks.map((item, index) => (
            <div key={item.id} className="text-white flex flex-col items-center p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12 justify-center">
    
              <h1 className="mb-1 text-xl font-medium text-white">{item.name}</h1>
              <p>Status: {item.status}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-wrap"></span>
              <div className="flex mt-4 md:mt-6 flex-col w-full space-y-1">
                <Button variant="contained">Edit</Button>
                <Button variant="outlined" className="w-full" fullWidth>Remove</Button>
              </div>
            </div>
          ))}
         
          </div>
        </div>
      </div>
  );
};

export default Task;
