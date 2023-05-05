import './UserContent.css'
import { useEffect, useState } from 'react';
import ArcoBtn from './ArcoBtn';

export function UserContent({curpSearch, busqueda}){
    const [userData, setUserData] = useState([]);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/users?search=${curpSearch}&busqueda=${busqueda}`)).json();
            setUserData(data);
        }
        dataFetch();
    }, [curpSearch, busqueda])


    return(
        <div className='boxUserContent'>
            {userData.map( data => {
                return(
                    <>
                        <div className='UserContent'>
                            <div className="userId">
                                {data.user_id}
                            </div>
                            <div className="email">
                                {data.email}
                            </div>
                            <div className="firstName">
                                {data.user_fname}
                            </div>
                            <div className="lastName">
                                {data.user_first_lname}
                            </div>
                            <div className="curp">
                                {data.curp}
                            </div>
                            <div className='btnUserContent'>
                                <ArcoBtn userId = {data.user_id}/>
                            </div>
                            
                            
                        </div>
                        
                    </>     
                )
            })}
            
        </div>
    )
}