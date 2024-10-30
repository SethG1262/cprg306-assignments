"use client";

import { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';

export default function Page() {
  // Initialize state with items data
  const [items, setItems] = useState(itemsData);

  // Handler to add a new item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="bg-slate-950">
      <div className='m-4'>
        <h2 className="text-3xl font-bold m-2">Shopping List</h2>
        {/* New Item Form */}
        <NewItem onAddItem={handleAddItem} />
        {/* Display Item List */}
        <ItemList items={items} />
      </div>
    </main>
  );
}
