import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProjectById,
  getProjectMembers,
  removeMemberFromProject,
} from "../../queries/project";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { toast } from "react-toastify";
import Sidebar from "../../component/sidebar/sidebar";
import { createTheme } from '@mui/material/styles';
import { addMember } from './componenets/addMember';

export default function Members() {
  const theme = createTheme({ palette: { mode: 'dark' } });

  const { projectId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [members, setMembers] = useState([]);

  const { data: project } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectById(projectId),
  });

  const { data: projectMembers, refetch: refetchMembers } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
    onSuccess: (data) => {
      setMembers(data);
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: removeMemberFromProject,
    onSuccess: () => {
      refetchMembers();
      toast.success("Member removed successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    },
  });

  useEffect(() => {
    if (projectMembers) {
      setMembers(projectMembers);
    }
  }, [projectMembers]);

  const isAdmin = project?.userId === currentUser?.uid;

  return (
    <div className="flex flex-row h-screen w-full">
      <div className="w-2/12 h-full">
      <Sidebar />
      </div>
     
      <div className="flex-grow h-full flex flex-col p-5 space-y-1 bg-blur w-10/12">
        <h1 className="text-lg font-bold mb-4 text-black">Project members</h1>
        <div className="flex flex-grow h-full w-full space-x-2">
          {members.map((item, index) => (
            <div class="flex flex-col items-center p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12 justify-center">
              <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={item?.photoURL || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} alt="Bonnie image" />
              <h5 class="mb-1 text-xl font-medium text-white">{item.username}</h5>
              <span class="text-sm text-gray-500 dark:text-gray-400 text-wrap">{item.id}</span>
              <div class="flex mt-4 md:mt-6">
                <Button variant="outlined" className="w-full">Remove</Button>
              </div>
            </div>
          ))}
          <div class="hover:bg-purple-600 transition-all flex flex-col items-center p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12 justify-center">
            <svg className="w-24 h-24 mb-3 rounded-full shadow-lg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
              <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Add Member</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">Add Member by their id</span>
            <div class="flex mt-4 md:mt-6">
             <addMember className="w-full" />
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}
