import { GridEntry, GridHeader, GridRow } from '../components/NetTable/NetTable'
import { Hostname } from '../models/hostname'

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
