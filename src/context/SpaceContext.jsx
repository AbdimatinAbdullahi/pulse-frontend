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



    return (
        <SpaceContext.Provider value={{ state, dispatch, HandleSpaceCreate }} >
            { children }
        </SpaceContext.Provider>
)
}

export const useSpace = () => useContext(SpaceContext)