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
      <div className="calc-container">
        <form>
          <input type="text" value={results} />
        </form>

        <div className="keypad">
          <button className="numeric highlight" id="clear" onClick={clear}>
            CE
          </button>
          <button className="numeric highlight" id="backspace" onClick={backspace}>
            backspace
          </button>
          <button className="numeric highlight" onClick={handleClick} name="/">
            &divide;
          </button>
          <button className="numeric" onClick={handleClick} name="7">
            7
          </button>
          <button className="numeric" onClick={handleClick} name="8">
            8
          </button>
          <button className="numeric" onClick={handleClick} name="9">
            9
          </button>
          <button className="numeric highlight" onClick={handleClick} name="*">
            &times;
          </button>
          <button className="numeric" onClick={handleClick} name="4">
            4
          </button>
          <button className="numeric" onClick={handleClick} name="5">
            5
          </button>
          <button className="numeric" onClick={handleClick} name="6">
            6
          </button>
          <button className="numeric highlight" onClick={handleClick} name="-">
            &ndash;
          </button>
          <button className="numeric" onClick={handleClick} name="1">
            1
          </button>
          <button className="numeric" onClick={handleClick} name="2">
            2
          </button>
          <button className="numeric" onClick={handleClick} name="3">
            3
          </button>
          <button className="numeric highlight" onClick={handleClick} name="+">
            +
          </button>
          <button className="numeric" onClick={handleClick} name="0">
            0
          </button>
          <button className="numeric" onClick={handleClick} name=".">
            .
          </button>
          <button className="numeric highlight" id="results" onClick={calculate}>
            =
          </button>
        </div>
      </div>
      <div className="history-container">
        <button className="numeric history highlight" onClick={showHistory}>
          History
        </button>
        <div>
          {isHistoryVisible &&
            historyData.map((expRes) => {
              let key = Object.keys(expRes);
              const value = Object.values(expRes);
              console.log(key, value);

              return (
                <div className="historyData-container">
                  <div className="key">{key[0]} = </div>
                  <div className="value">{value[0]}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
