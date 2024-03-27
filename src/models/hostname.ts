import { Option } from 'react-multi-select-component'

export interface Hostname {
  id: string
  hostname: string
  ipAddress: string
  environment: Option[]
  groups: Option[]
  description: string
}

export const HostnameList: Hostname[] = [
  {
    id: '1',
    hostname: 'WebA01',
    ipAddress: '10.20.20.1',
    environment: [{ label: 'Production', value: 'Production' }],
    description: 'Used for website',
    groups: [
      {
        key: '1',
        label: 'Web server',
        value: 'Web server'
      },
      {
        key: '2',
        label: 'General server',
        value: 'General server'
      }
    ]
  },
  {
    id: '2',
    hostname: 'WebC02',
    environment: [{ label: 'Production', value: 'Production' }],
    ipAddress: '10.20.20.2',
    description: 'Used for website',
    groups: [
      {
        key: '1',
        label: 'Web server',
        value: 'Web server'
      },
      {
        key: '2',
        label: 'General server',
        value: 'General server'
      }
    ]
  },
  {
    id: '3',
    hostname: 'WebB02',
    environment: [{ label: 'Pre-Production', value: 'Pre-Production' }],
    ipAddress: '10.20.30.2',
    description: 'Used for website',
    groups: [
      {
        key: '1',
        label: 'Web server',
        value: 'Web server'
      },
      {
        key: '2',
        label: 'General server',
        value: 'General server'
      }
    ]
  }
]
