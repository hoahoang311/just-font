import {useEffect, useState, createContext, useLayoutEffect} from 'react'

export const useFetch = url => {
  const [state, setData] = useState({data: null, loading: true})

  useEffect(() => {
    fetch(url)
      .then(x => x.json())
      .then(y => {
        setData({data: y, loading: false})
      })
  }, [url])

  return state
}

export const useLayout = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [setWidth])
  return {width}
}

export const AppContext = createContext(null)
