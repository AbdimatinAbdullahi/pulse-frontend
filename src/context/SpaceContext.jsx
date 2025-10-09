import axios from "axios";
import { useAuth } from "./AuthContext";
import React, {
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";

import { useWebsocket } from "../hooks/useWebsockets";

const SpaceContext = createContext();

const initialState = {
  spaces: [],
  activespace: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    
    case "LOADSPACE":
      return { ...state, spaces: action.payload };
    
    case "NEW_SPACE":
      return { ...state, spaces: [...state.spaces] };
    
      case "SELECT_ACTIVE_SPACE":
      return {
        ...state,
        activespace: action.payload,
      };

    case "NEW_INVITATION":
      return {
        ...state,
        activespace: {
          ...state.activespace,
          Invitations: [
            ...(state.activespace?.Invitations || []),
            action.payload,
          ],
        },
      };

    case "NEW_MEETING":
      return {
        ...state,
        activespace: {
          ...state.activespace,
          TodaysMeetings: [
            ...(state.activespace?.TodaysMeetings || []),
            action.payload,
          ],
        },
      };

    case "CANCEL_INVITE":
      return {
        ...state,
        activespace: {
          ...state.activespace,
          Invitations: state.activespace?.Invitations?.filter((invite) => {
            const inviteUserId = invite?.id;
            return inviteUserId !== action.payload.user;
          }),
        },
      };

    // Its only coming to those who are active in the space: so if spaces > 0 select the first one else null
    case "DELETED_SPACE":
      
      const deletedSpace = action.payload.space_id;
      
      const updatedSpaces = state.spaces.filter(space => space.Space.id !== deletedSpace);
      
      console.log("Updates spaces: ", updatedSpaces)
      
      return {
        ...state,
        spaces: updatedSpaces,
        activespace: updatedSpaces.length > 0 ? updatedSpaces[0] : null
      }
  
    // Just removing user from spaces for others who are online
    case "LEAVE_SPACE_REMOVE_MEMBER":

      if(!state.activespace) return { ...state }
      
      const leavingUser = action.payload.user_id

      const updatedMembers = state.activespace.Members.filter(member => member.id !== leavingUser)

      return {
        ...state,
        
        activespace :{
        
          ...state.activespace,
        
          Members : updatedMembers
        
        }
      }
    
    // Remove space from my spaces only me not others
    case "LEAVE_SPACE_REMOVE_SPACE":
      
      const leavingSpaceid = action.payload

      const updatedSpacesLeave = state.spaces.filter(space => space.Space.id !== leavingSpaceid)

      const isActivespaceRemoved = state.activespace.Space.id === leavingSpaceid;


      return {

        ...state,
        
        spaces : updatedSpacesLeave,
        
        activespace: isActivespaceRemoved ? updatedSpacesLeave.length > 0 ? updatedSpacesLeave[0] : null : state.activespace
      
      }
    
      case "ACCEPT_INVITATION": {
        const invitationId = action.payload.payload.invitationID
        const newMember = action.payload.payload.user // this should be a single user object or an array, we’ll handle both safely

        // Ensure activespace exists and has Invitations array
        const updatedInvitations = state.activespace?.Invitations
          ? state.activespace.Invitations.filter(invite => invite.id !== invitationId)
          : []

        // Ensure Members exists before adding
        const updatedMembers = Array.isArray(newMember)
          ? [...state.activespace.Members, ...newMember]
          : [...state.activespace.Members, newMember]
          

        return {
          ...state,
          activespace: {
            ...state.activespace,
            Invitations: updatedInvitations,
            Members: updatedMembers,
          },
        }
      }
    
    case "REMOVE_USER_FROM_SPACE":

      const removedID = action.payload.user_id

      const updatedMembersAfterRemove = state.activespace.Members.filter(member => member.id !== removedID)

      return {
        ...state,
        activespace: {
          ...state.activespace,
          Members: updatedMembersAfterRemove
        }
      }

      
  }
};


