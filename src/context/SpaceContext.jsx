import axios from "axios";
import { useAuth } from "./AuthContext";
import React, {useState, useEffect, useReducer, useContext, createContext, use} from "react";

import { useWebsocket } from '../hooks/useWebsockets'
import { data } from "react-router-dom";

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
            return {...state, spaces: [ ...state.spaces ]}
        case "SELECT_ACTIVE_SPACE":
            return {...state, activespace: action.payload}
        
        case "NEW_INVITATION":
            return {
                ...state,
                activespace: {
                ...state.activespace,
                Invitations: [
                    ...(state.activespace?.Invitations || []),
                    action.payload
                ]
                }
            }

        case "NEW_MEETING":
            return {
                ...state,
                activespace: {
                ...state.activespace,
                TodaysMeetings: [
                    ...(state.activespace?.TodaysMeetings || []),
                    action.payload
                ]
                }
            }
        case "CANCEL_INVITE":
            return {
                ...state,
                activespace: {
                ...state.activespace,
                Invitations: state.activespace?.Invitations?.filter(invite => {
                    const inviteUserId = invite?.id
                    return inviteUserId !== action.payload.user
                })
                }
            }
        
        case "ACCEPT_INVITATION":
            console.log("Incoming accept payload: ", action.payload)
            return {
                ...state,
                activespace: {
                    ...state.activespace,
                    Members : [
                        ...(state.activespace?.TodaysMeetings || []),
                        action.payload
                    ],
                    Invitations: state.activespace?.Invitations?.filter(invite => {
                        return invite?.id !== action.payload.user_id
                    })

                }
            }

        case "LEAVE_SPACE":
            console.log("Incoming leave space ", action.payload)
            return {
                ...state,
                activespace: {
                    ...state.activespace,
                    Members: (state.activespace?.Members || []).filter(
                        member => member.id !== action.payload.user_id
                        )

                }
            }


    }
}

const room_url_services = import.meta.env.VITE_ROOM_SERVICE_URL


