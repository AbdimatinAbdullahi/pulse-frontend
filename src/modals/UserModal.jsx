import React, { useState } from 'react'
import style from '../styles/modals/user.module.css'
import { CircleOff, LogOut, Moon, SquarePen, Trash, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useSpace } from '../context/SpaceContext'
import { BackendToNowTime } from '../utils/times'
import Spinner from '../components/Spinner'

function UserModal({ onClose }) {

 
  const [ Code, setCode ] = useState("")
  const [ Loading, setLoading ] = useState(false)

  const { logout } = useAuth()
  const { handleAcceptInvitation, handleLeaveWorkspace, state } = useSpace()


  const { spaces } = state;

  const handleInvitation = async ()=>{

    if(Code.trim().length == 0) return

    setLoading(true)
    const result = await handleAcceptInvitation(Code)
    setLoading(false)
    if(result.success){
      alert("Invitation accepted")
    } else {
      alert("Invitation failed")
    }

  }

  const handleLeaveSpace = async (space_id)=>{
    setLoading(true)
    const result = await handleLeaveWorkspace(space_id)
    setLoading(false)
    if(result.success){
      alert("Left workspace!")
    } else {
      alert("faule to leave space")
    }
    
  }

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
                  <div className={style.spacecont} key={space.Space?.id} > 
                    
                    <div className={style.partOne} > 
                        <h3> {space.Space.name} </h3>
                        <span> {BackendToNowTime(space.Space.created_at)} </span>
                    </div>

                    <div className={style.partTow}  data-tooltip='Leave workspace' onClick={()=> handleLeaveSpace(space.Space?.id)} >
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
                  <div className={style.logoutIcon} onClick={logout} >
                    <LogOut/>
                  </div>

                  <h3> Logout </h3>

            </div>

            <div className={style.lgout2} >
                  <div className={style.logoutIcon}>
                    <SquarePen/>
                  </div>

                  <div className={style.inputContainer} >
                      <span> Paste the code sent to your email </span>
                      <input type="text" placeholder='Paste the code here' value={Code} onChange={(e)=>setCode(e.target.value)} />
                  </div>

                  
                  <div className={style.acceptButton} onClick={handleInvitation} >
                      { Loading ? <Spinner/> : "Join" }
                  </div>



            </div>


        </div>
    </div>
  )
}

export default UserModal