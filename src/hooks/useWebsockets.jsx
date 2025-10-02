import { useEffect, useRef } from "react";

const room_url = import.meta.env.VITE_WSS


// This is cutom react hooks that manges websocket connection using user and spaceID, it listens for real time messages from the server and calls the appropriate
// callback functions that will update state in the parensts components. It aslo provides actions to parents components to call server
export function useWebsocket(userID, spaceID, onNewMeeting, onNewInvitation, onJoin){
    
    const socketRef = useRef(null)

    useEffect(()=>{
    
        if(!userID || !spaceID){
            return
        }

        const socket = new WebSocket(`${room_url}/room?userid=${userID}`)

        socketRef.current = socket

        socket.onopen = ()=>{
             const payload = {
                type: "join",
                payload: {
                userID,
                spaceID,
                },
            };

            console.log("Websocket connection is live")
            socket.send(JSON.stringify(payload))
        }

        socket.onerror = (error)=>{
            console.error("Connection is lost due to: ", error)
        }


        socket.onclose = (event) => {
        console.log("Client saw close:", event.code, event.reason);
        };
        


        socket.onmessage = (event) =>{
            // parsing data into form of javascript object
            const data = JSON.parse(event.data)
            switch (data.type){
                
                case "new_meeting":
                    console.log("New meeting arrives: ", data.payload)
                    onNewMeeting(data.payload)
                    break

                case "new_invitation":
                    onNewInvitation(data.payload)
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
    
    }, [userID, spaceID ])


    const sendNewInvitation = (data)=>{
        console.log("Data csending to new invitation: ", data)
        if(socketRef.current && socketRef.current.readyState === WebSocket.OPEN){
            socketRef.current.send( JSON.stringify({
                type: "new_invitation",
                payload: data
            }))
        }
    }

    const sendNewMeeting = (data)=>{
        console.log("Data coming into useWebsocket: ", data)
        if(socketRef.current && socketRef.current.readyState == WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({
                type: "new_meeting",
                payload:data,
            }))
        }
    }


    return { sendNewMeeting, sendNewInvitation }

}