export const SpaceContextProvider = ({ children })=>{

    const { user } = useAuth()
    const user_id = user.id;
    const user_name = user.fullname;
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const handleIncomingInvitation = (data)=>{
        dispatch({ type: "NEW_INVITATION", payload: data })
    }

    const handleIncomingMeeting = (data)=>{
        console.log("Incoming meeting", data)
        dispatch({ type: "NEW_MEETING", payload: data })
    }

    const handleCancelInvite = (data)=>{
        dispatch({ type: "CANCEL_INVITE", payload: data })
    }

    const handleAccept = (data) =>{
        console.log("INcoming accept", data)
        dispatch({ type: "ACCEPT_INVITATION", payload: data })
    }


    const handleLeave = (data) =>{
        console.log("Incoming data for leave space: ", data)
        dispatch({ type: "LEAVE_SPACE", payload: data })
    }


    const { sendNewMeeting, sendNewInvitation, sendCancelInvitation, sendAcceptInvitation, sendLeaveSpace} = useWebsocket(user_id, state.activespace?.Space?.id, handleIncomingMeeting, handleIncomingInvitation, handleCancelInvite, handleAccept, handleLeave)
    

    useEffect(()=>{
        const InitialFetch = async (userId)=>{

            if(userId == ""){
                return
            }


            try {
                const initialFetchRes = await axios.get(`${room_url_services}/initial-fetch?uuid=${userId}`)
                if(initialFetchRes.status == 200){
                    console.log("First space: ", initialFetchRes.data[0])
                    dispatch({type: "LOADSPACE", payload: initialFetchRes.data})
                    dispatch({ type: "SELECT_ACTIVE_SPACE", payload: initialFetchRes.data[0] })
                }
            } catch (error) {
                console.error("Error loading the spaces", error)
            }


        }

        InitialFetch(user_id)

    }, [ user_id ])


    const HandleSpaceCreate = async( name, description ) => {
        try {
            const spaceCreateRes = await axios.post(`${room_url_services}/create-space`,{
               name: name,
               creator: user_id,
               description: description 
            })

            if(spaceCreateRes.status == 200){
                console.log("Sapce Created: ", spaceCreateRes)
                dispatch({type: "NEW_SPACE", payload: spaceCreateRes.data})
            }

            return { sucess: true }

        } catch (error) {
            if(error?.response?.status == 409){
                return { success: false, message: "You already have existing space" }
            }  else {
                return { success: false, message: "Something went wrong" }
            } 
        }
    }

    
    const handleCreateNewMeeting = async (data) => {
        const { meetingName, meetingStart, meetingEndUT, whoCanPresent, whoCanJoin, passCode } = data
        try {
            const createMeetingRes = await axios.post(`${room_url_services}/create-meeting`, {
                name: meetingName,
                startTime: meetingStart,
                endTime: meetingEndUT,
                present: whoCanPresent,
                creator: user_id,
                spaceID: state.activespace?.Space?.id,
                passCode:passCode,
                private: whoCanJoin == "everyone" ? false : true
            })

            if (createMeetingRes.status == 200){                
                // send into websocket connection
                sendNewMeeting(createMeetingRes.data)
                return { success: true }
            }

       } catch (error) {
        console.log("Error creating meeting: ", error)
        return { success: false }
       }
    }

    const handleSendInvitation = async (email, role)=>{
        console.log("SEnding email and role: ", email, role)
        try {
            const createInvitationRes = await axios.post(`${room_url_services}/create-invitation`,{
                email: email,
                role: role,
                space: state.activespace?.Space?.id,
                inviter: user_id
            })
            console.log(createInvitationRes)

            if(createInvitationRes.status == 200){
                sendNewInvitation(createInvitationRes.data)
                return { success : true }
            }

        } catch (error) {
            return { success: false }
        }
    }

    const hanleCancelInvitation = async (id)=>{
        try {
            const cancelInvitationRes = await axios.post(`${room_url_services}/cancel-invitation`, {
                user_id: id,
                cancelor_id: user_id,
                space:state.activespace?.Space?.id
            })

            if(cancelInvitationRes.status == 200){
                const { space, user } = cancelInvitationRes.data
                sendCancelInvitation({space, user })
                return { success : true }
            }

        } catch (error) {
            return { success: false }
        }
    }

    const handleDeleteWorkspace = async ()=>{
        try {
            const deleteRes = await axios.delete(`${room_url_services}.delete-space?uuid=${user_id}&space=${state.activespace?.Space?.id}`)
            if(deleteRes.status == 200){
                return { success: true }
            }
        } catch (error) {
            console.error("Failed to delete workspace: ", error)
            return { success: false }
        }
    }

    const handleLeaveWorkspace = async (space_id)=>{
        console.log("Incoming space id: ", space_id)
        try {
            const leaveRes = await axios.post(`${room_url_services}/leave-space`,{
                "space_id" : space_id,
                "user_id" : user_id
            })
            if(leaveRes.status == 200){
                console.log("Leave resonse : ", leaveRes.data)
                sendLeaveSpace(leaveRes.data)
                return { success: true }
            }
        } catch (error) {
            return { success: false }
        }
    }

    const handleAcceptInvitation = async (code)=>{
        console.log("Email ", user.email)
        console.log("Code ", code)
        console.log("Name: ", user_name)
        console.log("ID: ", user_id)
        try {
            const acceptInvitationRes = await axios.post(`${room_url_services}/accept-invitation`,{
                code: code,
                email: user.email,
                user: user_id,
                name : user_name
            })

            if(acceptInvitationRes.status == 200){
                console.log("Invitation data: ", acceptInvitationRes.data)
                sendAcceptInvitation(acceptInvitationRes.data)
                return { success : true }
            }

        } catch (error) {
            console.error("Error while sending invitation: ", error)
            return { success: false}
        }
    }

    


    return (
        <SpaceContext.Provider value={{ state, dispatch, HandleSpaceCreate, handleCreateNewMeeting, handleSendInvitation
                                        ,hanleCancelInvitation, handleAcceptInvitation, handleLeaveWorkspace

        }} >
            { children }
        </SpaceContext.Provider>
)
}

export const useSpace = () => useContext(SpaceContext)