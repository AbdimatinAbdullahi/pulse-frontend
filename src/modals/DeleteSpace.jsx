import React from 'react'
import style from '../styles/modals/deletemodal.module.css'
import { X } from 'lucide-react'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import Toastify from './Toastify'

function DeleteSpace() {
    
    const { closeModal } = useWorkspaceModal()
    const [ Loading, setLoading ] = useState(false)
    const [ Error, setError ] = useState("")
    const [ success, setSuccess] = useState("")

    const handleDeleteSpace = async ()=>{
        setLoading(true)
        setSuccess("Error deleting space")

        setTimeout(() => {
            setSuccess("")
            setLoading(false)
        }, 5000);
        
    }

  return (
    <div className={style.deleteModalOverlay} >
        <div className={style.deleteModalContainer}>
            
            <X size={30} onClick={()=>closeModal()} className={style.closeIcon} />

            { Error !== "" && <Toastify message="failed to delete space" type="error" /> } 
            { success !== "" && <Toastify message="space deleted successfully" type="success"/> }
            
            <h2>Delete workspace</h2>
            
            <span> Deleting workspace will result in loss of all meetings, members and invitation  and it is permanent.</span>
            
            <button onClick={handleDeleteSpace} > { Loading ? <Spinner/> : "Continue" } </button>
        
        </div>
    
    </div>
  )
}

export default DeleteSpace