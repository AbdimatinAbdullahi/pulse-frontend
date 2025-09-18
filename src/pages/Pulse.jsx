import React from 'react'
import SideBar from '../components/SideBar'
import Space from '../components/Space'
import style from '../styles/pulse.module.css'


function Pulse() {
  return (
    <div className={style.pulseContainer} >
      <SideBar/>
      <Space/>
    </div>
  )
}

export default Pulse