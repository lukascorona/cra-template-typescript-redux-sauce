import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import TabBar from './TabBar'
import Box from '@material-ui/core/Box'
import useMobileService from '../../utils/mobileService'

type Props = {
    children: React.ReactNode,
    title?: string
}

export default function MainLayout(props: Props) {
    const [open, setOpen] = useState(false)
    const isMobile = useMobileService()
    const { children, title } = props;
    
    if (isMobile) {
      return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Header title={ title } centerTitle/>
          <Box flex={1} overflow="scroll">  
            {children}
          </Box>
          <TabBar />
        </Box>
      )
    }

    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header title={ title } onMenuClick={() => setOpen(true)} showMenu showProfile/>
          <Sidebar open={open} onClose={() => setOpen(false)} />
          <Box flex={1} overflow="auto">  
            {children}
          </Box>
        <Footer />
      </Box>
    );
}

