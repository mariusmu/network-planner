import { GridEntry, GridHeader, GridRow } from '../components/NetTable/NetTable'
import { Hostname } from '../../../shared/models/hostName'
import { Environment } from '../../../shared/models/environment'
import { FirewallEntry } from '../../../shared/models/firewallEntry'
import { Port } from '../../../shared/models/port'

export function mapHostnameToGrid (hostnames: Hostname[]): GridEntry {
  const gridHeader: GridHeader[] = [
    { name: 'Name' },
    { name: 'Hostname' },
    { name: 'IP address' },
    { name: 'Environment' },
    { name: 'Groups' },
    { name: 'Description' }
  ]

  const values: GridRow[] = hostnames.map(h => {
    return {
      id: h.id,
      items: [
        { field: 'name', value: h.name },
        { field: 'hostname', value: h.hostname },
        { field: 'ipAddress', value: h.ipAddress },
        {
          field: 'environment',
          value: h.environment?.map(e => e.name).join(', ') ?? '',
          multitem: true
        },
        {
          field: 'groups',
          value: h.groups?.map(g => g.value).join(', ') ?? '',
          multitem: true
        },
        { field: 'description', value: h.description }
      ]
    }
  })
  return {
    headers: gridHeader,
    items: values
  }
}

export function mapPortsToGrid (ports: Port[]): GridEntry {
  const gridHeader: GridHeader[] = [
    {
      name: 'Name'
    },
    { name: 'Number' },
    { name: 'Description' },
    { name: 'Encrypted' }
  ]

  const values: GridRow[] = ports.map(h => {
    return {
      id: h.id,
      items: [
        {
          field: 'name',
          value: h.name
        },
        { field: 'number', value: h.number },
        { field: 'description', value: h.description },
        { field: 'encrypted', value: h.encrypted ? 'true' : 'false' }
      ]
    }
  })
  return {
    headers: gridHeader,
    items: values
  }
}

export function mapEnvironmentsToGrid (environment: Environment[]): GridEntry {
  const gridHeader: GridHeader[] = [
    {
      name: 'Name'
    },
    { name: 'Description' }
  ]

  const values: GridRow[] = environment.map(h => {
    return {
      id: h.id,
      items: [
        {
          field: 'name',
          value: h.name
        },
        { field: 'description', value: h.description }
      ]
    }
  })
  return {
    headers: gridHeader,
    items: values
  }
}

export function mapFirewallEntryToGrid (entries?: FirewallEntry[]): GridEntry {
  const gridHeader: GridHeader[] = [
    {
      name: 'Source FQDN'
    },
    {
      name: 'Source CIDR'
    },
    {
      name: 'Destination FQDN'
    },
    {
      name: 'Destination CIDR'
    },
    {
      name: 'Destination port'
    },
    { name: 'Description' }
  ]

  const values: GridRow[] =
    entries?.map(h => {
      return {
        id: h.id,
        items: [
          {
            field: 'destinationFQDN',
            value: h.source.hostname
          },
          {
            field: 'sourceCIDR',
            value: h.source.ipAddress
          },
          {
            field: 'destinationFQDN',
            value: h.destination.hostname
          },
          {
            field: 'destinationCIDR',
            value: h.destination.ipAddress
          },
          {
            field: 'destinationPort',
            value: h.destinationPorts?.join(', ') ?? '',
            multitem: true
          },
          { field: 'description', value: h.description }
        ]
      }
    }) ?? []
  return {
    headers: gridHeader,
    items: values
  }
}
