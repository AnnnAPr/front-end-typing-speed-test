import { useState, useEffect, useRef } from "react";
import {useDrag} from "react-use-gesture";
import React from "react"
import axios from "axios";
import Word from "./components/Word";
import Timer from "./components/Timer";
import useSound from 'use-sound';
import boom from "./sounds/soft.mp3"
import meow from "./sounds/meow.mp3"
import "./App.css"; 
import Modal from "./components/Modal"
import ModalList from "./components/ModalList";
import EndModal from "./components/EndModal";
import cat from "./images/cat1.jpg"
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const App = () => {

  const SECONDS = 60

  const URL = process.env.REACT_APP_BACKEND_URL
  const [typeSound] = useSound(boom)
  const [meowSound] = useSound(meow)
  const inputElement = useRef(null);

  const [imgPos, setImgPos] = useState({x: 0, y: 0})
  const bingImgPos = useDrag((params) => {
    setImgPos({
      x: params.offset[0],
      y: params.offset[1]
    })
    focusInput();
  });

  const [listOfSamples, setListOfSamples] = useState([])
  const [userInput, setUserInput] = useState("");
  const [sample, setSample] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [timerActive, setTimerActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)
  const [bestScore, setBestScore] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenML, setIsOpenML] = useState(false)
  const [id, setId] = useState("")
  const [key, setKey] = useState(0);
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [isOpenEndModal, setIsOpenEndModal] = useState(false)

  // data for global scores
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Num of people write",
        data: data,
        backgroundColor: "#FF5F1F",
        borderColor: "black",
        hoverBackgroundColor: "black",
      }
    ],
  }
  

  const correctWords = correctWordArray.filter(Boolean).length
  const allWords = correctWordArray.length
  const modalRef = useRef()
  const modalRef1 = useRef()

  
  useEffect(() => {
    axios
    .get(URL + "samples", )
    .then((response) => {
      let randNumber = Math.floor(Math.random() * response.data.length);
      let obj = response.data[randNumber]
      setSample(obj.text)
      setId(obj._id)
      focusInput()
      setListOfSamples(response.data)
    })
    .catch((error) => console.log(error.data))
  }, [isOpenML])

  const restart = () => { 
    axios
    .get(URL + "samples", )
    .then((response) => {
      let randNumber = Math.floor(Math.random() * response.data.length);
      const obj = response.data[randNumber]
      setId(obj._id)
      setSample(obj.text)
      setUserInput("")
      setTimerActive(false)
      setKey(prevKey => prevKey + 1)
      setIsDisabled(false)
      setActiveWordIndex(0)
      focusInput()
      setCorrectWordArray([])
      setIsOpen(false)
      setIsOpenEndModal(false)
      
    })
    .catch((error) => console.log(error.data))
  }

  const finalLabels = (scoresArr) => {
    const finalLabelData = []
    scoresArr.forEach(score => finalLabelData.push(score.concat(" w/m")))
    return finalLabelData
  }

  const getBestScore = () => {
    axios
    .get(URL + "samples")
    .then(response => {
      const samples = response.data
      const bestScores = []
      const allScores = []
      const allScoresFreq = {}
      samples.forEach(sample => {
        let bestScoreBySample = Math.max(...sample.scores)
        bestScores.push(bestScoreBySample)
        sample.scores.forEach(score => allScores.push(score))
        setBestScore(Math.max(...bestScores))
      })

      allScores.forEach(score => {allScoresFreq[score] = (allScoresFreq[score] || 0) + 1})

      // const finalLabels = []
      // Object.keys(allScoresFreq).forEach(score => finalLabels.push(score.concat(" w/m")))
      // console.log("FINAL", finalLabels)
      setLabels(finalLabels(Object.keys(allScoresFreq)))
      // setLabels(finalLabels)
      // setLabels(Object.keys(allScoresFreq))

      setData(Object.values(allScoresFreq))
    })
    .catch(error => console.log(error.data))
  }

  const BestScore = () => {
    getBestScore()
    openModal()
  }

  const saveScore = (id) => {
    axios
    .patch(URL + "samples/" + id + "/scores", {score: correctWords})
    .then()
    .catch(error => console.log(error.data))

    alert(`Your score ${correctWords} saved`)

  }

  const allSamplesCharts = () => {
    openModalList()

  }

  const processInput = (value) => {
    setTimerActive(true)
    if (value.endsWith(" ")) {

      setActiveWordIndex(index => index + 1)
      setUserInput("")

      setCorrectWordArray((data) => {
        const word = value.trim()
        const newResult = [...data]
        newResult[activeWordIndex] = word === sample.split(" ")[activeWordIndex]
        return newResult
      })
    
    } else {
      setUserInput(value)
    }
    
  }

  const keyDown = () => {
    typeSound()
  }

  const meowPet = () => {
    meowSound()
  }

  const focusInput = () => {
    inputElement.current.focus();
  };

  const openModalList = () => {
    setIsOpenML(true);
  }


  const closeModalList = () => {
    setIsOpenML(false)
  }

  const closeModalListOutside = e => {
    if (modalRef1.current === e.target) {
      closeModalList()
    }
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const closeModalOutside = e => {
    if (modalRef.current === e.target) {
      closeModal()
    }
  }

  const closeEndModal = () => {
    setIsOpenEndModal(false)
  }

  return (
    <div className="transparency" >
      <div className="space">
        <span {...bingImgPos()} style={{
          position: "relative",
          top: imgPos.y,
          left: imgPos.x,
        }}>

          <figure class="figure">
            <img src={cat} class="figure-img img-fluid rounded boo" alt="cat" onMouseEnter={() => {meowPet()}}/>
            <figcaption class="figure-caption text-left">***click on me two times and hold to move</figcaption>
          </figure>
        </span>
        <span className="h1">Typing speed test</span>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12 offset-md-0">
            <div className="data">
              <span className="wpm">Correct wpm: {(correctWords || 0).toFixed(0 )}
                <div>
                  <button type="button" className="btn btn-secondary" 
                  onClick={() => {
                    restart(); 
                    focusInput();
                  }}>Restart</button>
                </div>
                <div>
                  <button type="button" className="btn btn-secondary" 
                            onClick={() => allSamplesCharts()}>
                    Charts by samples
                  </button>
                </div>
              </span>

              <Timer key={key} setIsDisabled={setIsDisabled} timerActive={timerActive}
                      SECONDS={SECONDS} isOpenEndModal={isOpenEndModal} setIsOpenEndModal={setIsOpenEndModal}/>

              <span className="accuracy">Accuracy: {Math.round((correctWords / allWords) * 100) || 0} %
                <div>
                  <button type="button" className="btn btn-secondary" onClick={BestScore}>
                    Best score
                  </button>
                </div>
              </span>
          </div>
            <p className="sample">{sample.split(" ").map((word, index) => {
                return <Word word={word}
                      active={index === activeWordIndex}
                      correct={correctWordArray[index]}
                      />
                  })}
            </p>
            <textarea value={userInput}
                type="text"
                placeholder="Start typing..."
                className="form-control"
                ref={inputElement}
                onChange={(e) => processInput(e.target.value)}
                onKeyDown={keyDown}
                disabled={isDisabled}
            >
            </textarea>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen}
            modalRef={modalRef}
            closeModalOutside={closeModalOutside}
            bestScore={bestScore}
            closeModal={closeModal}
            chartData={chartData}
            focusInput={focusInput}
      />

      <ModalList isOpenML={isOpenML}
                closeModalList={closeModalList}
                listOfSamples={listOfSamples}
                finalLabels={finalLabels}
                modalRef1={modalRef1}
                closeModalListOutside={closeModalListOutside}
      />

      <EndModal closeEndModal={closeEndModal} isOpenEndModal={isOpenEndModal}
                saveScore={saveScore} id={id} correctWords={correctWords}
                restart={restart} allWords={allWords} focusInput={focusInput}
      /> 
      
      
    </div>

    
  );


}

export default App;