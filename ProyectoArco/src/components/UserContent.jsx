import './UserContent.css'
import { useEffect, useState } from 'react';
import ArcoBtn from './ArcoBtn';

export function UserContent(){
    const [userData, setUserData] = useState([]);

    

    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch("/api/users")).json();
            setUserData(data);
        }
        dataFetch();
    }, [])


    return(
        <div >
            {userData.map( data => {
                return(
                        <div className='UserContent'>
                            <div >
                                {data.user_id}
                            </div>
                            <div >
                                {data.email}
                            </div>
                            <div >
                                {data.user_fname}
                            </div>
                            <div >
                                {data.user_first_lname}
                            </div>
                            <div >
                                {data.curp}
                            </div>
                            <div>
                                <ArcoBtn userId = {data.user_id}/>
                            </div>
                        </div>
                )
            })}
        </div>
    )
}