import axios from 'axios'
import { act, createContext, useContext, useEffect, useReducer } from 'react'

const SpaceContext = createContext() 

const initialState = {
    spaces : [],
    activespace: null,
}

const meeting_services_url = import.meta.env.VITE_MEETING_SERVICE_URL
const payment_services_url = import.meta.env.VITE_PAYMENT_SERVICE_URL
const room_services_url = import.meta.env.VITE_ROOM_SERVICE_URL

function reducer(state, action){
    switch(action.type){
        case "INITIAL_FETCH":
            return { ...state, spaces:[ ...action.payload ], activespace: action.payload.length > 0 ? action.payload[0].Space : null }
        case "ADD_SPACE":
            return {...state, spaces: [...state.spaces, action.payload ]}
        case  "SELECT_ACTIVE_SPACE":
            return {...state, activespace: action.payload}
        default:
            return {...state }
    }
}

export function SpaceContextProvider({children}){
    
    const [ state, dispatch ] = useReducer(reducer, initialState)

    async function FetchInitialSpacesAndItsData(token){
        console.log("User id: ", token)
        try {
            const initResponse = await axios.get(`${room_services_url}/initial-fetch?token=${token}`)
                if(initResponse.status == 200){
                    console.log(initResponse.data)
                    dispatch({type: "INITIAL_FETCH", payload: initResponse.data})
            }
        } catch (error) {
                console.log("Error fetching workspaces: ", error)
        }
    }

    async function createCheckoutSession(data){
        const { plan_id, plan_name, user_id } = data;
        try {
            const checkoutRes = await axios.post(`${payment_services_url}/create-checkout-session`, {
                plan: plan_name,
                user : user_id,
                plan_id: plan_id
            })
            console.log(checkoutRes.data)
            return checkoutRes.data
        } catch (error) {
            console.error("Error creating checkout session: ", error)
        }
    }

    async function CheckIfUserHasWorkspace(user_id){
        try {
            const checkResponse = await axios.get(`${room_services_url}/check-space?user_id=${user_id}`)
            if(checkResponse.status == 200){
                console.log("checkResponse: ", checkResponse)
                return { success: true, hasWorkspace: checkResponse.data, error: null }
            }
        } catch (error) {
            console.log("Error getting status: ", error)
            if(error?.status === 500 && error?.response.data === "internal server error"){
                return {success: false, error: "something went wrong", hasWorkspace: false}
            } 
        }
    }

    async function CreateWorkspace(data) {
        const { name, description, creator } = data;
        console.log("Creator:", creator);

        try {
            const result = await CheckIfUserHasWorkspace(creator);

            console.log("Result of check: ", result)

            if (result.success === true && result.error === null && result.hasWorkspace === false) {
            try {
                const createWorkspaceRes = await axios.post(`${room_services_url}/create-workspace`,{ name, description, creator });
                    console.log("Create response:", createWorkspaceRes.data);
                    if (createWorkspaceRes.status == 200) {
                            dispatch({ type: "APPEND_WORKSPACE", payload: createWorkspaceRes.data });
                            return { success: true, data: createWorkspaceRes.data };
                    }
                } catch (error) {
                    console.log("Error from create workspace: ", error)
                    return { success: false, error: "Something went wrong" };
                } 
            }
            return { success: false, error: result.error ?? "User already has a workspace" };
        } catch (error) {
            console.error("Error creating workspace:", error);
            return { success: false, error: error.message };
        }
    }




    return (
        <SpaceContext.Provider 
                value={{ state, dispatch, CreateWorkspace, FetchInitialSpacesAndItsData, createCheckoutSession }} >
            {children}
        </SpaceContext.Provider>
    )

}

export const useSpaceContext = () => useContext(SpaceContext)