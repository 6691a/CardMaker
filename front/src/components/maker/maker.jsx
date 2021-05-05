import React, { useState, useEffect  } from 'react';
import { useHistory, useLocation } from 'react-router';

const Maker = ({authService}) => {
   

    const location = useLocation();
    const history = useHistory();
    let user;
    if (location.state){
        user = location.state.user;
    }

   

    const logout = () =>{
       authService.logout()
       .then(()=>{
           goLogin();
       });
    }

    const goLogin = () => {
        history.push({
            pathname: '/',
        });
    }

    
    useEffect(() => {
        
        if(!user){
            goLogin();
        }
        
    });


    return (
        <>
            <h1>123</h1>
            <button onClick={logout}>logout</button>
        </>
    );
}
   


export default Maker;