'use client';

import { useState } from 'react';

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className=" p-2 m-5 bg-white text-white w-36">
            <div className="flex justify-between">
                <span className="text-black">{quantity}</span>
                <div className= "flex">
                <button
                    type="button"
                    onClick={decrement}
                    disabled={quantity === 1}
                    className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disable:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    -
                </button>
                <button
                    type="button"
                    onClick={increment}
                    disabled={quantity === 20}
                    className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disable:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    +
                </button>

                </div>
            </div>
        </div>
    );
}
