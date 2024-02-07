import React from 'react'

export default function ItemList({items,handleCheck, handleDelete}) {
  return (
    <ul>
      {items.map((item) => (
        <li className="item" key={item.id}>
          <input
            type="checkbox"
            onChange={() => handleCheck(item.id)}
            checked={item.checked}
          />
          <label
            style={item.checked ? { textDecoration: "line-through" } : null}
          >
            {item.item}
          </label>
          <button onClick={() => handleDelete(item.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}
