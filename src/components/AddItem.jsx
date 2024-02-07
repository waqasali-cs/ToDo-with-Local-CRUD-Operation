import React from 'react'
import { useState,useRef} from 'react';

export default function AddItem({inputItem,setInputItem,handleSubmit}) {

 const inputRef=useRef()

    return (
        <form action="" className='addForm' onSubmit={handleSubmit}>
            {/* <label htmlFor="addItem">Add Item</label> */}
            <input
                type="text"
                autoFocus
                ref={inputRef}
                placeholder='Add Item'
                id='addItem'
                required
                value={inputItem}
                onChange={(e)=>setInputItem(e.target.value)}
            />
            <button aria-label='Add item' onClick={() => { inputRef.current.focus() }}>ADD</button>
      </form>
  )
}
