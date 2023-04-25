import { createContext, useState, useContext } from "react";



const SelectContext = createContext();
const SetSelectContext = createContext();



export function useSetSelectContext(){
    return useContext(SetSelectContext);
}
export function useSelectContext(){
    return useContext(SelectContext);
}


export function SelectProvider({children}){



    const [selected, setSelected] = useState(false);


    return(
        <>

                <SetSelectContext.Provider value = {setSelected}>
                    <SelectContext.Provider value = {selected}>
                        {children}
                    </SelectContext.Provider>
                </SetSelectContext.Provider>

        </>
    )

}