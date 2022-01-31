import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Navbar(props) {
  console.log(props)
  return (
   <div>
<nav className='d-flex justify-content-between p-3 '>
  <ul className='list-unstyled d-flex '>
<li><i  class="fab fa-pied-piper-alt"></i>

</li>
  {
    props.loginUser ? <>
    
    <li className='px-2'><NavLink to='/home'> Home</NavLink> </li>
    <li className='px-2'><NavLink to='/Tvshows'> Tv</NavLink> </li>
    <li className='px-2'><NavLink to='/movies'> Movie</NavLink> </li>
    <li className='px-2'><NavLink to='/gallery'>Gallery</NavLink> </li>

    </>:''
  }


  
  </ul>
  <ul className='list-unstyled d-flex '>
  <li className='px-2'> <a href="https://www.instagram.com/"> <i className='fab fa-instagram'></i> </a> </li>
    <li className='px-2'> <a href="https://www.facebook.com/muhamed.mustafa.96780/"> <i className='fab fa-facebook'></i> </a> </li>
    <li className='px-2'> <a href="https://www.google.com/?hl=ar"> <i className='fab fa-twitter'></i> </a> </li>



   

{
  props.loginUser ? <><li onClick={props.logOut} className='px-2'> Logout  </li> </> : <>   <li className='px-2'><NavLink to='/register'> Register</NavLink> </li>
  <li className='px-2'><NavLink to='/login'> Login</NavLink> </li> </>
}


    
    
   
  </ul>
</nav>


   </div>

  
  )
}
