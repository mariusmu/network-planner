import { createSlice } from '@reduxjs/toolkit'

import { FirewallEntry } from '../../../shared/models/firewallEntry'
import { StateEntity } from './StateEntity'

import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchEntities } from './commonReducers'
const initialState: StateEntity<FirewallEntry[]> = {
  entity: [],
  state: 'idle'
}

export const firewallEntrySlice = createSlice({
  name: 'firewall',
  initialState,
  reducers: {
    add: (
      state: StateEntity<FirewallEntry[]>,
      action: PayloadAction<FirewallEntry>
    ) => {
      const found = state.entity.filter(s => s.id !== action.payload.id)
      state.entity = Object.assign(found.concat(action.payload))
    },
    remove: (
      state: StateEntity<FirewallEntry[]>,
      action: PayloadAction<string>
    ) => {
      const found = state.entity.filter(s => s.id !== action.payload)

      state.entity = Object.assign(found)
    }
  },
  extraReducers: builder => {
    builder.addCase(
      fetchEntities('firewallentry').fulfilled,
      (state, action) => {
        state.entity = action.payload
        return state
      }
    ),
      builder.addCase(
        fetchEntities('firewallentry').rejected,
        (state, action) => {
          state.state = 'failed'
          return state
        }
      )
  }
})

export const { add, remove } = firewallEntrySlice.actions

export default firewallEntrySlice.reducer
