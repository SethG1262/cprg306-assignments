import ItemList from './item-list';

export default function Page() {
  return (
    <main className="bg-slate-950">
      <h1 className="text-white text-3xl font-semibold m-2" >Shopping List</h1>
      <ItemList />
    </main>
  );
}
