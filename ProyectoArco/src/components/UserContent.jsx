import './UserContent.css'
import { useEffect, useState } from 'react';
import ArcoBtn from './ArcoBtn';

export function UserContent(){
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
            const data = await(await fetch("/api/users")).json();
            setUserData(data);
        }
        dataFetch();
    }, [])


    return(
        <div className='box'>
            {userData.map( data => {
                return(
                    <>
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
                            <div className='btn'>
                                <ArcoBtn userId = {data.user_id}/>
                            </div>
                            
                            
                        </div>
                        <ColoredLine color="blue"/>
                        
                    </>     
                )
            })}
            
        </div>
    )
}