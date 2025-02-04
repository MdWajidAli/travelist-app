import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAdditems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteitems(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) => 
      items.map((item) => 
    item.id === id ? {...item,packed : !item.packed} :item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdditems} />
      <Packinglist items={ items} onDeleteitem = {handleDeleteitems} onToggleitems={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem)

    onAddItems(newItem);

    setQuantity(1);
    setDescription("")
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need fro your 😍 trip ?</h3>
      <select value={quantity} onChange={(e) => (
        setQuantity(Number(e.target.value)))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Packinglist({items, onDeleteitem , onToggleitems}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteitem={onDeleteitem} key={item.id} onToggleitems={ onToggleitems} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item ,onDeleteitem, onToggleitems}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleitems(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteitem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) 
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
    </p>)

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100);

  return (
    <footer className="stats">

      <em>
        {percentage === 100 ? `You got everything! Ready to go ✈️` : 
        `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
      }
      </em>
    </footer>
  );
}
