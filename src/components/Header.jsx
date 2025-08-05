import React from 'react'
import './header.css'
export default function Header() {
  return (
    <div className='header'>
      <div className="container">
        <div className='header__inner'>
          <div className="header-logo">
            <img src="flyza.svg" width={150} alt="flyza" />
          </div>
          <div className="header-nav">
            <button>USD $</button>
            <button>Support</button>
          </div>
        </div>
      </div>
    </div>
  )
}
