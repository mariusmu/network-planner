import React from 'react'
import './Main.css'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs
} from '@chakra-ui/react'
import {
  faNetworkWired,
  faServer,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HostnameTable from '../HostnameTable'

export default function Main ({}) {
  return (
    <Container maxW='1000px'>
      <Tabs isFitted={true} variant='soft-rounded'>
        <TabList>
          <Tab>
            <FontAwesomeIcon icon={faNetworkWired} className='icon' />
            Hostnames
          </Tab>
          <Tab>
            <FontAwesomeIcon icon={faServer} className='icon' />
            Groups
          </Tab>
          <Tab>
            <FontAwesomeIcon icon={faShieldHalved} className='icon' />
            Firewall schema
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HostnameTable />
          </TabPanel>
          <TabPanel>2</TabPanel>
          <TabPanel>3</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
