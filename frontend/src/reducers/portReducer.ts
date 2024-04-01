import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Port } from '../../../shared/models/port'
import { StateEntity } from './StateEntity'
import { fetchEntities } from './commonReducers'

const initialState: StateEntity<Port[]> = {
  entity: [],
  state: 'idle'
}

export const portSlice = createSlice({
  name: 'port',
  initialState,
  reducers: {
    add: (state: StateEntity<Port[]>, action: PayloadAction<Port>) => {
      const found = state.entity.filter(s => s.id !== action.payload.id)
      state.entity = Object.assign(found.concat(action.payload))
    },
    remove: (state: StateEntity<Port[]>, action: PayloadAction<string>) => {
      const found = state.entity.filter(s => s.id !== action.payload)

      state.entity = Object.assign(found)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEntities('port').fulfilled, (state, action) => {
      state.entity = action.payload
    })
    builder.addCase(fetchEntities('port').rejected, (state, action) => {
      state.state = 'failed'
    })
  }
})

export const { add, remove } = portSlice.actions

export default portSlice.reducer
