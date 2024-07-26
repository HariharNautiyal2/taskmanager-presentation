/**
 * These functions are helper functions which helps in converting
 * the data from DB form into more readable form which we can use on frontend
 */

import { getDoc } from "firebase/firestore";

export function parseProjectDoc(projectDoc) {
  const data = projectDoc.data();
  return {
    id: projectDoc.id,
    pid: projectDoc.id,
    ...data,
    creationDate: data.creationDate.toDate(), // converting firebase timestamp into Date
    //startingDate: data.startingDate.toDate(),
    deadline: data.deadline.toDate(),
  };
}


export function parseTaskDoc(taskDoc) {
  const data = taskDoc.data();

  return {
    id: taskDoc.id,
    ...data,
    creationDate: data.creationDate ? data.creationDate.toDate() : null,
    //startingDate: data.startingDate ? data.startingDate.toDate() : null,
    deadline: data.deadline ? data.deadline.toDate() : null,
  };
}

export async function parseInvite(inviteDoc) {
  const data = inviteDoc.data();

  const senderDoc = await getDoc(data.sender);
  const receiverDoc = await getDoc(data.receiver);
  const projectDoc = await getDoc(data.project);

  return {
    ...data,
    id: inviteDoc.id,
    createdAt: data.createdAt.toDate(),
    sender: {
      id: senderDoc.id,
      ...senderDoc.data(),
    },
    receiver: {
      id: receiverDoc.id,
      ...receiverDoc.data(),
    },
    project: {
      id: projectDoc.id,
      ...projectDoc.data(),
    },
  };
}
