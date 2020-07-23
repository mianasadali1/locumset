// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://admin.locumset.com/api/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 40000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.setHeader('Authorization', '')


  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const login = (email, password, token) => api.post('login', {email: email, password: password, device_token: token})
  const signup = data => api.post('register/user', data)
  const getHospitals = () => api.get('get_all_hospitals')
  const savePreference = (data) => api.post('save_prefs', data)
  const getPreference = () => api.post('get_doc_prefs')
  const getExperience = () => api.post('get_doc_experience')
  const saveExperience = data => api.post('experience', data)
  const getAllJobs = (data) => api.post('job/listing', data)
  const getJobHistory = () => api.post('history')
  const saveNotification = (data) => api.post('save_settings', data)
  const saveSettings = (data) => api.post('reset_pass', data)
  const getJobDetail = (jobId) => api.post('job/detail', jobId)
  const jobCancel = (data) => api.post('job/cancel', data)
  const jobApply = (data) => api.post('job/application', data)
  const applyJob = (data) => api.post('job/application', data)
  const getHiredJob = (data) => api.post('hired', data)
  // const rejectJob = () => api.post('reject_job')
  const getHiredJobDetail = (jobId) => api.post('hire_detail', jobId)
  const rejectJob = (data) => api.post('reject_job', data)
  const submitTimeSheet = data => api.post('submit_time_sheet', data)
  const updateProfile = data => api.post('update_profile', data)
  const getCompletedJobs = (data) => api.post('completed', data)
  const logout = token => api.post('logout', {device_token: token})
  const updatePayment = (data) => api.post('payment', data)
  const getCalendar = () => api.post('calendar')
  const forgotPass = email => api.post('forgot', {email: email} )
  const updatePass = data => api.post('update_pass', data)


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthToken,
    removeAuthToken,
    getRoot,
    getRate,
    getUser,
    login,
    signup,
    getHospitals,
    getPreference,
    savePreference,
    getExperience,
    saveExperience,
    getAllJobs,
    saveNotification,
    saveSettings,
    getJobDetail,
    getJobHistory,
    jobCancel,
    jobApply,
    applyJob,
    getHiredJob,
    getHiredJobDetail,
    rejectJob,
    submitTimeSheet,
    updateProfile,
    getCompletedJobs,
    logout,
    updatePayment,
    getCalendar,
    forgotPass,
    updatePass,
  }
}

// let's return back our create method as the default.
export default {
  create
}
