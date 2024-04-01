import axios from 'axios'

import {
  PayloadAction,
  UnknownAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { ApiBaseUrl } from '../config/mainConfig'

export const fetchEntities = (name: string) =>
  createAsyncThunk(name, async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ApiBaseUrl + '/' + name)
      return response.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  })

export async function saveEntity (name: string, entity) {
  return await axios.post(ApiBaseUrl + '/' + name, entity)
}

export async function deleteEntity (name: string, id: string) {
  await axios.delete(ApiBaseUrl + '/' + name + '/' + id)
}
