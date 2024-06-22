import React from 'react'

type Props = {}

const WalletLayout = ({children}) => {
  return (
    <div className='flex flex-col h-full justify-center bg-green-300'>{children}</div>
  )
}

export default WalletLayout