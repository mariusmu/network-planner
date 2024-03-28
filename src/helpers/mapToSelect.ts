import { Option } from 'react-multi-select-component'
import { Hostname } from '../models/hostname'

export function mapHostnameToInput (input?: Hostname): Option {
  if (input === undefined) {
    return {
      label: '',
      value: ''
    }
  }
  return {
    label: input.hostname,
    value: input.id
  }
}

export function mapHostnamesToSelect (input: Hostname[]): Option[] {
  return input.map(mapHostnameToInput).filter(f => f !== null)
}
