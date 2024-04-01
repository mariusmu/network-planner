import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Hostname } from '../../../shared/models/hostName'
import { StateEntity } from './StateEntity'
import { fetchEntities } from './commonReducers'

export interface HostnameList {
  hostnames: Hostname[]
}

const initialState: StateEntity<Hostname[]> = {
  entity: [],
  state: 'idle'
}

export const hostnameSlice = createSlice({
  name: 'hostname',
  initialState,
  reducers: {
    add: (state: StateEntity<Hostname[]>, action: PayloadAction<Hostname>) => {
      const found = state.entity.filter(s => s.id !== action.payload.id)
      state.entity = Object.assign(found.concat(action.payload))
    },
    remove: (state: StateEntity<Hostname[]>, action: PayloadAction<string>) => {
      const found = state.entity.filter(s => s.id !== action.payload)

      state.entity = Object.assign(found)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEntities('hostname').fulfilled, (state, action) => {
      state.entity = action.payload
      return state
    })
    builder.addCase(fetchEntities('hostname').rejected, (state, action) => {
      state.state = 'failed'
      return state
    })
  }
})

export const { add, remove } = hostnameSlice.actions

export default hostnameSlice.reducer
