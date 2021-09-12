import React, {useContext, useState, useEffect, useRef, useCallback} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppContext} from './lib'
import {Font, Styles} from './styles'

const MyFonts = props => {
  const classes = useStyles(props)
  const {selectedTab, fontA, data} = useContext(AppContext)
  const [activeIndex, setActiveIndex] = useState(null)
  const ref = useRef()

  const keyboardAction = useCallback(
    e => {
      if (activeIndex === 2) {
        if (e.key === 'ArrowRight') setActiveIndex(0)
      }

      if (activeIndex === 0) {
        if (e.key === 'ArrowLeft') setActiveIndex(2)
      }

      if (e.key === 'ArrowRight' && activeIndex < 2) setActiveIndex(activeIndex + 1)
      if (e.key === 'ArrowLeft' && activeIndex > 0) setActiveIndex(activeIndex - 1)
    },
    [activeIndex]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyboardAction)
    return () => document.removeEventListener('keydown', keyboardAction)
  }, [keyboardAction])

  const getEndpoint = () => {
    const {index} = selectedTab
    return data[index].content_endpoint
  }

  const handleSelectFont = e => {
    e.preventDefault()
    setActiveIndex(parseInt(e.target.id))
  }

  return (
    getEndpoint() === 'fonts_a' && (
      <div className={classes.root} ref={ref}>
        {fontA.content.map((font, idx) => {
          const isFirstItem = idx === 0
          return (
            <div
              id={idx}
              key={font.id}
              className={isFirstItem ? classes.largeCard : classes.normalCard}
              style={{cursor: 'pointer'}}
              onClick={handleSelectFont}>
              <div
                style={
                  props.width > 670
                    ? {
                        marginRight: isFirstItem ? undefined : 20,
                        marginBottom: isFirstItem ? 20 : undefined
                      }
                    : {marginRight: isFirstItem ? 20 : undefined, marginBottom: isFirstItem ? undefined : 20}
                }
                onClick={handleSelectFont}
                id={idx}>
                <div
                  style={{
                    border: 'solid 1px #000',
                    width: isFirstItem ? Styles.largeBox + 6 : Styles.smallBox + 6,
                    borderRadius: 15
                  }}
                  onClick={handleSelectFont}
                  id={idx}>
                  <div
                    className={isFirstItem ? classes.largeBox : classes.smallBox}
                    style={{backgroundColor: font.color}}
                    title={font['color-blind-label']}
                    id={idx}
                    onClick={handleSelectFont}>
                    <div
                      className={classes.abbr}
                      style={{fontSize: isFirstItem ? Font.largeBox : Font.smallBox}}
                      id={idx}
                      onClick={handleSelectFont}>
                      {font.abbr}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.content} onClick={handleSelectFont} id={idx}>
                <div style={{marginRight: 10}}>
                  <div className={classes.dot} />
                </div>
                <div id={idx} className={classes.text} onClick={handleSelectFont} style={{opacity: idx === activeIndex ? 0.5 : 1}}>
                  {font.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: 45,
    flexGrow: 1,
    border: 'solid 2px #BECADF',
    borderRadius: Styles.borderRadius,
    display: 'grid',
    gridTemplateColumns: '1.2fr 2fr',
    gridGap: 60,
    [theme.breakpoints.down(670)]: {
      padding: 40,
      marginLeft: 40,
      marginRight: 40,
      flexGrow: 1,
      border: 'solid 2px #BECADF',
      borderRadius: Styles.borderRadius,
      display: 'grid',
      gridGap: 30
    }
  },
  largeCard: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gridArea: '1 / 1 / span 2/ span 1',
    zIndex: 999,
    [theme.breakpoints.down(670)]: {
      flex: 1,
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      gridArea: '1 / 1 / span 1/ span 2',
      zIndex: 999
    }
  },
  normalCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 999,
    [theme.breakpoints.down(670)]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 999
    }
  },
  largeBox: {
    height: Styles.largeBox,
    width: Styles.largeBox,
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: 15,
    border: 'solid 3px #fff'
  },
  smallBox: {
    height: Styles.smallBox,
    width: Styles.smallBox,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: 15,
    border: 'solid 3px #fff'
  },
  abbr: {
    padding: 10,
    fontFamily: 'MontserratXBold',
    color: '#fff',
    opacity: 0.3
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down(670)]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  },
  dot: {
    height: 8,
    width: 8,
    margin: 5,
    backgroundColor: '#96A1B2',
    borderRadius: 50
  }
}))

export default MyFonts
