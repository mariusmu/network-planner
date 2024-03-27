import { GridEntry, GridHeader, GridRow } from '../components/NetTable/NetTable'
import { Hostname } from '../models/hostname'
import { Environment } from '../reducers/environmentReducer'
import { Port } from '../reducers/portReducer'

export function mapHostnameToGrid (hostnames: Hostname[]): GridEntry {
  const gridHeader: GridHeader[] = [
    {
      name: 'Hostname'
    },
    { name: 'IP address' },
    { name: 'Environment' },
    { name: 'Groups' },
    { name: 'Description' }
  ]

  const values: GridRow[] = hostnames.map(h => {
    return {
      id: h.id,
      items: [
        { field: 'hostname', value: h.hostname },
        { field: 'ipAddress', value: h.ipAddress },
        {
          field: 'environment',
          value: h.environment.map(e => e.value).join(',')
        },
        {
          field: 'groups',
          value: h.groups.map(g => g.value).join(', '),
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
