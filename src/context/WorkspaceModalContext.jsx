import { createContext, useContext, useState, useCallback } from "react";

const WorkspaceModalContext = createContext();

export function WorkspaceModalProvider({ children }) {
  const [action, setAction] = useState(null);

  const openModal = useCallback((actionModal) => {
    console.log("Opening modal: ", actionModal);
    setAction(actionModal);
  }, []);

  const closeModal = useCallback(() => {
    setAction(null);
  }, []);

  return (
    <WorkspaceModalContext.Provider value={{ action, openModal, closeModal }}>
      {children}
    </WorkspaceModalContext.Provider>
  );
}

export function useWorkspaceModal() {
  return useContext(WorkspaceModalContext);
}
