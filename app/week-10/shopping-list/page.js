"use client";

import { useState, useEffect } from 'react';
import ItemList from './item-list.js';
import NewItem from './new-item.js';
import MealIdeas from './meal-ideas.js';
import { getItems, addItem } from '../_service/shopping-list-service.js'
import { useUserAuth } from '../_utils/auth-context.js'; // Correct import for the hook

export default function Page() {
  const { user } = useUserAuth(); // Correct hook usage
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  // Load items from Firestore when the component mounts
  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        const fetchedItems = await getItems(user.uid);
        setItems(fetchedItems);
      }
    };
    loadItems();
  }, [user]);

  // Handle adding a new item
  const handleAddItem = async (newItem) => {
    if (user) {
      const itemId = await addItem(user.uid, newItem);
      setItems((prevItems) => [...prevItems, { id: itemId, ...newItem }]);
    }
  };

  // Handle selecting an item for meal ideas
  const handleItemSelect = (item) => {
    const cleanName = item.name.split(',')[0].trim().replace(/[\u{1F600}-\u{1F64F}]/gu, '');
    setSelectedItemName(cleanName);
  };

  return (
    <main className="bg-slate-950 p-5">
      <div className="flex gap">
        <div>
          <h2 className="text-3xl font-bold mb-4">Shopping List</h2>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="flex-1 max-w-md">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
