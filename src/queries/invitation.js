import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getUserByEmail, getUserById, userCollection } from "./user";
import { parseInvite } from "../utils/parsers";
import { addMemberToProject, projectCollection } from "./project";

const INVITATION = "invitations";

const invitationCollection = collection(db, INVITATION);

export async function createInvitation(invite) {
  const receiver = await getUserByEmail(invite.receiverEmail);

  const senderDoc = doc(userCollection, invite.sender);
  const receiverDoc = doc(userCollection, receiver.id);
  const projectDoc = doc(projectCollection, invite.projectId);

  const alreadyPending = await getDocs(
    query(
      invitationCollection,
      and(
        where("sender", "==", senderDoc),
        where("receiver", "==", receiverDoc),
        where("project", "==", projectDoc)
      )
    )
  );

  if (alreadyPending.docs.length) {
    throw new Error("You have already invited this user.");
  }
  if (receiver.id === invite.sender) {
    throw new Error("You cannot invite yourself. ");
  }

  await addDoc(invitationCollection, {
    project: doc(projectCollection, invite.projectId),
    sender: senderDoc,
    receiver: receiverDoc,
    createdAt: new Date(),
    status: "PENDING",
  });
}

export async function getInvitations(userId) {
  const userDoc = doc(userCollection, userId);
  const { docs } = await getDocs(
    query(
      invitationCollection,
      or(
        where("sender", "==", userDoc),
        where("receiver", "==", userDoc)
      )
    )
  );

  return Promise.all(docs.map((doc) => parseInvite(doc)));
}

export async function getInviteById(id) {
  const inviteDoc = await getDoc(doc(db, INVITATION, id));
  return parseInvite(inviteDoc);
}

export async function acceptInvitation(invite) {
  const currentUser = await getUserById(invite.userId);
  const dbInvite = await getInviteById(invite.id);

  if (dbInvite.status !== "PENDING") {
    throw new Error("Invite is already updated.");
  }

  if (dbInvite.receiver.id !== currentUser.id) {
    throw new Error("You cannot accept this invitation");
  }

  await Promise.all([
    setDoc(
      doc(invitationCollection, invite.id),
      { status: "ACCEPTED" },
      { merge: true }
    ),
    addMemberToProject({
      project: dbInvite.project.id,
      member: currentUser.id,
    }),
  ]);
}

export async function rejectInvitation(invite) {
  const currentUser = await getUserById(invite.userId);
  const dbInvite = await getInviteById(invite.id);

  if (dbInvite.status !== "PENDING") {
    throw new Error("Invite is already updated.");
  }

  if (dbInvite.receiver.id !== currentUser.id) {
    throw new Error("You cannot reject this invitation");
  }

  await setDoc(
    doc(invitationCollection, invite.id),
    { status: "REJECTED" },
    { merge: true }
  );
}

export async function removeInvitation(invite) {
  const { docs } = await getDocs(
    query(
      invitationCollection,
      and(
        where("receiver", "==", doc(userCollection, invite.receiver)),
        where("project", "===", doc(projectCollection, invite.project))
      )
    )
  );

  if (!docs.length) {
    throw new Error("Invitation not found");
  }

  await deleteDoc(doc(invitationCollection, docs[0].id));
}

export async function deleteInvitation(invitationId) {
  const invitationDoc = doc(db, "invitations", invitationId);
  await deleteDoc(invitationDoc);
}
