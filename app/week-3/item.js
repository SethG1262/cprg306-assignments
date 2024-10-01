export default function Item({ name, quantity, category }) {
  return (
    <li className="p-2 m-4 bg-slate-900 max-w-sm">
      <div>
        <span className="font-bold text-lg">{name || 'Unknown Item'}</span>
        <p className="text-sm text-gray-400">Buy {quantity} in {category}</p>
      </div>
    </li>
  );
}
