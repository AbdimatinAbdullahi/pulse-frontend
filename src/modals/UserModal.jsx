import React, { useState } from 'react'
import style from '../styles/modals/user.module.css'
import { CircleOff, LogOut, Moon, Trash, X } from 'lucide-react'

function UserModal({ onClose }) {

  const [spaces, setspaces] = useState(["Space One", "Space two", "Space three"])
  // const [spaces, setspaces] = useState([])

  return (
    <div className={style.userOverLay} >
        <div className={style.userModalContainer} >

            <X onClick={onClose} className={style.icon} />


            <div className={style.themeContainer} >

                  <div className={style.IconTwo}>
                    <Moon/>  
                  </div>

                  <div className={style.secondPartOfTheTheme}> 
                    <span className={style.one} > Theme </span>
                    <span className={style.Two} > This will apply to all pages </span>
                  </div>
                  
                  <select>
                    <option value="light"> Light </option>
                    <option value="dark"> Dark </option>
                  </select>
                
            </div>

            <div className={style.spaces}>
                <h2> My spaces </h2>

                { spaces.length> 0 ? spaces.map((space)=>(
                  <div className={style.spacecont} > 
                    
                    <div className={style.partOne} > 
                        <h3> {space} </h3>
                        <span> Joined on Sep 30 2025 </span>
                    </div>

                    <div className={style.partTow}  data-tooltip='Leave workspace' >
                      <Trash size={30} />
                    </div>          

                  </div>
                )) : (
                  <div className={style.noSpace} >
                      <CircleOff size={70} />
                      <span> No space available </span>
                  </div>
                )}

            </div>

            <div className={style.lgout} >
                  <div className={style.logoutIcon}>
                    <LogOut/>
                  </div>

                  <h3> Logout </h3>

            </div>


        </div>
    </div>
  )
}

export default UserModal