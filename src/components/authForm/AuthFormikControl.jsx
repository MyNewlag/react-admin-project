
import React from 'react'
import Input from './input'
import Switch from '../form/Switch';





export default function AuthFormikControl(props) {

    switch(props.control){
        case 'input':
            return <Input {...props}/>

        case 'switch':
            return <Switch {...props}/>

            
            default:
                return null;
    }

}
