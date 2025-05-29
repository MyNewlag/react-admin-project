
import React from 'react'


export default function FormikError({children}) {
  return (
    <small className='d-block text-danger mb-4 error_message'>{children}</small>
  )
}
