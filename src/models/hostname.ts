export interface Group {
  name: string
  id: string
}

export interface Hostname {
  id: string
  hostname: string
  ipAddress: string
  environment: string
  groups: Group[]
  description: string
}

export const HostnameList: Hostname[] = [
  {
    id: '1',
    hostname: 'WebA01',
    ipAddress: '10.20.20.1',
    environment: 'Production',
    description: 'Used for website',
    groups: [
      {
        id: '1',
        name: 'Web server'
      },
      {
        id: '2',
        name: 'General server'
      }
    ]
  },
  {
    id: '2',
    hostname: 'WebC02',
    environment: 'Production',
    ipAddress: '10.20.20.2',
    description: 'Used for website',
    groups: [
      {
        id: '1',
        name: 'Web server'
      },
      {
        id: '2',
        name: 'General server'
      }
    ]
  },
  {
    id: '3',
    hostname: 'WebB02',
    environment: 'Production',
    ipAddress: '10.20.30.2',
    description: 'Used for website',
    groups: [
      {
        id: '1',
        name: 'Web server'
      },
      {
        id: '2',
        name: 'General server'
      }
    ]
  }
]
