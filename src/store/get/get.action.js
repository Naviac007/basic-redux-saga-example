
export const types = {
    Fetch_Data: "Action/fetch_data",
    Load_Data : "Action/load_data",
    Delete_Data : "Action/delete_data",
    Update_Data : "Action/update_data"
}

export const fetchData = ()=>
    ({
        type:types.Fetch_Data,
    })

export const loadData = (data)=>
    ({
        type:types.Load_Data,
        payload:data
    })
export const deleteData = (id)=>
        ({
            type:types.Delete_Data,
            payload:id
        })
export const updateData = (postId,newData)=>
        ({
            type:types.Update_Data,
            payload:{id:postId,text:newData}
        })