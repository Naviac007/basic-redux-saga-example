import * as Actions from './get.action';

export default function reducer (state = {data:[]},action){
    let temp = []
    switch(action.type){
        case Actions.types.Load_Data:
            console.log("hehe")
            
            //state.data =  action.payload;
          
            console.log(action.payload)
            return {...state,data: action.payload} 
        case Actions.types.Delete_Data:
            console.log(action.payload)
            temp = [...state.data]
            temp=  temp.filter(item => item.id !==action.payload);
            state.data = [];
            console.log(state.data)
            return {...state,data:temp}
        case  Actions.types.Update_Data:
            temp = [...state.data]
            //eslint-disable-next-line
             var index  = temp.findIndex(item => item.id == action.payload.id);
            const newData = {   
                "userId":temp[index].userId,
                 "id":temp[index].id,
                 "title":action.payload.text,
            }
            temp[index] = newData
            state.data = [];
            console.log(temp)
            return {...state,data:temp}
        default:
            break;
    }
    return state;
}