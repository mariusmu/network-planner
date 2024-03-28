import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Hostname } from '../models/hostname'
import { Environment } from './environmentReducer'

export interface FirewallEntry {
  id: string
  source: Hostname
  destination: Hostname
  destinationPorts: number[]
  description: string
  environment: Environment
}

export interface FirewallEntryList {
  firewallEntries: FirewallEntry[]
}

const initialState: FirewallEntryList = {
  firewallEntries: []
}

export const firewallEntrySlice = createSlice({
  name: 'firewall',
  initialState,
  reducers: {
    add: (state: FirewallEntryList, action: PayloadAction<FirewallEntry>) => {
      const found = state.firewallEntries.filter(
        s => s.id !== action.payload.id
      )
      state.firewallEntries = Object.assign(found.concat(action.payload))
    },
    remove: (state: FirewallEntryList, action: PayloadAction<string>) => {
      const found = state.firewallEntries.filter(s => s.id !== action.payload)

      state.firewallEntries = Object.assign(found)
    }
  }
})

export const { add, remove } = firewallEntrySlice.actions

export default firewallEntrySlice.reducer
