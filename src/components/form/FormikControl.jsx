

import React from 'react'
import Select from './Select'
import Input from './Input'
import Textarea from './TextArea'
import File from './File'
import Switch from './Switch'
import MultiSelect from './MultiSelect'
import SearchableSelect from './SearchableSelect'
import Date from './Date'
import CheckBox from './CheckBox'

export default function FormikControl(props) {
    switch (props.control) {
        case 'select':
            return <Select {...props}/>

        case 'multiSelect':
            return <MultiSelect {...props}/>

        case 'searchableSelect':
            return <SearchableSelect {...props}/>

        case 'input':
            return <Input {...props}/>

        case 'textarea':
            return <Textarea {...props}/>

        case 'file':
            return <File {...props}/>

        case 'switch':
            return <Switch {...props}/>

        case 'date':
            return <Date {...props}/>
 
            case 'checkBox':
            return <CheckBox {...props}/>

        default:
            return null
    }
}
