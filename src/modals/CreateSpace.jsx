import React, { useState } from "react";
import style from "../styles/modals/create.module.css";


import Spinner from "../components/Spinner";
import Toastify from "./Toastify";


function CreateSpace({ onClose }) {

  const [loading, setLoading] = useState(false)
  const [errorCreate, setErrorCreate] = useState("")
  const [newSpaceDetails, setNewSpaceDetails] = useState({
    name: "",
    description: ""
  })

  const handleCreateSpace = ()=>{
    if(newSpaceDetails.name == ""){
      setErrorCreate("Provide the name of the space")
      return
    }

    if(newSpaceDetails.name.trim().length < 10){
      setErrorCreate("Characters in names of space must be greater that 10")
      return
    }

    if(newSpaceDetails.description == ""){
      setErrorCreate("Provide the description of the space")
      return
    }

    if (newSpaceDetails.description.trim().length < 20){
      setErrorCreate("Description must be greater that 20 characters")
      return
    }

    setLoading(true)
    setTimeout(() => {
        setLoading(false) 
        setErrorCreate("")
    }, 10000);

  }

  return (
    <div className={style.modalOverLay}>
      <div className={style.modalContainer}>
        
        <div className={style.header}>
          <h2>Create</h2>
          <div className={style.close} onClick={onClose} > Close </div>
        </div>

        { errorCreate !== "" && (
            <Toastify type="error" message={errorCreate} onClose={()=>setErrorCreate("")} /> 
            )}

        <div className={style.inputContainer}>
          <h3>Space Name</h3>
          <input type="text" placeholder="Space name" value={newSpaceDetails.name} onChange={(e)=>setNewSpaceDetails({...newSpaceDetails, name: e.target.value})} />
        </div>

        <div className={style.description}>
          <h3>Description</h3>
            <textarea value={newSpaceDetails.description} onChange={(e)=>setNewSpaceDetails({ ...newSpaceDetails, description: e.target.value })} placeholder="Enter the description here" />
        </div>

        <div className={style.createSpace} onClick={handleCreateSpace} > 
            { !loading ? "Create" : <Spinner/> }
        </div>   
      </div>
    </div>
  );
}

export default CreateSpace;
