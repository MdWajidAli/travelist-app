import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Packinglist from "./Packinglist";
import  Stats  from "./Stats";

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
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all the list items"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdditems} />
      <Packinglist
        items={items}
        onDeleteitem={handleDeleteitems}
        onToggleitems={handleToggleItem}
        onClearList={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
