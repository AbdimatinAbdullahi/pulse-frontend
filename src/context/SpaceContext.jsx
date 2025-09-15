import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'

const SpaceContext = createContext() 

const initialState = {
    spaces : [],
    activespace: null,
}

const payment_services_url = import.meta.env.VITE_PAYMENT_SERVICE_URL
const room_services_url = import.meta.env.VITE_ROOM_SERVICE_URL

function reducer(state, action){
    switch(action.type){
        case "INITIAL_FETCH":
            return { ...state, spaces:[ ...action.payload ], activespace: action.payload.length > 0 ? action.payload[0] : null }
        case "ADD_SPACE":
            return {...state, spaces: [...state.spaces, action.payload ]}
        case  "SELECT_ACTIVE_SPACE":
            console.log("Selecting space: ", action.payload)
            return {...state, activespace: action.payload }
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

    async function UpgradeWorkspace(price_id, workspace_id) {
        try {
            const upgradeRes = await axios.post(`${payment_services_url}/create-checkout-session`, { price_id: price_id, workspace_id: workspace_id})
            if(upgradeRes.status == 200){
                console.log("Response:", upgradeRes)
                return { success: true, url: upgradeRes.data}
            }
        } catch (error) {
            console.error("Error fetching upgrade: ",error)
            return { success: false}
        }
    }


    async function CreateMeeting({tittle, description, startTime, duration, spaceId, CreatorID}){
        
        try {
            const createMeetingRes = await axios.post(`${room_services_url}/create-meeting`,{
                tittle: tittle,
                description: description,
                date: startTime,
                spaceid: spaceId,
                hostid: CreatorID
            })

            if(createMeetingRes.status == 200){
                if(createMeetingRes.data.meeting.date == new Date()){
                    dispatch({type: "ADD_MEETING_TODAY", payload: createMeetingRes.data.meeting})
                }
            }

        } catch (error) {
            console.error("Create meeting error: ", error)
        }

    }



    return (
        <SpaceContext.Provider 
            value={{ 
                state, dispatch, CreateWorkspace, FetchInitialSpacesAndItsData, 
                createCheckoutSession, UpgradeWorkspace, CreateMeeting 
                }} >
            {children}
        </SpaceContext.Provider>
    )

}

export const useSpaceContext = () => useContext(SpaceContext)