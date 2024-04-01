import { Option } from './option'

export interface Port {
  id: string
  name: string
  number: string
  description: string
  encrypted: boolean
  groups: Option[]
}

export interface PortList {
  ports: Port[]
}
