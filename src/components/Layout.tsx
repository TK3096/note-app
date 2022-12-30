import React, { ReactNode } from 'react'

interface ILayoutProps {
  children: ReactNode
}

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { children } = props

  return (
    <div>
      <h1>Navbar</h1>
      {children}
      <h1>Footer</h1>
    </div>
  )
}

export default Layout
