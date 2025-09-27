import { useEffect, useRef } from "react";

const room_url = import.meta.env.VITE_WSS


// This is cutom react hooks that manges websocket connection using user and spaceID, it listens for real time messages from the server and calls the appropriate
// callback functions that will update state in the parensts components. It aslo provides actions to parents components to call server
export function useWebsocket(userID, spaceID, onNewMeeting, onNewInvitation, onNewMember, onCancelInvite, onDeleteSpace, onLeaveSpace, onTimezoneChange, onRemoveUser, onJoin){
    const socketRef = useRef(null)

    useEffect(()=>{
    
        if(!userID || !spaceID){
            console.warn("No space and user id provided")
            return
        }

        const socket = new WebSocket(`${room_url}/userid=${userID}&space=${spaceID}`)

        socketRef.current = socket

        socket.onopen = ()=>{
            console.log("Websocket connection is live")
        }

        socket.onerror = (error)=>{
            console.error("Connection is lost due to: ", error)
        }


        socket.onclose = ()=>{
            console.log("Connection is closed")
        }  


        socket.onmessage = (event) =>{
            const data = JSON.parse(event.data)
            console.log("Clg the incoming data: ", data)
            console.log("Clg the incoming event type: ", event.type)

            switch (data.type){
                case "new_meeting":
                    onNewMeeting(data.payload)
                    break
                case "new_member":
                    onNewMember(data.payload)
                    break

                case "new_invite":
                    onNewInvitation(data.payload)
                    break

                case "cancel_invite":
                    onCancelInvite(data.payload)
                    break

                case "delete_space":
                    onDeleteSpace(data.payload)
                    break
                    
                case "leave_space":
                    onLeaveSpace(data.payload)
                    break

                case "time_zone_change":
                    onTimezoneChange(data.payload)
                    break

                case "remove_user":
                    onRemoveUser(data.payload)
                    break

                case "join_space":
                    onJoin(data.payload)
                    break

                default:
                    console.warn("unknown message type: ", data.type)
            }
        }
    
        // this prevents memory leaks and "ghost connections" => whenc compoenents unmounts ot dependacies changes
        return ()=>{
            if(socketRef.current){
                socketRef.current.close()
            }
        }
    
    }, [userID, spaceID])


    const sendNewInvitation = (email, role)=>{

    }

    const sendNewMeeting = ()=>{

    }

    const sendLeaveSpace = ()=>{
        
    }

    const sendTimezoneChange = ()=>{

    }

    const sendCancelInvite = ()=>{

    }

    const sendDeleteSpace = ()=>{

    }

    const sendRemoveUser = ()=>{

    }

    return { sendNewMeeting, sendNewInvitation, sendLeaveSpace, sendTimezoneChange, sendCancelInvite, sendDeleteSpace, sendRemoveUser}

}