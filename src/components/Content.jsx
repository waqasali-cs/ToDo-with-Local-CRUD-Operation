import React from 'react'
import { useState } from 'react';
import ItemList from './ItemList';

export default function Content({items,handleCheck,handleDelete}) {


    return (
        <>
            {items.length ? (
                <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
            ) : (
                    <p>NO ITEMS</p>
            )}
      </>
      
  );
}

