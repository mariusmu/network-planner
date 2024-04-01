import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StateEntity } from './StateEntity'
import { Environment } from '../../../shared/models/environment'
import { fetchEntities, saveEntity } from './commonReducers'

const initialState: StateEntity<Environment[]> = {
  entity: [],
  state: 'idle'
}

export const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    add: (
      state: StateEntity<Environment[]>,
      action: PayloadAction<Environment>
    ) => {
      const found = state.entity.filter(s => s.id !== action.payload.id)
      state.entity = Object.assign(found.concat(action.payload))
      return state
    },
    remove: (
      state: StateEntity<Environment[]>,
      action: PayloadAction<string>
    ) => {
      const found = state.entity.filter(s => s.id !== action.payload)

      state.entity = Object.assign(found)
      return state
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEntities('environment').fulfilled, (state, action) => {
      state.entity = action.payload
      return state
    })
    builder.addCase(fetchEntities('environment').rejected, (state, action) => {
      state.state = 'failed'
    })
  }
})
export const { add, remove } = environmentSlice.actions

export default environmentSlice.reducer
