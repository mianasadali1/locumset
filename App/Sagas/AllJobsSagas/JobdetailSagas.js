import { put, call, select } from 'redux-saga/effects'
import JobsDetailActions from '../../Redux/AllJobsRedux/JobdetailRedux'
import {NavigationActions} from 'react-navigation'
import AccountActions from "../../Redux/AccountRedux"
import AlljobsActions from "../../Redux/AllJobsRedux/WardcoverRedux"


// attempts to cancel job
export function * getJobsDetail (api, jobId) {
  let job_id = jobId.jobId
    const response = yield call(api.getJobDetail, job_id)
    console.log('response on get jobdetail', response.data)
    if(response.data == null) {
     yield put(JobsDetailActions.jobsDetailFailure('Check your internet connection'))
   } else if(response.ok){
      yield put(JobsDetailActions.jobsDetailSuccess(response.data.success))
    } else {
      yield put(JobsDetailActions.jobsDetailFailure("Get Jobs Error"))
    }

  }


  // attempt to cancel job
  export function * jobCancel (api, data) {
      console.log('in sagas jobs cancel', data)
      let cancelData = data.data;
      const response = yield call(api.jobCancel, cancelData)
      console.log('jobs cancel resp', response)
      if(response.data == null) {
       yield put(JobsDetailActions.jobCancelFailure('Check your internet connection'))
     } else if(response.ok){
        yield put(JobsDetailActions.jobCancelSuccess(response.data.success))
        let jobId = {
          job_id: cancelData.job_id
        }
        yield put(JobsDetailActions.jobsDetailRequest(jobId))
        yield put(AlljobsActions.allJobsRequest())
      } else {
        yield put(JobsDetailActions.jobCancelFailure("Job Cancel Error"))
      }
    }


    // attempt to cancel job
    export function * jobApply (api, data) {
        console.log('in sagas jobs apply', data)
        var applyData = data.data;
        const response = yield call(api.jobApply, applyData)
        console.log('jobs apply resp', response)
        if(response.data == null) {
         yield put(JobsDetailActions.jobApplyFailure('Check your internet connection'))
       } else if(response.ok){
          yield put(JobsDetailActions.jobApplySuccess(response.data.success))
          console.log('jobid', applyData.job_id)
          let jobId = {
            job_id: applyData.job_id
          }
          yield put(JobsDetailActions.jobsDetailRequest(jobId))
        } else {
          yield put(JobsDetailActions.jobApplyFailure(response.data.error))
        }
      }

// attempts to get all jobs
export function * applyJob (api, data) {
    console.log('in sagas apply job', data)
    var param_data = data.data
    const response = yield call(api.applyJob, param_data)
    console.log('Apply Job', response)
    if(response.data == null) {
     yield put(JobsDetailActions.applyJobFailure('Check your internet connection'))
   } else if(response.ok){
        yield put(JobsDetailActions.applyJobSuccess(response.data.success))
        // yield put(AccountActions.appliedJobs(param_data))
        let jobId = {
          job_id: param_data.job_id
        }
        yield put(JobsDetailActions.jobsDetailRequest(jobId))
        yield put(AlljobsActions.allJobsRequest())
    } else {
        yield put(JobsDetailActions.applyJobFailure(response.data.error))
    }
}
