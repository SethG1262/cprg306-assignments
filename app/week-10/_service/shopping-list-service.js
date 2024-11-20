// _services/shopping-list-service.js

import { db } from "../_utils/firebase"; // Import Firestore instance from firebase.js
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Function to get all items for a specific user from Firestore
export const getItems = async (userId) => {
  try {
    const itemsRef = collection(db, `users/${userId}/items`);
    const q = query(itemsRef);
    const querySnapshot = await getDocs(q);

    // Map through each document in the query snapshot and extract the data along with its ID
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error fetching items: ", error);
    return [];
  }
};

// Function to add a new item to Firestore for a specific user
export const addItem = async (userId, item) => {
  try {
    const itemsRef = collection(db, `users/${userId}/items`);
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item: ", error);
  }
};