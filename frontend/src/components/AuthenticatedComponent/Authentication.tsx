import React from 'react'
import { useAuthConfig } from '../../hooks/fetchConfig'
import {
  MsalAuthenticationTemplate,
  MsalProvider,
  useMsalAuthentication
} from '@azure/msal-react'
import {
  Configuration,
  InteractionType,
  PublicClientApplication,
  RedirectRequest
} from '@azure/msal-browser'
import { config } from 'process'

export default function Authenticate (props: { children }) {
  const res = useAuthConfig(props.children)

  if (res === null) return <div>Unauthenticated</div>

  const config: Configuration = {
    auth: {
      clientId: res.clientId,
      redirectUri: 'http://localhost:1234/'
    }
  }
  const psa = new PublicClientApplication(config)
  const scopes: RedirectRequest = {
    scopes: ['openid', 'profile']
  }

  return (
    <MsalProvider instance={psa}>
      {/* <MsalAuthenticationTemplate */}
      {/* interactionType={InteractionType.Popup}
        authenticationRequest={scopes}
        loadingComponent={() => <div>Loading</div>}
        errorComponent={() => <div>Error </div>}
      >
        {props.children}
      </MsalAuthenticationTemplate> */}
      {props.children}
    </MsalProvider>
  )
}
