/** @format */
import { withNavigation as _withNavigation } from 'react-navigation'
import _Images from './Images'

const log = (values) => __DEV__ && reactotron.log(values)
const warn = (values) => __DEV__ && reactotron.warn(values)
const error = (values) => __DEV__ && reactotron.error(values)
export function connectConsoleToReactotron() {
  console.log = log
  console.warn = warn
  console.error = error
}

export const request = async (url, data = {}) => {
  try {
    const response = await fetch(url, data)

    return await response.json()
  } catch (err) {
    error(err)
    return { error: err }
  }
}

export const Images = _Images

