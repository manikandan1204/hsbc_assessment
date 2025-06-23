import React from 'react'
import { useQuery } from '@tanstack/react-query';

const Character:React.FC=()=> {
  const  {data}  = useQuery({
    queryKey: ['characterData'],
    enabled: false,
  });
    const character = data as Record<string, any> | undefined;
    let filterObject=["location", "episode", "origin","image"]
  return (
    <>
    <h2 style={{cursor:"pointer"}} onClick={()=>window.history.back()}>{'< back'}</h2>
    <h2>Character Details</h2>
    <div style={{marginTop:100,display:"grid",gridTemplateColumns:"repeat(3,200px)",justifyContent:"space-around"}}>
        {
           character  &&  Object.keys(character).map(item=>{
            if(!filterObject.includes(item)){
            return(
                <div key={item}>
                    <p><b>{item}</b></p>
                    <p>{character[item]}</p>
                </div>
            )
           }})
        }
    </div>
    <div style={{display:"grid",justifyContent:"space-around",marginTop:100}}>
    <img src={character?.image} alt="" />
    </div>
    </>
  )
}

export default Character