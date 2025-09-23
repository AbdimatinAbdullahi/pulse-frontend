import React from "react";
import { UserPlus } from "lucide-react";
import style from '../../styles/modals/inviter.module.css'

function Inviter() {
  return (
    <div className={style.inviteContainer}>
      <div className={style.icon}>
        <UserPlus />
      </div>

      <div className={style.section22}>
        <p>Enter the email of the person you want to invite</p>
        <input
          type="text"
          placeholder="Enter the email of person you want to invite"
        />
      </div>

      <div className={style.roleContainer}>
        <p>Select the role</p>
        <select>
          <option value="" hidden selected>
            {" "}
            Select the role of invitee{" "}
          </option>
          <option value="admin"> Admin </option>
          <option value="member"> member </option>
        </select>
      </div>

      <div className={style.inviteButton}>Invite</div>
    </div>
  );
}

export default Inviter;
