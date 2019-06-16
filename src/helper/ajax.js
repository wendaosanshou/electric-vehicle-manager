import axios from 'axios'
import $q from 'q'
import { $util } from '@/helper'

function requestHandle (params) {
  let defer = $q.defer()
  axios(params)
    .then(res => {
      if (res && (res.unauthorized || res.statusCode === 401)) {
        window.location.href = '/login'
      }
      if (res.data) {
        if (res.data.success) {
          defer.resolve(res.data.value)
        } else {
          defer.reject(res.data.message)
        }
      } else {
        defer.reject()
      }
    }).catch(err => {
      defer.reject(err)
    })

  return defer.promise
}

export default {
  post: function (url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params
    })
  },
  get: function (url, params, op) {
    return requestHandle({
      method: 'get',
      url: $util.queryString(url, params)
    })
  }
}
