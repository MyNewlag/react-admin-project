
import React from 'react'

export default function Roles({rowData}) {
   return rowData.roles?.map(r=>(
        <div key={rowData.id+"_"+r.id} className="text-center">{r.title}</div>
      ))
        
      
}
