import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  const handleClick = (e) => {
    setResults(results.concat(e.target.name));
  };

  const [results, setResults] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const clear = () => {
    setResults("");
  };
  const backspace = () => {
    setResults(results.slice(0, results.length - 1));
  };

  const calculate = () => {
    console.log(results);
    let expression = results;
    let finalResult = eval(results);
    try {
      setResults(finalResult);
    } catch {
      setResults("ERROR");
    }
    if (localStorage.getItem("history") === null) {
      localStorage.setItem("history", JSON.stringify([{ [expression]: finalResult }]));
    } else {
      let value = JSON.parse(localStorage.getItem("history"));
      value.unshift({ [expression]: finalResult });
      localStorage.setItem("history", JSON.stringify(value));
    }
  };

  const showHistory = () => {
    setIsHistoryVisible((prevVal) => {
      return !prevVal;
    });
    if (isHistoryVisible) {
      setHistoryData(JSON.parse(localStorage.getItem("history")));
    }
  };

  return (
    <div className="calc-history-container">
      <div>
        {isHistoryVisible &&
          historyData.map((expRes) => {
            let key = Object.keys(expRes);
            const value = Object.values(expRes);
            console.log(key, value);

            return (
              <div className="history-container">
                <span>{key[0]} = </span>
                <span>{value[0]}</span>
              </div>
            );
          })}
      </div>
      <div className="calc-container">
        <form>
          <input type="text" value={results} />
        </form>

        <div className="keypad">
          <button id="clear" className="highlight" onClick={clear}>
            CE
          </button>
          <button id="backspace" className="highlight" onClick={backspace}>
            backspace
          </button>
          <button onClick={handleClick} className="highlight" name="/">
            &divide;
          </button>
          <button onClick={handleClick} name="7">
            7
          </button>
          <button onClick={handleClick} name="8">
            8
          </button>
          <button onClick={handleClick} name="9">
            9
          </button>
          <button onClick={handleClick} className="highlight" name="*">
            &times;
          </button>
          <button onClick={handleClick} name="4">
            4
          </button>
          <button onClick={handleClick} name="5">
            5
          </button>
          <button onClick={handleClick} name="6">
            6
          </button>
          <button onClick={handleClick} className="highlight" name="-">
            &ndash;
          </button>
          <button onClick={handleClick} name="1">
            1
          </button>
          <button onClick={handleClick} name="2">
            2
          </button>
          <button onClick={handleClick} name="3">
            3
          </button>
          <button onClick={handleClick} className="highlight" name="+">
            +
          </button>
          <button onClick={handleClick} name="0">
            0
          </button>
          <button onClick={handleClick} name=".">
            .
          </button>
          <button id="results" className="highlight" onClick={calculate}>
            =
          </button>
        </div>
        <div>
          <button onClick={showHistory} className="history">
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
