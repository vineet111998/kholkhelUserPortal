import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';
import { useState, useEffect, useRef, useMemo } from 'react';
import '../screens/WordGame.css';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import WordleSolution from '../components/WorldeSolution'
export default function WordGame() {
  let location = useLocation();
  // console.log(location.state);
  // let [currentWord, setCurrentWord] = useState(location.state.gameAttr.game_attr[0])
  let [currentAttempt, setCurrentAttempt] = useState('')
  let [bestColors, setBestColors] = useState(() => new Map())
  let [history, setHistory] = usePersistedHistory(h => {
    waitForAnimation(h)
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    // console.log(location.state.outcome);
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  function handleKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return
    }
    handleKey(e.key)
  }

  function handleKey(key) {
    if (history.length === 6) {
      return
    }
    if (animatingRef.current) {
      return
    }
    let letter = key.toLowerCase()
    if (letter === 'enter') {
      if (currentAttempt.length < 7) {
        return
      }
      if (!wordList.includes(currentAttempt)) {
        alert('Not in my thesaurus')
        return
      }
      if (
        history.length === 7 &&
        currentAttempt !== secret
      ) {
        alert(secret)
      }
      let newHistory = [
        ...history,
        currentAttempt
      ]
      setHistory(newHistory)
      setCurrentAttempt('')
      waitForAnimation(newHistory)
    } else if (letter === 'backspace') {
      setCurrentAttempt(
        currentAttempt.slice(0, currentAttempt.length - 1)
      )
    } else if (/^[a-z]$/.test(letter)) {
      if (currentAttempt.length < 7) {
        setCurrentAttempt(currentAttempt + letter)
      }
    }
  }

  let animatingRef = useRef(false)
  function waitForAnimation(nextHistory) {
    // console.log(animatingRef.current)
    if (animatingRef.current) {
      throw Error('should never happen')
    }
    animatingRef.current = true
    setTimeout(() => {
      animatingRef.current = false
      setBestColors(calculateBestColors(nextHistory))
    }, 2000)
  }
  let wordList = [
    'subhash',
    'jawahar',
    'mridula',
    'vasudev',
    'sukhdev',
    'mahatma',
    'naoroji',
    'sushi',
    'crabs',
    'breathe',
    'equator',
    'rhombus',
    'dispers',
    'vibgyor',
    'delight',
    'ability',
    'attempt',
    'complex',
    'control',
    'digital'
  ];
  let secret = (wordList[0]).toLowerCase();
  // console.log(secret)

  function Grid({
    history,
    currentAttempt
  }) {
    let rows = []
    for (let i = 0; i < 6; i++) {
      if (i < history.length) {
        rows.push(
          <Attempt
            key={i}
            attempt={history[i]}
            solved={true}
          />
        )
      } else if (i === history.length) {
        rows.push(
          <Attempt
            key={i}
            attempt={currentAttempt}
            solved={false}
          />
        )
      } else {
        rows.push(
          <Attempt
            key={i}
            attempt=""
            solved={false}
          />
        )
      }
    }
    return (
      <div id="grid">
        {rows}
      </div>
    );
  }

  function Attempt({
    attempt,
    solved,
  }) {
    let cells = []
    for (let i = 0; i < 7; i++) {
      cells.push(
        <Cell
          key={i}
          index={i}
          attempt={attempt}
          solved={solved}
        />
      )
    }
    return <div className="div">{cells}</div>
  }

  function Cell({
    index,
    attempt,
    solved,
  }) {
    let content
    let hasLetter = attempt[index] !== undefined
    let color = getBgColor(attempt, index)
    if (hasLetter) {
      content = attempt[index]
    } else {
      // lol
      content = <div style={{ opacity: 0 }}>X</div>
    }
    return (
      <div
        className={
          "cell" + (solved ? ' solved' : '')
          + (hasLetter ? ' filled' : '')
        }
      >
        <div className="surface" style={{
          transitionDelay: (index * 300) + 'ms'
        }}>
          <div
            className="front"
            style={{
              backgroundColor: NONE,
              borderColor: hasLetter ? BORDER : ''
            }}
          >
            {content}
          </div>
          <div
            className="back"
            style={{
              backgroundColor: color,
              borderColor: color
            }}
          >
            {content}
          </div>
        </div>
      </div>
    )
  }

  function Keyboard({ bestColors, onKey }) {
    // console.log(onKey)
    return (
      <div id="keyboard">
        <KeyboardRow
          bestColors={bestColors}
          letters="qwertyuiop"
          onKey={onKey}
          isLast={false}
        />
        <KeyboardRow
          bestColors={bestColors}
          letters="asdfghjkl"
          onKey={onKey}
          isLast={false}
        />
        <KeyboardRow
          bestColors={bestColors}
          letters="zxcvbnm"
          onKey={onKey}
          isLast={true}
        />
      </div>
    )
  }

  function KeyboardRow({
    bestColors,
    letters,
    isLast,
    onKey
  }) {
    let buttons = []
    if (isLast) {
      buttons.push(
        <Button
          onKey={onKey}
          key="enter"
          buttonKey="Enter"
        >
          Enter
        </Button>
      )
    }
    for (let letter of letters) {
      if(bestColors.get(letter)=='#212121'){
        continue;
      }
      buttons.push(
        <Button
          onKey={onKey}
          color={bestColors.get(letter)}
          key={letter}
          buttonKey={letter}
        >
          {letter}
        </Button>
      )
    }
    if (isLast) {
      buttons.push(
        <Button
          onKey={onKey}
          key="backspace"
          buttonKey="Backspace"
        >
          Backspace
        </Button>
      )
    }
    return (
      <div>
        {buttons}
      </div>
    )
  }

  function Button({
    buttonKey,
    children,
    color = LIGHTGREY,
    onKey,
  })
   {
    
    return (
      <button
        className="button"
        style={{
          backgroundColor: color,
          borderColor: color,
        }}
        onClick={() => {
          onKey(buttonKey)
        }}
      >
        {children}
      </button>
    )
  }

  function usePersistedHistory(onLoad) {
    let [history, setHistory] = useState([])
    let loadedRef = useRef(false)
    // useEffect(() => {
    //   if (loadedRef.current) {
    //     return
    //   }
    //   loadedRef.current = true
    //   let savedHistory = loadHistory()
    //   if (savedHistory) {
    //     setHistory(savedHistory)
    //     onLoad(savedHistory)
    //   }
    // })
    // useEffect(() => {
    //   saveHistory(history)
    // }, [history])
    return [history, setHistory]
  }

  function getBgColor(attempt, i) {
    let correctLetter = secret[i]
    let attemptLetter = attempt[i]
    if (
      attemptLetter === undefined ||
      secret.indexOf(attemptLetter) === -1
    ) {
      return GREY
    }
    if (correctLetter === attemptLetter) {
      return GREEN
    }
    return YELLOW
  }

  function calculateBestColors(history) {
    let map = new Map()
    for (let attempt of history) {
      for (let i = 0; i < attempt.length; i++) {
        let color = getBgColor(attempt, i);
        let key = attempt[i]
        let bestColor = map.get(key)
        map.set(key, getBetterColor(color, bestColor))
      }
    }
    return map
  }

  function getBetterColor(a, b) {
    if (a === GREEN || b === GREEN) {
      return GREEN
    }
    else if (a === YELLOW || b === YELLOW) {
      return YELLOW
    }
    else {return GREY}
  }

  function loadHistory() {
    let data
    try {
      data = JSON.parse(localStorage.getItem('data'))
    } catch { }
    if (data != null) {
      if (data.secret === secret) {
        return data.history
      }
    }
  }

  function saveHistory(history) {
    let data = JSON.stringify({
      secret,
      history
    })
    try {
      localStorage.setItem('data', data)
    } catch { }
  }

  let BLACK = '#111'
  let GREY = '#212121'
  let MIDDLEGREY = '#666'
  let LIGHTGREY = '#888'
  let GREEN = '#538d4e'
  let YELLOW = '#b59f3b'
  let BORDER = '#d3d6da'
  let NONE = 'rgba(0,0,0,0)'
  let RED = '#FF0000'
  const [active, setActive] = useState(false);
  function solutionHandler(data) {
    setActive(true)
    if (data === false) {
      setActive(false)
    }
  }



  return (
    <div id="screen">
      {!active &&
        <>
        <h1>Word Game</h1>
        <Grid
          history={history}
          currentAttempt={currentAttempt} />
          <Keyboard
            bestColors={bestColors}
            onKey={handleKey} />
          {/* <button onClick={solutionHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>SUBMIT</button> */}
          </>
      }
      {/* {
        active &&
        <WordleSolution data={solutionHandler} value={location.state} />
      } */}
    </div>
  )
}

