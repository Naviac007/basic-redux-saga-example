import { call, put, takeEvery } from "redux-saga/effects";
import * as Actions from "./get.action";
import {getData} from "../../Apis/getApi";
function* getApiData(){
    try{
        const result = yield call(getData);
        console.log("Saga",result)
        yield put(Actions.loadData(result))
    }catch(e){
        console.log(e)
    }
}
export default function* mySaga(){
    yield takeEvery(Actions.types.Fetch_Data,getApiData)
}