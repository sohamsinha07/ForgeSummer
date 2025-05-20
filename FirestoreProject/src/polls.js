import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const POLL_DOC_ID = "3XZiLaIL8iUW1wyoqQ6d"; 
const pollDocRef = doc(db, "Poll", POLL_DOC_ID);

export async function getPoll() {
  const docSnap = await getDoc(pollDocRef);
  if (!docSnap.exists()) throw new Error("Poll not found");
  return docSnap.data();
}

export async function addResponse(newResponse) {
  const docSnap = await getDoc(pollDocRef);
  if (!docSnap.exists()) throw new Error("Poll not found");

  const currentResponses = docSnap.data().Responses || {};
  const newKey = `Option${Object.keys(currentResponses).length + 1}`;
  const updatedResponses = { ...currentResponses, [newKey]: newResponse };

  await updateDoc(pollDocRef, { Responses: updatedResponses });

  return updatedResponses;
}
