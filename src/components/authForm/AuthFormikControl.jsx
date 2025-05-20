
import React from 'react'
import Input from './input'
import Swich from './Swich';



export default function AuthFormikControl(props) {

    switch(props.control){
        case 'input':
            return <Input {...props}/>

        case 'swich':
            return <Swich {...props}/>

            
            default:
                return null;
    }

}
