

import React from 'react'
import Select from './Select'
import Input from './Input'
import Textarea from './TextArea'
import File from './File'
import Switch from './Switch'

export default function FormikControl(props) {
    switch (props.control) {
        case 'select':
            return <Select {...props}/>

        case 'input':
            return <Input {...props}/>

        case 'textarea':
            return <Textarea {...props}/>

        case 'file':
            return <File {...props}/>

        case 'switch':
            return <Switch {...props}/>

        default:
            return null
    }
}