const room_url_services = import.meta.env.VITE_ROOM_SERVICE_URL;

export const SpaceContextProvider = ({ children }) => {
  
  const { user } = useAuth();
  
  const user_id = user.id;
  
  const user_name = user.fullname;
  
  const [state, dispatch] = useReducer(reducer, initialState);  


  const handleIncomingInvitation = (data) => {
    dispatch({ type: "NEW_INVITATION", payload: data });
  };

  const handleIncomingMeeting = (data) => {
    console.log("Incoming meeting", data);
    dispatch({ type: "NEW_MEETING", payload: data });
  };

  const handleCancelInvite = (data) => {
    dispatch({ type: "CANCEL_INVITE", payload: data });
  };

  const handleLeave = (data) => {
    console.log("Incoming data for leave space: ", data);
    dispatch({ type: "LEAVE_SPACE_REMOVE_MEMBER", payload: data });
  };

  const handleDelete = (data) => {
    dispatch({ type: "DELETED_SPACE", payload: data });
  };

  const handleAccept = (data) =>{
    dispatch({ type: "ACCEPT_INVITATION", payload: data })
  }

  const handleRemoveUser = (data) =>{
    dispatch({ type:"REMOVE_USER_FROM_SPACE", payload: data })
  }

  const {
    sendNewMeeting,
    sendNewInvitation,
    sendCancelInvitation,
    sendLeaveSpace,
    sendDelete,
    sendAcceptInvitation,
    sendRemoveUser
  } = useWebsocket(
    user_id,
    state.activespace?.Space?.id,
    handleIncomingMeeting,
    handleIncomingInvitation,
    handleCancelInvite,
    handleLeave,
    handleDelete,
    handleAccept,
    handleRemoveUser
  );

  useEffect(() => {
    const InitialFetch = async (userId) => {
      if (userId == "") {
        return;
      }

      try {
        const initialFetchRes = await axios.get(
          `${room_url_services}/initial-fetch?uuid=${userId}`
        );
        if (initialFetchRes.status == 200) {
          console.log("First space: ", initialFetchRes.data[0]);
          dispatch({ type: "LOADSPACE", payload: initialFetchRes.data });
          dispatch({
            type: "SELECT_ACTIVE_SPACE",
            payload: initialFetchRes.data[0],
          });
        }
      } catch (error) {
        console.error("Error loading the spaces", error);
      }
    };

    InitialFetch(user_id);
  }, [user_id]);

  const HandleSpaceCreate = async (name, description) => {
    try {
      const spaceCreateRes = await axios.post(
        `${room_url_services}/create-space`,
        {
          name: name,
          creator: user_id,
          description: description,
        }
      );

      if (spaceCreateRes.status == 200) {
        console.log("Sapce Created: ", spaceCreateRes);
        dispatch({ type: "NEW_SPACE", payload: spaceCreateRes.data });
      }

      return { sucess: true };
    } catch (error) {
      if (error?.response?.status == 409) {
        return { success: false, message: "You already have existing space" };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    }
  };

  const handleCreateNewMeeting = async (data) => {
    const {
      meetingName,
      meetingStart,
      meetingEndUT,
      whoCanPresent,
      whoCanJoin,
      passCode,
    } = data;
    try {
      const createMeetingRes = await axios.post(
        `${room_url_services}/create-meeting`,
        {
          name: meetingName,
          startTime: meetingStart,
          endTime: meetingEndUT,
          present: whoCanPresent,
          creator: user_id,
          spaceID: state.activespace?.Space?.id,
          passCode: passCode,
          private: whoCanJoin == "everyone" ? false : true,
        }
      );

      if (createMeetingRes.status == 200) {
        // send into websocket connection
        sendNewMeeting(createMeetingRes.data);
        return { success: true };
      }
    } catch (error) {
      console.log("Error creating meeting: ", error);
      return { success: false };
    }
  };

  const handleSendInvitation = async (email, role) => {
    console.log("SEnding email and role: ", email, role);
    try {
      const createInvitationRes = await axios.post(
        `${room_url_services}/create-invitation`,
        {
          email: email,
          role: role,
          space: state.activespace?.Space?.id,
          inviter: user_id,
        }
      );
      console.log(createInvitationRes);

      if (createInvitationRes.status == 200) {
        sendNewInvitation(createInvitationRes.data);
        return { success: true };
      }
    } catch (error) {
      return { success: false };
    }
  };

  const hanleCancelInvitation = async (id) => {
    try {
      const cancelInvitationRes = await axios.post(
        `${room_url_services}/cancel-invitation`,
        {
          user_id: id,
          cancelor_id: user_id,
          space: state.activespace?.Space?.id,
        }
      );

      if (cancelInvitationRes.status == 200) {
        const { space, user } = cancelInvitationRes.data;
        sendCancelInvitation({ space, user });
        return { success: true };
      }
    } catch (error) {
      return { success: false };
    }
  };

  const handleDeleteWorkspace = async (space_id, user_id) => {
    if (space_id == "") {
      console.warn("Space id not provideed");
      return;
    }
    try {
      const deleteRes = await axios.post(`${room_url_services}/delete-space`, {
        space_id: space_id,
        user_id: user_id,
      });
      if (deleteRes.status == 200) {
        console.log("delete space response: ", deleteRes);
        // send the space id to Websocket
        sendDelete(deleteRes.data);
        return { success: true };
      }
    } catch (error) {
      console.error("Failed to delete workspace: ", error);
      return { success: false };
    }
  };

  const handleLeaveWorkspace = async (space_id) => {
    console.log("Incoming space id: ", space_id);
    try {
      const leaveRes = await axios.post(`${room_url_services}/leave-space`, {
        space_id: space_id,
        user_id: user_id,
      });
      
      if (leaveRes.status == 200) {
        console.log("Leave resonse : ", leaveRes.data);
        // dispatch remove space
        dispatch({type: "LEAVE_SPACE_REMOVE_SPACE", payload: leaveRes.data.space_id})  
        // Remove him from members for those active in that group
        sendLeaveSpace(leaveRes.data);
        return { success: true };
      }
    } catch (error) {
      return { success: false };
    }
  };

  const handleAcceptInvitation = async (code) => {
    try {
      const acceptInvitationRes = await axios.post(
        `${room_url_services}/accept-invitation`,
        {
          code: code,
          email: user.email,
          user: user_id,
          name: user_name,
        }
      );

      if (acceptInvitationRes.status == 200) {
        console.log("Invitation data: ", acceptInvitationRes.data);
        sendAcceptInvitation(acceptInvitationRes.data)
        return { success: true };
      }
    } catch (error) {
      console.error("Error while sending invitation: ", error);
      return { success: false };
    }
  };

  const handleRemoveMemberFromSpace = async (user_id, space_id, remover_id)=>{
    console.log("UserID: ", user_id)
    console.log("spaceid: ", space_id)
    console.log("removerid: ", remover_id)
    try {
      const removeRes = await axios.post(`${room_url_services}/remove-member`,{
        "space_id" : space_id,
        "user_id" : user_id,
        "remover_id" : remover_id
      })

      if(removeRes.status == 200){
        console.log("Remove response data: ", removeRes.data)
        sendRemoveUser(removeRes.data)
      }

      return { success: true}

    } catch (error) {
      console.error("Error removing the member from the space: ", error)
      return { success: false}
    }
  } 

  return (
    <SpaceContext.Provider
      value={{
        state,
        dispatch,
        HandleSpaceCreate,
        handleCreateNewMeeting,
        handleSendInvitation,
        hanleCancelInvitation,
        handleAcceptInvitation,
        handleLeaveWorkspace,
        handleDeleteWorkspace,
        handleRemoveMemberFromSpace
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpace = () => useContext(SpaceContext);
