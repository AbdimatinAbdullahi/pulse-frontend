import React, { useState } from "react";
import style from "../styles/modals/spacemodal.module.css";

import { Activity, CircleOff } from "lucide-react";
import Timezone from "../components/modals/Timezone";
import Invite from "../components/modals/Invite";
import EachMember from "../components/modals/EachMember";
import Inviter from "../components/modals/Inviter";
import { useSpace } from "../context/SpaceContext";


function SpaceModal({ onClose }) {
  const { state } = useSpace()
  const { activespace } = state;

  const { Members, Invitations } = activespace

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


        {/* Space Members */}
        <div className={style.spaceMembers}>
          <h3> Members </h3>
         {Members.length > 0 ? (
            Members.map((member, index) => (
            <EachMember member={member} />
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
          {Invitations.length > 0 ? (
            Invitations.map((invite) => (
            <Invite invite={invite}/>
            ))
          ) : (
            <div className={style.noMember}>
              <CircleOff size={50} style={{ color: "#9900cc" }} />
              No Pending Invitations
            </div>
          )}
        </div>

        {/* Invite Container */}
        <Inviter/>

      </div>
    </div>
  );
}

export default SpaceModal;
