'use client';
import React, { useState } from 'react';
import Item from './item.js';

const ItemList = ({ items }) => {
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name

  // Function to group items by category
  const groupItemsByCategory = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    // Sort items within each category
    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  };

  let sortedItems;
  if (sortBy === 'name') {
    // Sort by name
    sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'category') {
    // Sort by category
    sortedItems = [...items].sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy === 'group') {
    // Group items by category and sort
    sortedItems = groupItemsByCategory(items);
  }

  return (
    <div className='m-4'>
      <div>
        <label className="text-white">Sort by:</label>
        <button
          onClick={() => setSortBy('name')}
          className={`p-1 m-2 w-28 ${sortBy === 'name' ? 'bg-orange-500' : 'bg-orange-700'}`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy('category')}
          className={`p-1 m-2 w-28 ${sortBy === 'category' ? 'bg-orange-500' : 'bg-orange-700'}`}
        >
          Category
        </button>
        <button
          onClick={() => setSortBy('group')}
          className={`p-1 m-2 w-28 ${sortBy === 'group' ? 'bg-orange-500' : 'bg-orange-700'}`}
        >
          Grouped Category
        </button>
      </div>

      {/* Render Items */}
      <ul>
        {sortBy === 'group' ? (
          // Render grouped items by category
          Object.keys(sortedItems).sort().map((category) => (
            <div key={category}>
              <h3 className="capitalize text-xl">{category}</h3>
              <ul>
                {sortedItems[category].map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          // Render sorted items by name or category
          sortedItems.map((item) => (
            <Item key={item.id} item={item} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
