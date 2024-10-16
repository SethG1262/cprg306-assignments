'use client';

import { useState } from 'react';

export default function NewItem() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('Produce');

    const increment = () => {
        if (quantity < 99) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        const newItem = {
            name,
            quantity,
            category,
        };

       
        console.log(newItem);

        
        alert(`Item Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

        
        setName('');
        setQuantity(1);
        setCategory('Produce');
    };

    return (
        <form onSubmit={handleSubmit} className="p-2 m-4 bg-slate-900 text-black max-w-sm w-full">
                
                <div>
                    <input
                        placeholder='Item name'
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className='flex justify-between'>
                    <div className="flex justify-between w-36 bg-white p-2 rounded-md shadow-sm mt-4 mb-4">
                        <span className="text-gray-800">{quantity}</span>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={decrement}
                                disabled={quantity === 1}
                                className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                -
                            </button>
                            <button
                                type="button"
                                onClick={increment}
                                disabled={quantity === 99}
                                className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-3 mb-3 border-2 border-grey-300 p-2 rounded-lg font-sans"
                    >
                        <option value="Produce">Produce</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Meat">Meat</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Dry Goods">Dry Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Household">Household</option>
                        <option value="Other">Other</option>
                    </select>              
                </div>

                <button
                    type="submit"
                    className="w-full mt-2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    +
                </button>
            </form>
       
    );
}
