import { createContext, useContext } from 'react'

const SpaceContext = createContext() 

export function SpaceContextProvider({children}){


    return (
        <SpaceContext.Provider  >
            {children}
        </SpaceContext.Provider>
    )

}

export const useSpaceContext = () => useContext(SpaceContext)