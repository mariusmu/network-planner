import { Environment } from './environment'
import { Option } from './option'

export interface Hostname {
  id: string
  name: string
  hostname: string
  ipAddress: string
  environment: Environment[]
  groups: Option[]
  description: string
}
