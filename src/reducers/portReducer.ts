import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Option } from 'react-multi-select-component'

export interface Port {
  id: string
  name: string
  number: string
  description: string
  encrypted: boolean
  groups: Option[]
}

export interface PortList {
  ports: Port[]
}

const initialState: PortList = {
  ports: []
}

export const portSlice = createSlice({
  name: 'port',
  initialState,
  reducers: {
    add: (state: PortList, action: PayloadAction<Port>) => {
      const found = state.ports.filter(s => s.id !== action.payload.id)
      state.ports = Object.assign(found.concat(action.payload))
    },
    remove: (state: PortList, action: PayloadAction<string>) => {
      const found = state.ports.filter(s => s.id !== action.payload)

      state.ports = Object.assign(found)
    }
  }
})

export const { add, remove } = portSlice.actions

export default portSlice.reducer
