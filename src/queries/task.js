import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { parseTaskDoc } from "../utils/parsers";

const taskCollection = collection(db, "tasks");
const projectCollection = collection(db, "projects")

export async function createTask(newTask) {
  const taskDoc = await addDoc(taskCollection, { ...newTask });
  const taskId = taskDoc.id;

  await updateDoc(doc(projectCollection, newTask.projectId), {
    tasks: arrayUnion(taskId),
  });
  return { ...newTask, id: taskId };

}

export async function getAllTasks() {
  const { docs } = await getDocs(taskCollection);
  return docs.map(parseTaskDoc);
}

export async function getProjectTasks(projectId) {
  const { docs } = await getDocs(
    query(taskCollection, where("projectId", "==", projectId))
  );

  return docs.map((doc) => parseTaskDoc(doc));
}

export async function deleteTask(taskId, projectId) {
  console.log("Deleting task with ID:", taskId, "from project with ID:", projectId); // Debug log

  await deleteDoc(doc(db, "tasks", taskId));
  await updateDoc(doc(db, "projects", projectId), {
    tasks: arrayRemove(taskId),
  });

  console.log("Task deleted successfully"); // Debug log
}


export async function getTaskById(taskId) {
  const task = await getDoc(doc(db, "tasks", taskId));
  return parseTaskDoc(task);
}
export async function editTask(data) {
  const task = await getTaskById(data.taskId);

  if (task.createdBy !== data.userId) {
    throw new Error("You don't have access to edit this task.");
  }

  await setDoc(
    doc(taskCollection, data.taskId),
    {
      name: data.name,
      description: data.description,
      status: data.status,
      priority: data.priority,
      startDate: data.startingDate,
      deadline: data.deadline,
      checklist: data.checklist,
      assignedTo: data.assignedTo,
    },
    { merge: true }
  );
}