import React from "react"
import "./style.css"
import Navbar from "../navbar/navbar"

const Layout = (props)=>{
  return (<div>
    <Navbar />
    <main>{props.children}</main>
  </div>)
   
}
export default Layout;