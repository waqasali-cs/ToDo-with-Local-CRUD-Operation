import React from 'react'

export default function Footer() {
    const today = new Date()
    
  return (
      <footer>
          <p>Copyright  &copy; {today.getFullYear()} - All rights reserved.</p>
    </footer>
  )
}
