
export const convertDataToFormdata=(dataObject)=>{
    const formdata=new FormData()

    for (const key in dataObject) {
        formdata.append(key , dataObject[key])
        }
        return formdata
    }
