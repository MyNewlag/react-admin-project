import React from 'react'

export default function ProductTable({number,number2,number3,number4}) {
  return (
      <tr>
        <td>{number}</td>
        <td>{number2}</td>
        <td>{number3}</td>
        <td>{number4}</td>
        <td>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
        </td>
    </tr>
  )
}
