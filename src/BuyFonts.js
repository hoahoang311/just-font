import React, {useState, useContext} from 'react'
import {AppContext} from './lib'

const BuyFonts = props => {
  const {selectedTab, fontB, data} = useContext(AppContext)

  const getEndpoint = () => {
    const {index} = selectedTab
    return data[index].content_endpoint
  }
  return (
    getEndpoint() === 'fonts_b' && (
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: -999
        }}>
        <div style={{padding: props.width > 670 ? 150 : 50}}>{fontB.content}</div>
      </div>
    )
  )
}

export default BuyFonts
