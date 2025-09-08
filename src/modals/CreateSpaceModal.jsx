import React, { useEffect, useState } from 'react'
import style from '../styles/modals/createspace.module.css'
import { X } from 'lucide-react'
import { useSpaceContext } from '../context/SpaceContext'
import { useAuth } from '../context/AuthContext'
function CreateSpaceModal({ onClose }) {

  const [ spaceName, setSpaceName] = useState("")
  const [ loading, setLoading] = useState(false)
  const [ spaceDescription, setSpaceDescription] = useState("")
  const [ successMessage, setsuccessMessage] = useState("")
  const [ errorMessage, seterrorMessage] = useState("")

  const { CreateWorkspace } = useSpaceContext()
  const { user } = useAuth()
  const { id } = user;

  const isFormValid = spaceDescription !== "" && spaceName !== ""

  async function handleCreateWorkspace(){
    setLoading(true)
    const result = await CreateWorkspace({ name: spaceName, description: spaceDescription, creator: id })
    setLoading(false)
    console.log("Result of check space: ", result)
    if(result.success){
        setsuccessMessage("Space create successfully")
        setTimeout(()=>{
          onClose()
        }, 5000)
    } else {
      seterrorMessage("Something went wrong")
      setTimeout(() => {
        onClose()
      }, 3000);
    }
  }

  return (
    <div className={style.createSpaceModalOverlay} >
      <div className={style.createSpaceContainer}>

          {successMessage !== "" && (
            <div className={style.successMessage}> 
              {successMessage}
            </div>
          )}

          {
            errorMessage !== "" && (
              <div className={style.errorMessage}> {errorMessage} </div>
            )
          }

          <X className={style.closeIcon} onClick={onClose} size={30} />
          
            <div className={style.pulseHeader}>
              <span>
                Welcome to Pulse Meet — where meetings are simplified with seamless team chats, 
                smart scheduling, and collaborative workspaces. Stay connected, 
                stay productive, and make every meeting count!
              </span>
            </div>
            
            <div className={style.spaceName}>
              <input type="text" placeholder='Enter space name' value={spaceName} onChange={(e)=>setSpaceName(e.target.value)} />
            </div>
            
            <div className={style.spaceDescription}>
              <textarea placeholder='Enter description of your space' value={spaceDescription} onChange={(e)=> setSpaceDescription(e.target.value)} />
            </div>

            <button disabled={!isFormValid || loading} style={ !isFormValid || loading ? {backgroundColor: "gray"} : {  } } onClick={handleCreateWorkspace}> Create Workspace </button>

        </div>

      </div>
  )
}

export default CreateSpaceModal