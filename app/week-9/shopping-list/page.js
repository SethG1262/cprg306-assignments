"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context"; // Adjust path if needed
import ItemList from "../shopping-list/item-list"; // Adjust path as necessary
import NewItem from "../shopping-list/new-item"; // Adjust path as necessary
import MealIdeas from "../shopping-list/meal-ideas"; // Adjust path as necessary
import itemsData from "../shopping-list/items.json"; // Adjust path as necessary

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState(itemsData || []);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    // Redirect to landing page if user is not logged in
    if (!user) {
      router.push("/"); // Redirect to landing page or other route if not authenticated
    }
  }, [user, router]);

  // If user is not logged in, display a loading message
  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanName = item.name.split(",")[0].trim().replace(/[\u{1F600}-\u{1F64F}]/gu, "");
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
