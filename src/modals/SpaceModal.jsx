import React, { useState } from "react";
import style from "../styles/modals/spacemodal.module.css";

import {
  Activity,
  CircleOff,
  Hourglass,
  Settings,
  Trash,
  UserPlus,
  X,
} from "lucide-react";

import Timezone from "../components/modals/Timezone";
import Invite from "../components/modals/Invite";
import Member from "../components/modals/EachMember";
import EachMember from "../components/modals/EachMember";


function SpaceModal({ onClose }) {
  const [members, setMembers] = useState([1, 2, 3]);
  const [invitations, setInvitations] = useState([1, 2, 3]);

  return (
    <div className={style.overLay}>
      <div className={style.spaceModalContainer}>
        
        <div className={style.headerBar}>
          <div className={style.spaceSetings}>
            <div className={style.spaceIcon}>
              <Activity size={30} strokeWidth={2.5} />
            </div>

            <div className={style.spaceName}>Space One</div>

            <div className={style.settings}>Settings</div>
          </div>

          <div onClick={onClose} className={style.close}>
            {" "}
            Close{" "}
          </div>
        </div>

        {/* Time Zone Header */}
        <Timezone />

        {/* Space Members */}
        <div className={style.spaceMembers}>
          <h3> Space Members </h3>
         {members.length > 0 ? (
            members.map((member) => (
            <EachMember/>
            ))
          ) : (
            <div className={style.noMember}>
              <CircleOff size={50} style={{ color: "#9900cc" }} />
              <span> No Members yet </span>
            </div>
          )}
        </div>


        {/* Space Invitations */}
        <div className={style.invitations}>
          <h3> Invitations </h3>
          {invitations.length > 0 ? (
            invitations.map((invite) => (
            <Invite/>
            ))
          ) : (
            <div className={style.noMember}>
              <CircleOff size={50} style={{ color: "#9900cc" }} />
              No Pending Invitations
            </div>
          )}
        </div>

        {/* Invite Container */}
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
              <option value="" hidden selected > Select the role of invitee </option>
              <option value="admin"> Admin </option>
              <option value="member"> member </option>
            </select>
          </div>

          <div className={style.inviteButton}>
            Invite
          </div>
        </div>


      </div>
    </div>
  );
}

export default SpaceModal;
