import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const USER = "users";

export const userCollection = collection(db, USER);

export async function getUserByEmail(email) {
  const { docs } = await getDocs(
    query(userCollection, where("email", "==", email))
  );

  if (!docs.length) {
    throw new Error("User not found!");
  }

  const doc = docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  };
}

export async function getUserById(id) {
  const userDoc = await getDoc(doc(db, USER, id));
  return userDoc.data();
}

export async function updateUser(userId, userData) {
  await setDoc(doc(userCollection, userId), userData, { merge: true });
  await updateProfile(auth.currentUser, { displayName: userData.username });
}
export async function deleteUserAccount(userId) {
  await deleteDoc(doc(userCollection, userId));
  await auth.currentUser.delete();
}