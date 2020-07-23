import { put, call, select } from 'redux-saga/effects'
import { Alert } from 'react-native'
import {delay} from "redux-saga"
import Toast from 'react-native-simple-toast';
//import SplashScreen from 'react-native-splash-screen';

export function* showErrorAlert ({error}) {
if(error){
    // yield call( delay, 1000 )
    // yield call(Alert.alert, 'Error', error)
    Toast.show(error,Toast.LONG);
}
  else{
    // yield call( delay, 1000 )
    //yield call(Alert.alert, 'Error', "Please check your internet connection")
  }
}
/*export function* hideSplash (action) {
  //console.error("show called")
  //const { error } = action
  yield call(SplashScreen.hide)
}*/
export function * showSuccessAlert (action){
  yield call( delay, 1000 )
  yield call(Alert.alert, 'Success', "Post Added Successfully")
}
