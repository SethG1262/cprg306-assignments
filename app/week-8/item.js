export default function Item({ item, onSelect }) {
  return (
      <li
          className="p-2 m-4 bg-slate-900 max-w-sm cursor-pointer"
          onClick={() => onSelect(item)}
      >
          <h2 className="text-xl font-bold">{item.name || 'Unknown Item'}</h2>
          <div className="text-sm">
              Buy {item.quantity} in {item.category}
          </div>
      </li>
  );
}
