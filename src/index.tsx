import { MultiSelectTheme } from 'chakra-multiselect'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme
} from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'

import Main from './compositions/HostnameTable/Main/Main'
import environmentSlice from './reducers/environmentReducer'
import hostnameSlice from './reducers/hostnameReducer'
import portSlice from './reducers/portReducer'

let persistedStore = localStorage.getItem('store')
if (persistedStore !== null) {
  persistedStore = JSON.parse(persistedStore)
}

export const store = configureStore({
  reducer: {
    hostnameSlice,
    portSlice,
    environmentSlice
  },
  preloadedState: persistedStore ?? {}
})

store.subscribe(() => [
  localStorage.setItem('store', JSON.stringify(store.getState()))
])

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: 'dark' }}>
        <Main />
      </ColorModeProvider>
    </ChakraProvider>
  </Provider>,
  document.getElementById('app')
)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
