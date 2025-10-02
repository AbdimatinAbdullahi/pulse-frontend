import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import style from '../../styles/modals/inviter.module.css'
import { useSpace } from "../../context/SpaceContext";

function Inviter() {

  const [ email, setEmail] = useState("")
  const [ role, setRole] = useState("member")

  const { handleSendInvitation } = useSpace()

  const handleInvite = async () => {
    if(email == ""){
      alert("Provide email of invitee")
      return
    }
    if(role == ""){
      alert("Select the role please")
      return
    }

    const result = await handleSendInvitation(email, role)
    if(!result.success){
      alert("Invitation failed")
    }
  }


  return (
    <div className={style.inviteContainer}>
      <div className={style.icon}>
        <UserPlus />
      </div>

      <div className={style.section22}>
        <p>Enter the email of the person you want to invite</p>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter the email of person you want to invite"
        />
      </div>

      <div className={style.roleContainer}>
        <p>Select the role</p>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="" hidden selected>
            {" "}
            Select the role of invitee{" "}
          </option>
          <option value="admin"> Admin </option>
          <option value="member" selected > member </option>
        </select>
      </div>

      <div className={style.inviteButton} onClick={handleInvite} >Invite</div>
    </div>
  );
}

export default Inviter;
