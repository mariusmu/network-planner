import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Hostname, HostnameList } from '../models/hostname'

export interface HostnameList {
  hostnames: Hostname[]
}

const initialState: HostnameList = {
  hostnames: HostnameList
}

export const hostnameSlice = createSlice({
  name: 'hostnames',
  initialState,
  reducers: {
    add: (state: HostnameList, action: PayloadAction<Hostname>) => {
      const found = state.hostnames.filter(s => s.id !== action.payload.id)
      state.hostnames = Object.assign(found.concat(action.payload))
    },
    remove: (state: HostnameList, action: PayloadAction<string>) => {
      const found = state.hostnames.filter(s => s.id !== action.payload)

      state.hostnames = Object.assign(found)
    }
  }
})

export const { add, remove } = hostnameSlice.actions

export default hostnameSlice.reducer
