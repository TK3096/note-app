import React, { ReactElement } from 'react'

import Text from '@components/Text'
import Layout from '@components/Layout'

import type { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      <div>Home Page</div>
      <Text />
    </div>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default HomePage
