import { createContext, useState, useContext } from "react";



const rightContext = createContext();
const rightToggleContext = createContext();

export function useRightContext(){
    return useContext(rightContext);
}

export function useRightToggleContext(){
    return useContext(rightToggleContext);
}

export function useRightSelectContext(){
    return useContext(rightSelectContext);
}


export function RightProvider({children}){

    const [right, setRight] = useState('');


    return(
        <>
        <rightContext.Provider value={right}>
            <rightToggleContext.Provider value={setRight}>

                        {children}

            </rightToggleContext.Provider>
        </rightContext.Provider>
        </>
    )

}