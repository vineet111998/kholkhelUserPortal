export default function Keyboard(props) {
    console.log(props)
    function KeyboardRow({
        letters,
      }) {
        let buttons = []
        for (let letter of letters) {
          buttons.push(
            <Button
            //   onKey={onKey}
            //   color={bestColors.get(letter)}
              key={letter}
              buttonKey={letter}
            >
              {letter}
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
        color = '#888',
        // onKey,
      }) {
        return (
          <button
            className="button"
            style={{
              backgroundColor: color,
              borderColor: color,
            }}
            onClick={() => {
                props.onclick(buttonKey)
            //   alert(buttonKey)
            }}
            disabled={props.data.has(children)}
          >
            {children}
          </button>
        )
      }
        return (
          <div id="keyboard">
            <KeyboardRow
            //   bestColors={bestColors}
              letters="qwertyuiop"
            //   onKey={onKey}
            //   isLast={false}
            />
            <KeyboardRow
            //   bestColors={bestColors}
              letters="asdfghjkl"
            //   onKey={onKey}
            //   isLast={false}
            />
            <KeyboardRow
            //   bestColors={bestColors}
              letters="zxcvbnm"
            //   onKey={onKey}
            //   isLast={true}
            />
          </div>
        )
      }