import React, { useState, useReducer } from "react";

interface AppProps {
    children: React.ReactNode;
    time: Date;
}

interface AppData {
    time: Date;
}

const AppContext = React.createContext<AppData | null>(null)

// function countReducer(state, action) {
//   switch (action.type) {
//     case 'increment': {
//       return {count: state.count + 1}
//     }
//     case 'decrement': {
//       return {count: state.count - 1}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

export const AppContextProvider = ({children, time} : AppProps) => {
    
    const [state, setState] = useState<AppData>({time: time})
    //   const value = {state, dispatch}

    return (
      <AppContext.Provider value={state}>
        {children}
      </AppContext.Provider>
    );

}


