import { useState, useEffect, useRef} from 'react';
import '../screens/WordGame.css';
import { useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import WordleSolution from '../components/WorldeSolution'
import WordListInfo from '../Services/WordList';
import { Card } from 'react-bootstrap';
export default function WordGame() {
  let location = useLocation();
  let [currentWord, setCurrentWord] = useState(location.state.gameAttr.game_attr[0])
  let [currentAttempt, setCurrentAttempt] = useState('')
  let [bestColors, setBestColors] = useState(() => new Map())
  let [WordList,setWordList] =useState([]);
  let [countRow,setCountRow] = useState(0);
  let [history, setHistory] = usePersistedHistory(h => {
    waitForAnimation(h)
  })
  useEffect(()=>{
    // console.log("hello");
    if(WordList.length <= 0)
    {
      var data={word_length:currentWord.length}
      getWordList(data);
    }
  });
  async function getWordList(data){
      await WordListInfo.getInstance().getWordList(data).then((res)=>{
        let result = JSON.parse(JSON.stringify(res));
        if(result.code==200){
          var word=[];
          for(let i=0;i<result.data.length;i++)
          word.push(result.data[i].word_attr.toString());
        }
        setWordList(word)
      })
  }
  
  useEffect(() => {
    console.log("useEffect");
    window.addEventListener('keydown', handleKeyDown)
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
      if (currentAttempt.length < currentWord.length) {
        return
      }
      else{
        setCountRow(countRow+1)
      }
      if (!WordList.includes(currentAttempt)) {
        alert('Not in my thesaurus')
        return
      }
      if (
        countRow ==5 &&
        currentAttempt !== secret
      ) {
       setFinish("lost")
      }
      if (
        countRow <=5 &&
        currentAttempt == secret
      ) {
        setTimeout(() => {
          setFinish("won")
        }, 200)

        // setActive(true);
      }
      // if()
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
      if (currentAttempt.length < currentWord.length) {
        setCurrentAttempt(currentAttempt + letter)
      }
    }
  }

  let animatingRef = useRef(false)
  function waitForAnimation(nextHistory) {
    if (animatingRef.current) {
      throw Error('should never happen')
    }
    animatingRef.current = true
    setTimeout(() => {
      animatingRef.current = false
      setBestColors(calculateBestColors(nextHistory))
    }, 200)
  }
  let secret = (currentWord).toLowerCase();

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
    for (let i = 0; i < currentWord.length; i++) {
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
    if(finish==="won"|| finish === "lost"){
      setClassName("keyboarda")
    }
    return (
      <div className={classname}>
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
        <Buttons
          onKey={onKey}
          key="enter"
          buttonKey="Enter"
        >
          Enter
        </Buttons>
      )
    }
    for (let letter of letters) {
      buttons.push(
        <Buttons
          onKey={onKey}
          color={bestColors.get(letter)}
          key={letter}
          buttonKey={letter}
        >
          {letter}
        </Buttons>
      )
    }
    if (isLast) {
      buttons.push(
        <Buttons
          onKey={onKey}
          key="backspace"
          buttonKey="Backspace"
        >
          Backspace
        </Buttons>
      )
    }
    return (
      <div>
        {buttons}
      </div>
    )
  }

  function Buttons({
    buttonKey,
    children,
    color = LIGHTGREY,
    onKey,
  }) {
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
        let color = getBgColor(attempt, i)
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
    if (a === YELLOW || b === YELLOW) {
      return YELLOW
    }
    return GREY
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

  let GREY = '#212121'
  let LIGHTGREY = '#888'
  let GREEN = '#538d4e'
  let YELLOW = '#b59f3b'
  let BORDER = '#d3d6da'
  let NONE = 'rgba(0,0,0,0)'
  const [active, setActive] = useState(false);
  const [finish,setFinish]=useState("");
  const [classname , setClassName]= useState("keyboard");
  const finishHandler=()=>{
      setActive(true)
  }

  return (
    <div id="screen">
      <div style={{ width: "40%", margin:" -20px auto 20px", textAlign: "right"}}>
      <div style={{ width: "40%", display: "inline-flex", border: "1px solid rgb(87 51 41)", borderRadius: "10px", lineHeight: "28px"}}>
        <label style={{textAlign: "center", width: "60%"}}>Selected language: </label>
        <span style={{width: "40%", background: "rgb(87 51 41)", borderRadius: "0 9px 9px 0", color: "rgb(255 255 255)", textAlign: "center", boxShadow: "-2px 0px 4px rgb(0 0 0 / 20%)"}}>{location.state.gameData[location.state.id].lang.lang_desc}</span>
        </div>
        </div>
      {!active &&
        <><h1>Word Game</h1>
        <Grid
          history={history}
          currentAttempt={currentAttempt} />
          {
            // !finish &&
          <Keyboard 
            bestColors={bestColors}
            onKey={handleKey} />
          }
          {
            finish==="won" &&
            <Card style={{ width: '18rem',margin:"2% auto",display:"block",transition:"2s"}}>
            <Card.Body>
              {/* <Card.Title></Card.Title> */}
              <Card.Text>
                    Congratulations!!!!!
                    <br></br>
                    You got it Correct.
              </Card.Text>
              {
                location.state.eventType==1 &&
              <Button variant="primary" onClick={finishHandler}>Next</Button>
              }
              {
                location.state.eventType==2 &&
                <NavLink
                // ImplementCardBoard
              to="/activityBoard" state={{ eventIndex: location.state.eventID,id:location.state.id }}  >    
              <Button variant="primary">Next</Button>
            </NavLink>
              }
            </Card.Body>
          </Card>
          }
          {
            finish==="lost" &&
            <Card style={{ width: '18rem',margin:"2% auto",display:"block",transition:"2s"}}>
            <Card.Body>
              <Card.Text>
                   You Lost!!!
                   <br></br>
                   The correct answer is:{secret}
              </Card.Text>
              <Button variant="primary" onClick={finishHandler}>Next</Button>
            </Card.Body>
          </Card>
          }
          </>
      }
      {
        active &&
        <WordleSolution value={location.state} />
      }
    </div>
  )
}

