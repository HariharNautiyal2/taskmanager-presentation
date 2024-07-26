import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Sidebar from "../../component/sidebar/sidebar";
import AddMember from './componenets/addMember'; // Corrected import path
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { projectCollection } from "../../queries/project"; // Ensure this path is correct
import { removeMemberById } from "../../queries/project"; // Ensure this path is correct

export default function Members() {
  const { projectId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const projectDocRef = doc(projectCollection, projectId);

    const unsubscribe = onSnapshot(projectDocRef, async (projectDoc) => {
      if (projectDoc.exists()) {
        const membersRefs = projectDoc.data().members || [];
        const membersData = await Promise.all(
          membersRefs.map(async (memberRef) => {
            const memberDoc = await getDoc(memberRef);
            return memberDoc.exists() ? { id: memberDoc.id, ...memberDoc.data() } : null;
          })
        );
        setMembers(membersData.filter((member) => member !== null));
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [projectId]);

  function removeMember(pid, uid) {
    removeMemberById(pid, uid)
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
      <div className="w-2/12 h-full">
        <Sidebar />
      </div>
     
      <div className="flex-grow h-full flex flex-col p-5 space-y-1 bg-blur w-10/12">
        <h1 className="text-xl font-bold mb-4 text-white">Project members</h1>
        <div className="flex flex-wrap items-center justify-center h-full w-full gap-2">
          <AddMember projectId={projectId} />
          {members.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12 justify-center">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={item?.profileImage || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} alt={item.username} />
              <h5 className="mb-1 text-xl font-medium text-white">{item.username}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-wrap">{item.id}</span>
              <div className="flex mt-4 md:mt-6">
                <Button variant="outlined" className="w-full" onClick={() => removeMember(projectId, item.id)} disabled={currentUser.id === item.id}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
