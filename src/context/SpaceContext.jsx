import axios from 'axios'
import { createContext, useContext, useEffect, useReducer } from 'react'

const SpaceContext = createContext() 

const initialState = {
    spaces : [],
    my_meetings : [],
    todays_space_meetings: [],
    tomorrow_space_meetings: [],
    activespace: null,
}

const meeting_services_url = import.meta.env.VITE_MEETING_SERVICE_URL
const payment_services_url = import.meta.env.VITE_PAYMENT_SERVICE_URL
const room_services_url = import.meta.env.VITE_ROOM_SERVICE_URL

function reducer(state, action){
    switch(action.type){
        case "MY_MEETINGS":
            return {...state, meetings: action.payload}
        case "SPACES" :
            return {...state, spaces : action.payload}
        case "TODAYS_MEETING":
            return {...state, todays_space_meetings: action.payload}
        case "TOMORROWS_MEETING":
            return {...state, tomorrow_space_meetings: action.payload}
        case "SET_ACTIVE_SPACE":
            return {...state, activespace: action.payload}
        case "APPEND_WORKSPACE":
            return {...state, spaces: [...state.spaces, action.payload ]}
        default:
            return {...state}
    }
}

export function SpaceContextProvider({children}){
    
    const [ state, dispatch ] = useReducer(reducer, initialState)

    async function fetchMeetingsAndSpaces(token){
        try {
            const initResponse = await axios.get(`${meeting_services_url}/initial-fetch?token=${token}`)
                if(initResponse.status == 200){
                    console.log(initResponse.data)
                    dispatch({type: "MY_MEETINGS", payload: initResponse.data.meetings})
                    dispatch({type: "SPACES", payload: initResponse.data.spaces})
            }
        } catch (error) {
                console.log("Error fetching workspaces: ", error)
        }
    }


    async function fetchSpaceData(spaceId, todaysDate=Date.now()){
        try {
            const spaceDataRes = await axios.get(`${meeting_services_url}/space?id=${spaceId}&today=${todaysDate}`)
            if(spaceDataRes.status == 200){
                dispatch({type: "TODAYS_MEETING", payload : spaceDataRes.data.todays})
                dispatch({type: "TOMORROWS_MEETING", payload : spaceDataRes.data.tomorrow})
            }
        } catch (error) {
            console.error("Error fetching space data: ", error)
        }
    }

    async function FetchMeetingHistory(userId){
        try {
            const meetingHistoryRes = await axios.get(`${meeting_services_url}/history?id=${userId}`)
            if(meetingHistoryRes.status == 200){
                dispatch({type: "MEETING_HISTORY", payload: meetingHistoryRes.data.meetings})
            }
        } catch (error) {
            console.error("Error fetching meeting history: ", error)
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
           const createWorkspaceRes = await axios.post(`${room_services_url}/create-workspace`,
                { name, description, creator }
            );
            console.log("Create response:", createWorkspaceRes.data);
            if (createWorkspaceRes.status == 200) {
                    dispatch({ type: "APPEND_WORKSPACE", payload: createWorkspaceRes.data });
                    return { success: true, data: createWorkspaceRes.data };
            }
        } catch (error) {
            console.log("Error res: ", error)
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
                value={{ state, dispatch, fetchSpaceData, FetchMeetingHistory, CreateWorkspace,
                         fetchMeetingsAndSpaces,createCheckoutSession, CheckIfUserHasWorkspace

                    }} >
            {children}
        </SpaceContext.Provider>
    )

}

export const useSpaceContext = () => useContext(SpaceContext)