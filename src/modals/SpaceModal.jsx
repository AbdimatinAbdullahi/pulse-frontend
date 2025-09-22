import React, { useState } from 'react'
import style from '../styles/modals/spacemodal.module.css'
import { Activity, CircleOff, Hourglass, Settings, Trash, X } from 'lucide-react'

function SpaceModal({ onClose }) {

  const [Members, setMembers] = useState([])
  const [invitations, setInvitations] = useState([])

  return (
    <div className={style.overLay} >
        <div className={style.spaceModalContainer}>

            <div className={style.headerBar}> 
              
              <div className={style.spaceSetings}>

                  <div className={style.spaceIcon} >
                    <Activity size={30} strokeWidth={2.5} />
                  </div>
              
                  <div className={style.spaceName} >
                    Space One
                  </div>

                  <div className={style.settings} > 
                    Settings
                  </div>

              </div>

              <div onClick={onClose} className={style.close} > Close </div>

            </div> 


            <div className={style.timeZone}>
                <div className={style.icon}>
                  <Hourglass/>
                </div>

                <div className={style.section2}>
                    <h3>Time Zone</h3>
                    <span> The current time zone is: Nairobi GMT +3 </span>
                </div>

              <select>
                <option value=""> Select Time zone </option>
                <option value=""> Nairobi GMT +3 </option>
                <option value=""> Beiien GMT +12 </option>
                <option value=""> USA GMT -12 </option>
                <option value=""> Riyadh -3 </option>
              </select>

            </div>


            <div className={style.spaceMembers} >
              <h3> Space Members </h3>

              { Members.length > 0 ? Members.map((member)=>(
                  <div className={style.memberContainer} >
                      <div className={style.memberSecOne} >
                          <h3> Ramla Hussien </h3>
                          <span> Joined at 30 sep 2025 </span>
                      </div>

                      <div className={style.memberSecTwo}>
                        Admin
                      </div>

                      <div className={style.iconRemove}>
                        <Trash/>
                      </div>

                  </div>
              )): (
                <div className={style.noMember} >
                      <CircleOff size={50} style={{ color: "#9900cc" }}  />
                      <span> No Members yet </span>
                </div>
              )}

            </div>  

            

            <div className={style.invitations} >
              <h3> Invitations </h3>

                { invitations.length > 0 ? invitations.map((invite)=>(
                  <div className={style.memberContainer} >
                      <div className={style.memberSecOne} >
                          <h3> Ramla Hussien </h3>
                          <span> Joined at 30 sep 2025 </span>
                      </div>

                      <div className={style.memberSecTwo}>
                        Admin
                      </div>

                      <div className={style.iconRemove}>
                        <Trash/>
                      </div>

                  </div>
                )) : (
                  <div className={style.noMember} >
                    <CircleOff size={50} style={{ color: "#9900cc" }} />
                    No Pending Invitations
                  </div>
                ) }

              <button> Invite to space </button>
            </div>      
        
        </div>
    </div>
  )
}

export default SpaceModal