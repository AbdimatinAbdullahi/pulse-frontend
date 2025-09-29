import axios from "axios";
import { useAuth } from "./AuthContext";
import React, {useState, useEffect, useReducer, useContext, createContext} from "react";

import { useWebsocket } from '../hooks/useWebsockets'

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
    }
}

const room_url_services = import.meta.env.VITE_ROOM_SERVICE_URL


export const SpaceContextProvider = ({ children })=>{

    const { user } = useAuth()
    const user_id = user.id
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const { sendNewMeeting, sendNewInvitation, } = useWebsocket(user_id, state.activespace?.Space?.id)
    

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

    
    const handleCreateNewMeeting = (data) => {
       console.log("Data for meeting arriving: ", data)
       sendNewMeeting(data)
    }

    const handleSendInvitation = (email, role)=>{
        console.log("Data arriving: ", email, role)
        sendNewInvitation(email, role)
    }



    return (
        <SpaceContext.Provider value={{ state, dispatch, HandleSpaceCreate, handleCreateNewMeeting, handleSendInvitation}} >
            { children }
        </SpaceContext.Provider>
)
}

export const useSpace = () => useContext(SpaceContext)