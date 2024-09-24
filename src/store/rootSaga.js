import dataSaga from './get/get.saga'
import {all} from 'redux-saga/effects'

export default function* rootSaga(){
    yield all({
        ...dataSaga
    })
}