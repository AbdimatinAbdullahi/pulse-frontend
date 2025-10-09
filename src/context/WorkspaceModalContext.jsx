import { createContext, useContext, useState, useCallback } from "react";

const WorkspaceModalContext = createContext();

export function WorkspaceModalProvider({ children }) {

  const [action, setAction] = useState(null);

  const [ JoinMeetingModalOpen, setJoinMeetingModalOpen ] = useState(false)

  const handleOpenJoinMeeting = ()=>{
    
    setJoinMeetingModalOpen(true)
  
  }

  const handleCloseJoinMeetingModal = ()=>{
  
    setJoinMeetingModalOpen(false)
  
  }

  const openModal = useCallback((actionModal) => {
    console.log("Opening modal: ", actionModal);
    setAction(actionModal);
  }, []);

  const closeModal = useCallback(() => {
    setAction(null);
  }, []);

  return (
    <WorkspaceModalContext.Provider value={{ action, openModal, closeModal, handleCloseJoinMeetingModal, handleOpenJoinMeeting, JoinMeetingModalOpen}}>
      {children}
    </WorkspaceModalContext.Provider>
  );
}

export function useWorkspaceModal() {
  return useContext(WorkspaceModalContext);
}
