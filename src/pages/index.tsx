import React, { ReactElement } from 'react'

import Text from '@components/Text'
import Layout from '@components/Layout'
import { Button } from '@mui/material'

import type { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      <div>Home Page Test</div>
      <Text />
      <Button variant='contained'>click</Button>
    </div>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default HomePage
