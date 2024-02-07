import React from 'react'

export default function SearchItem({search,setSearch}) {
  return (
      <form action="" onSubmit={(e)=>e.preventDefault()}>
          <input
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder='Search'
              role='searchbox'
              id="search"
          />
          <button
              type='button'
              onClick={()=>setSearch('')}
          >
              clear</button>
    </form>
  )
}

