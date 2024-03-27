import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Environment {
  id: string
  name: string
  description: string
}

export interface EnvironmentList {
  environments: Environment[]
}

const initialState: EnvironmentList = {
  environments: []
}

export const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    add: (state: EnvironmentList, action: PayloadAction<Environment>) => {
      const found = state.environments.filter(s => s.id !== action.payload.id)
      state.environments = Object.assign(found.concat(action.payload))
    },
    remove: (state: EnvironmentList, action: PayloadAction<string>) => {
      const found = state.environments.filter(s => s.id !== action.payload)

      state.environments = Object.assign(found)
    }
  }
})

export const { add, remove } = environmentSlice.actions

export default environmentSlice.reducer
