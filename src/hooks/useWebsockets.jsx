import { useEffect, useRef } from "react";

const room_url = import.meta.env.VITE_WSS;

// This is cutom react hooks that manges websocket connection using user and spaceID, it listens for real time messages from the server and calls the appropriate
// callback functions that will update state in the parensts components. It aslo provides actions to parents components to call server
export function useWebsocket(
  userID,
  spaceID,
  onNewMeeting,
  onNewInvitation,
  onCancelInvite,
  onLeave,
  onDelete,
  onAcceptInvitation,
  onRemoveMember
) {
  const socketRef = useRef(null);
  const retryRef = useRef(0);
  const maxRetry = 4;

  useEffect(() => {
    if (!userID || !spaceID) {
      return;
    }

    let reconnectTimeout;

    const connect = () => {
      
      const socket = new WebSocket(`${room_url}/room?userid=${userID}`);

      socketRef.current = socket;

      socket.onopen = () => {
        retryRef.current = 0;
        const payload = {
          type: "join",
          payload: {
            userID,
            spaceID,
          },
        };
        socket.send(JSON.stringify(payload));
      };

      socket.onerror = (error) => {
       
        console.error("Connection is lost due to: ", error);
      
      };

      socket.onclose = (event) => {

        if (retryRef.current < maxRetry) {

          retryRef.current += 1;

          const delay = 2000 * retryRef.current;

          console.log(`🔁 Reconnecting in ${delay / 1000}s...`);

          reconnectTimeout = setTimeout(connect, delay);

        } else {

          console.warn("Maxium retry reached!");

        }

      };

      socket.onmessage = (event) => {
        // parsing data into form of javascript object
        const data = JSON.parse(event.data);
        switch (data.type) {
          
          case "new_meeting":
            onNewMeeting(data.payload);
            break;

          case "new_invitation":
            onNewInvitation(data.payload);
            break;

          case "cancel_invite":
            onCancelInvite(data.payload);
            break;
          
          case "leave_space":
            onLeave(data.payload);
            break

          case "delete_space":
            onDelete(data.payload)
            break
            
          case "accept_invitation":
            console.log("Incoming payload into connection: ", data)
            onAcceptInvitation(data)
            break
          
            case "remove_member":
            console.log("Incomign remove member details: ", data.payload)
            onRemoveMember(data.payload)
            break

          default:
            console.warn("unknown message type: ", data);
        }
      };
    };

    // Initial Connect

    connect();

    // this prevents memory leaks and "ghost connections" => whenc compoenents unmounts ot dependacies changes
    return () => {
      console.log("Clearing up websocker");
      clearTimeout(reconnectTimeout);
      socketRef.current?.close();
    };
  }, [userID, spaceID]);

  const sendNewInvitation = (data) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "new_invitation",
          payload: data,
        })
      );
    }
  };

  const sendNewMeeting = (data) => {
    console.log("Data coming into useWebsocket: ", data);
    if (socketRef.current && socketRef.current.readyState == WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "new_meeting",
          payload: data,
        })
      );
    }
  };

  const sendCancelInvitation = ({ space, user }) => {
    console.log("Data sending into useWebsocket: ", space, user);
    if (socketRef.current && socketRef.current.readyState == WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "cancel_invite",
          payload: {
            space: space,
            user: user,
          },
        })
      );
    }
  };

  const sendLeaveSpace = (data) => {
    console.log("Leaving space data", data);
    if (socketRef.current && socketRef.current.readyState == WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "leave_space",
          payload: data,
        })
      );
    } else {
      console.warn("Data not sent for leave space");
    }
  };


  const sendDelete = (space_id)=>{
    if(socketRef.current && socketRef.current.readyState == WebSocket.OPEN){
      socketRef.current.send(JSON.stringify({
        type: "delete_space",
        payload: {
          space_id
        }
      }))
    }
  }

  const sendAcceptInvitation = (data) =>{
    console.log("Sending data into connection: ", data)
    if(socketRef.current && socketRef.current.readyState == WebSocket.OPEN){
      socketRef.current.send(JSON.stringify({
        type: "accept_invitation",
        payload:{
          invitationID: data.invitationID,
          user: data.user
        }
      }))
    }
  };

  const sendRemoveUser = (data) =>{
    console.log("Remove user outgoing: ", data)
    if(socketRef.current && socketRef.current.readyState == WebSocket.OPEN){
      socketRef.current.send(JSON.stringify({
        type:"remove_member",
        payload: data
      }))
    }
  }

  return {
    sendNewMeeting,
    sendNewInvitation,
    sendCancelInvitation,
    sendLeaveSpace,
    sendDelete,
    sendAcceptInvitation,
    sendRemoveUser
  };
}
