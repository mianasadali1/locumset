import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  account: require('./AccountRedux').reducer,
  login: require('./LoginRedux').reducer,
  signup: require('./SignupRedux/SignupRedux').reducer,
  preference: require('./PreferencesRedux').reducer,
  profile: require('./ProfileRedux/ProfileRedux').reducer,
  experience: require('./ProfileRedux/ExperienceRedux').reducer,
  allJobs: require('./AllJobsRedux/WardcoverRedux').reducer,
  notification: require('./ProfileRedux/NotificationRedux').reducer,
  settings: require('./ProfileRedux/SettingsRedux').reducer,
  jobDetail: require('./AllJobsRedux/JobdetailRedux').reducer,
  jobHistory: require('./AllJobsRedux/JobHistoryRedux').reducer,
  hiredJobs: require('./AllJobsRedux/HiredJobRedux').reducer,
  hiredDetail: require('./AllJobsRedux/HiredDetailRedux').reducer,
  timeSheet: require('./TimeSheetRedux/TimeSheetRedux').reducer,
  completedJobs: require('./Dashboard/CompletedJobsRedux').reducer,
  payment: require('./PaymentRedux').reducer,
  logout: require('./LogoutRedux').reducer,
  calendarData: require('./Dashboard/DashboardRedux').reducer,
  forgotPass: require('./ForgotPasswordRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}
