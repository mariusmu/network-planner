import { Option } from 'react-multi-select-component'

export interface Hostname {
  id: string
  name: string
  hostname: string
  ipAddress: string
  environment: Option[]
  groups: Option[]
  description: string
}
