import { Environment } from './environment'
import { Hostname } from './hostName'

export interface FirewallEntry {
  id: string
  source: Hostname
  destination: Hostname
  destinationPorts: number[]
  description: string
  environment: Environment
}

export interface FirewallEntryList {
  firewallEntries: FirewallEntry[]
}
