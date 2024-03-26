import React from 'react'
import ReactDOM from 'react-dom'

import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme
} from '@chakra-ui/react'

import { theme as chakraTheme } from '@chakra-ui/react'
import Main from './compositions/HostnameTable/Main/Main'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import hostnameSlice from './reducers/hostnameReducer'
import { MultiSelectTheme } from 'chakra-multiselect'

let persistedStore = localStorage.getItem('store')
if (persistedStore !== null) {
  persistedStore = JSON.parse(persistedStore)
}

export const store = configureStore({
  reducer: {
    hostnameSlice
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
