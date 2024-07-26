import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  or,
  arrayRemove,
} from "firebase/firestore";
import { parseProjectDoc } from "../utils/parsers";
import { userCollection } from "./user";
import { removeInvitation } from "./invitation";

export const projectCollection = collection(db, "projects");

export async function createProject(newProject) {
  await addDoc(projectCollection, {
    ...newProject,
    creationDate: new Date(),
    members: [doc(userCollection, newProject.userId)],
  });
}

export async function getProjects(userId) {
  const projectsQuery = query(
    projectCollection,
    or(
      where("userId", "==", userId), // user who created the project
      where("members", "array-contains", doc(userCollection, userId)) // user is invited to the project
    )
  );

  const { docs } = await getDocs(projectsQuery);

  return docs.map((doc) => parseProjectDoc(doc));
}



export async function deleteProject(id) {
  await deleteDoc(doc(db, "projects", id));
}

export async function addMemberById(projectId, userId) {
  try {
    const projectDocRef  = doc(projectCollection, projectId);
    await updateDoc(projectDocRef, {
      members: arrayUnion(doc(userCollection, userId))
    });
  } catch (error) {
    console.error("Error adding user to project:", error);
    throw new Error("Error adding user to project."); 
  }
}
export async function removeMemberById(projectId, userId) {
  try {
    const projectDocRef = doc(projectCollection, projectId);
    const userDocRef = doc(userCollection, userId);

    await updateDoc(projectDocRef, {
      members: arrayRemove(userDocRef)
    });
  } catch (error) {
    console.error("Error removing user from project:", error);
    throw new Error("Error removing user from project."); 
  }
}

export async function validateUserById(id) {
  try {
    const userDocRef = doc(userCollection, id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User exists:", userDoc.data());
      return true;
    } else {
      console.log("User does not exist.");
      return false;
    }
  } catch (error) {
    console.error("Error validating user:", error);
    throw new Error("Error validating user.");
  }
}

export async function getProjectById(id) {
  const project = await getDoc(doc(db, "projects", id));
  return parseProjectDoc(project);
}

export async function addMemberToProject(access) {
  await setDoc(
    doc(projectCollection, access.project),
    {
      members: arrayUnion(doc(userCollection, access.member)),
    },
    { merge: true }
  );
}

export async function getProjectMembers(project) {
  const projectDoc = await getDoc(doc(projectCollection, project));

  return Promise.all(
    projectDoc.data().members.map(async (member) => {
      const memberDoc = await getDoc(member);

      return {
        id: memberDoc.id,
        ...memberDoc.data(),
      };
    })
  );
}
export async function getProjectMembersById(projectId) {
  const projectDoc = await getDoc(doc(projectCollection, projectId));

  return Promise.all(
    projectDoc.data().members.map(async (member) => {
      const memberDoc = await getDoc(member);

      return {
        id: memberDoc.id,
        ...memberDoc.data(),
      };
    })
  );
}
export async function removeMemberFromProject(data) {
  const project = await getProjectById(data.project);

  if (project.userId !== data.adminId) {
    throw new Error("You cannot remove this user.");
  }

  await Promise.all([
    setDoc(
      doc(projectCollection, data.project),
      {
        members: arrayRemove(doc(userCollection, data.member)),
      },
      { merge: true }
    ),
    removeInvitation({ receiver: data.member, project: data.project }),
  ]);
}

export async function editProject(data) {
  const project = await getProjectById(data.projectId);

  if (project.userId !== data.userId) {
    throw new Error("You don't have access to edit this project.");
  }

  await setDoc(
    doc(projectCollection, data.projectId),
    {
      name: data.name,
      description: data.description,
      startingDate: data.startingDate,
      deadline: data.deadline,
    },
    { merge: true }
  );
}
