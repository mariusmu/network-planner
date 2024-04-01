import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ApiBaseUrl } from '../config/mainConfig'

export function useAuthConfig (input: any): any | null {
  const endpoint = ApiBaseUrl + '/config'
  const [data, setData] = useState(null)
  useEffect(() => {
    axios
      .get(endpoint)
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.error(err))
  }, [endpoint, input])

  return data
}
