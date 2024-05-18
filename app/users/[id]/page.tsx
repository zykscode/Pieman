import React from 'react'

type Props = {params:{id:string}}

const IdPage = ({params}: Props) => {
  return (
    <div>IdPage:{params.id}</div>
  )
}

export default IdPage