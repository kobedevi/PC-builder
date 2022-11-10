import React from 'react'
import { Link } from 'react-router-dom'
import { PossibleRoutes } from '../../../core/routing'

const CpuOverview = () => {
  return (
    <>
        <div>CpuOverview</div>
        <Link className="nav-link" to={PossibleRoutes.CpuCreate}>Add Cpu</Link>
    </>
  )
}

export default CpuOverview