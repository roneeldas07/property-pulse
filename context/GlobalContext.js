'use client'
import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export function GlobalProvider({children}) {
    const [unreadMsgCount, setUnreadMsgCount] = useState(0)
    return (
        <GlobalContext.Provider
            value={{
                unreadMsgCount,
                setUnreadMsgCount
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}