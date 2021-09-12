import React, {useState, useContext, useLayoutEffect, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import './App.css'
import {useFetch, AppContext, useLayout} from './lib'
import {Font, Styles} from './styles'
import MyFonts from './MyFonts'
import BuyFonts from './BuyFonts'

const url = 'http://json.ffwagency.md/tabs'
const buyFontUrl = 'http://json.ffwagency.md/fonts_b'
const myFontUrl = 'http://json.ffwagency.md/fonts_a'

const App = props => {
  const [selectedTab, setSelectedTab] = useState({enpoint: null, index: 0})
  const [tabData, setTabData] = useState(null)
  const {width} = useLayout()
  const classes = useStyles(props)
  const {data, loading} = useFetch(url)
  const {data: fontB, loading: buyFontLoading} = useFetch(buyFontUrl)
  const {data: fontA, loading: myFontLoading} = useFetch(myFontUrl)

  useEffect(() => {
    if (fontA && tabData === null) {
      setTabData(fontA)
    }
  }, [data, tabData, fontA])

  const handleSelectTab = e => {
    e.preventDefault()
    const {id} = e.target
    const endpoint = e.target.getAttribute('endpoint')
    setSelectedTab({index: parseInt(id), endpoint})
    if (endpoint === 'fonts_a') setTabData(fontA)
    else setTabData(fontB)
  }

  const renderTab = () => {
    switch (selectedTab.index) {
      case 0:
        return <MyFonts width={width} />
      case 1:
        return <BuyFonts width={width} />
    }
  }

  return (
    !loading && (
      <div className={classes.root}>
        {data && fontA && fontB && (
          <AppContext.Provider value={{selectedTab, fontA, fontB, data}}>
            <div className={classes.container}>
              <div className={classes.header}>
                <div className={classes.title}>Please select one font</div>
                <div className={classes.tabContainer}>
                  {data.map((tab, index) => {
                    return (
                      <div
                        className={classes.tab}
                        key={tab.id}
                        id={index}
                        endpoint={tab.content_endpoint}
                        onClick={handleSelectTab}
                        style={{
                          opacity: index === selectedTab.index ? 0.5 : 1,
                          color: index === 1 ? '#FD540C' : '#000'
                        }}>
                        {tab.label}
                      </div>
                    )
                  })}
                </div>
              </div>
              {!buyFontLoading && !myFontLoading && renderTab()}
            </div>
          </AppContext.Provider>
        )}
      </div>
    )
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: 650,
    paddingTop: 100,
    [theme.breakpoints.down(670)]: {
      // width: 650,
      paddingTop: 100
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
    [theme.breakpoints.down(670)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  title: {
    fontWeight: 'bold',
    fontSize: Font.titleSize,
    [theme.breakpoints.down(670)]: {
      fontWeight: 'bold',
      fontSize: Font.titleSize,
      textAlign: 'center',
      paddingBottom: 20
    }
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  tab: {
    fontFamily: 'MontserratXBold',
    fontSize: Font.textSize,
    marginLeft: Styles.spacing * 3,
    textTransform: 'uppercase',
    cursor: 'pointer'
  }
}))

export default App
