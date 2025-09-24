import React, { useState } from "react";
import style from "../styles/modals/create.module.css";


import Spinner from "../components/Spinner";
import Toastify from "./Toastify";


function CreateSpace({ onClose }) {

  const commonTimezones = [
    { label: "UTC", value: "Etc/UTC" },
    { label: "New York (US Eastern)", value: "America/New_York" },
    { label: "Los Angeles (US Pacific)", value: "America/Los_Angeles" },
    { label: "London (UK)", value: "Europe/London" },
    { label: "Berlin (Central Europe)", value: "Europe/Berlin" },
    { label: "Nairobi (East Africa)", value: "Africa/Nairobi" },
    { label: "Dubai (Gulf)", value: "Asia/Dubai" },
    { label: "Mumbai (India)", value: "Asia/Kolkata" },
    { label: "Singapore", value: "Asia/Singapore" },
    { label: "Tokyo (Japan)", value: "Asia/Tokyo" },
  ];

  const [loading, setLoading] = useState(false)
  const [errorCreate, setErrorCreate] = useState("Something went wrong")
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [newSpaceDetails, setNewSpaceDetails] = useState({
    name: "",
    timeZone: commonTimezones[0].value
  })

  const handleCreateSpace = ()=>{
    if(newSpaceDetails.name == ""){
      setErrorCreate("Provide the name of the space")
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

        <div className={style.timeZone}>
            <h3> Select time zone for your space </h3>
            <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            >
            {commonTimezones.map((timezone) => (
                <option value={timezone.value}> {timezone.label} </option>
            ))}
            </select>

        </div>

        <div className={style.createSpace} onClick={handleCreateSpace} > 
            { !loading ? "Create" : <Spinner/> }
        </div>   
      </div>
    </div>
  );
}

export default CreateSpace;
