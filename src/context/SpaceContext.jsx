import axios from "axios";
import React, {useState, useEffect, useReducer, useContext, createContext} from "react";
import { useAuth } from "./AuthContext";


const SpaceContext = createContext()

const initialState = {
    spaces : [],
    activespace: null
}


const reducer = (state, action) => {
    switch(action.type){
        case "LOADSPACE":
            return { ...state, spaces:action.payload }
        case "NEW_SPACE":
            return {...state, spaces: [ ...state.spaces, ...payload.space ]}
        case "SELECT_ACTIVE_SPACE":
            return {...state, activespace: action.payload}
    }
}

const room_url_services = import.meta.env.VITE_ROOM_SERVICE_URL


export const SpaceContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const { user } = useAuth()
    const user_id = user.id
    console.log("User_id : ", user_id)

    useEffect(()=>{
        const InitialFetch = async (userId)=>{

            if(userId == ""){
                console.error("User id is not passed")
                return
            }

            try {
                const initialFetchRes = await axios.get(`${room_url_services}/initial-fetch?uuid=${userId}`)
                if(initialFetchRes.status == 200){
                    dispatch({type: "LOADSPACE", payload: initialFetchRes.data.spaces})
                }
            } catch (error) {
                console.error("Error loading the spaces", error)
            }
        }

        InitialFetch(user_id)

    }, [ user_id ])


    const HandleSpaceCreate = async( name, timezone, userid ) => {
        try {
            const spaceCreateRes = await axios.post(`${room_url_services}/create-space`,{
               name: name,
               creator: userid,
               timezone: timezone 
            })

            if(spaceCreateRes.status == 200){
                dispatch({type: "NEW_SPACE", payload: spaceCreateRes.data})
            }

            return { sucess: true }

        } catch (error) {
            if(error?.response?.status == 409){
                return { success: false, message: "You already have space" }
            }  else {
                return { success: false, message: "Something went wrong" }
            } 
        }
    }

    const HandleCreateMeeting = async ({ name, startTime, endTime, presentAllowed, }) => {
        try {
            const createMeetingRes = await axios.post(`${room_url_services}/create-meeting`, {
                name: name,
                StartTime: startTime,
                EndTime: endTime,
                PresentationAllowed: presentAllowed
            })

            if(createMeetingRes.status == 200){
                dispatch({type: "APPEND_MEETING", payload: createMeetingRes.data})
            }

            return { success: true }

        } catch (error) {
            return { success: false, message: "something went wrong while creating meeting" }
        }
    }


    const HandleChangeTimeZone = async ({ newTimeZone, spaceID }) =>{
        try {
            const changeTimeZoneRes = await axios.patch(`${room_url_services}/change-time-zone`,{
                NewTimeZone: newTimeZone,
                SpaceID : spaceID
            })
            
            return { success: true }

        } catch (error) {
            console.error("Error while changing time zone: ", error)
            return { success: false }
        }
    }

    const HandleLeaveWorkspace = async (spaceID) => {
        try {
            const leaveRes = await axios.post(`${room_url_services}/leave-space`,{
                UserID: user_id,
                SpaceID: spaceID
            })

            if(leaveRes.status == 200){
                dispatch({ type: "LEAVESPACE", payload: leaveRes.data.spaceID })
            }

        } catch (error) {
            console.error("Leave workspace failed: ", error)   
        }
    }


    const HandleInvite = async ({ email, role, spaceID }) => {
        try {
            const inviteRes = await axios.post(`${room_url_services}/invite-user`, {
                Email : email,
                Role: role,
                SpaceID: spaceID
            })

            if(inviteRes.status == 200){
                dispatch({ type: "NEW_INVITE", payload: inviteRes.data })
            }

            return { success: true }
            
        } catch (error) {
            console.error("Error inviting the user: ", error)
            return { success: false, message: "Unable to invite the user" }
        }
    }


    const HandleDeleteSpace = async ({ userid, spaceid })=>{
        try {
            const deleteRes = await axios.delete(`${room_url_services}/delete-space?spaceid=${spaceid}&uuid=${userid}`)
            if(deleteRes.status == 200){
                dispatch({ type: "DELETE_SPACE", payload: deleteRes.data })
            }

            return { success: true }

        } catch (error) {
            console.error("Error deleting space: ", error)
            return { success: false }
        }
    }


    const HandleRemoveUser = async ({ user_id, space_id, admin_id })=>{
        try {
            const removeRes = await axios.delete(`${room_url_services}/remove-user?uuid=${user_id}&adminid=${admin_id}&spaceid=${space_id}`)
            if(removeRes.status == 200){
                dispatch({ type: "REMOVE_MEMBER",  payload: removeRes.data})
            }
            return { success: true }
        } catch (error) {
            console.log("Error while removing user from space: ", error)
            return { success: false }
        }
    }

    const handleCancelInvite = async (userid, admin_id, space_id) => {
        try {
            const cancelInviteRes = await axios.post(`${room_url_services}/cancel-invite`, {
                UserID: userid,
                AdminID: admin_id,
                SpaceID: space_id
            })

            if(cancelInviteRes.status == 200){
                dispatch({ type: "CANCEL_INVITE", payload: cancelInviteRes.data })
            }

            return { success: true }

        } catch (error) {
            return { success: false }
        }
    }

    return (
        <SpaceContext.Provider value={{ state, dispatch, HandleSpaceCreate, HandleCreateMeeting }} >
            { children }
        </SpaceContext.Provider>
)
}

export const useSpace = () => useContext(SpaceContext)