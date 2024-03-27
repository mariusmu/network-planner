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
  faShieldHalved,
  faArrowUpRightDots,
  faEthernet
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HostnameTable from '../HostnameTable'
import PortTable from '../../PortTable/PortTable'
import EnvironmentTable from '../../EnvironmentTable/EnvironmentTable'

export default function Main ({}) {
  return (
    <Container maxW='1400px'>
      <Tabs isFitted={true} variant='soft-rounded'>
        <TabList>
          <Tab>
            <FontAwesomeIcon icon={faNetworkWired} className='icon' />
            Hostnames
          </Tab>
          <Tab>
            <FontAwesomeIcon icon={faArrowUpRightDots} className='icon' />
            Environments
          </Tab>
          <Tab>
            <FontAwesomeIcon icon={faEthernet} className='icon' />
            Ports
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
          <TabPanel>
            <EnvironmentTable />
          </TabPanel>
          <TabPanel>
            <PortTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
