import { useState } from "react";
import "./App.css";
import CalcButton from "./Components/CalcButtons/CalcButtons.jsx";
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
          <input type="text" value={results} placeholder="0" />
        </form>

        <div className="keypad">
          <CalcButton id="clear" onClick={clear} btnName="CE" />
          <CalcButton className="numeric highlight" id="backspace" onClick={backspace} />

          <CalcButton className=" highlight" onClick={handleClick} btnName="&divide;" />

          <CalcButton onClick={handleClick} btnName="7" />

          <CalcButton onClick={handleClick} btnName="8" />

          <CalcButton onClick={handleClick} btnName="9" />

          <CalcButton className=" highlight" onClick={handleClick} btnName="&times;" />

          <CalcButton onClick={handleClick} btnName="4" />

          <CalcButton onClick={handleClick} btnName="5" />

          <CalcButton onClick={handleClick} btnName="6" />

          <CalcButton className=" highlight" onClick={handleClick} btnName="&ndash;" />

          <CalcButton onClick={handleClick} btnName="1" />

          <CalcButton onClick={handleClick} btnName="2" />

          <CalcButton onClick={handleClick} btnName="3" />

          <CalcButton className=" highlight" onClick={handleClick} btnName="+" />

          <CalcButton onClick={handleClick} btnName="0" />

          <CalcButton onClick={handleClick} btnName="." />

          <CalcButton className=" highlight" id="results" btnName="=" onClick={calculate} />
        </div>
      </div>
      <div className="history-container">
        <CalcButton className=" history highlight" onClick={showHistory} btnName="History" />

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
