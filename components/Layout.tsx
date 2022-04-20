import { ThemeProvider } from '@emotion/react'
import { CssBaseline, Container, Grid, createTheme } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import FeaturedPost from './FeaturedPost'
import Footer from './Footer'
import Header from './Header'
import MainFeaturedPost from './MainFeaturedPost'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Techblog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" />
        {children}
      </Container>
      <Footer title="Techblog" description="Built for tech enthusiast!" />
    </ThemeProvider>
  )
}

export default Layout

