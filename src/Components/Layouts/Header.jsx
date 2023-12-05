import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (

<div>
<nav className="navbar  bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand">Employees Data</a>
    <form className="d-flex" role="search">
   
      <Link className="btn btn-outline-success" to="/addrecord">
        Add New Record
      </Link>
    </form>
  </div>
</nav>
 
</div>
   
  )
}

export default Header