import { useState, useEffect, useRef } from "react";
import {useDrag} from "react-use-gesture";
import Button from 'react-bootstrap/Button';
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

const App = () => {

  const SECONDS = 60

  // const URL = process.env.REACT_APP_BACKEND_URL1
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
  const [title, setTitle] = useState("")
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [timerActive, setTimerActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)
  const [bestScore, setBestScore] = useState(0)
  const [bestScoreName, setBestScoreName] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenML, setIsOpenML] = useState(false)
  const [id, setId] = useState("")
  const [key, setKey] = useState(0);
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [isOpenEndModal, setIsOpenEndModal] = useState(false)
  const [checked, setChecked] = useState(true)

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
      setTitle(obj.title)
      setId(obj._id)
      focusInput()
      setListOfSamples(response.data)
    })
    .catch((error) => console.log(error.data))
  }, [])

  const restart = () => { 
    axios
    .get(URL + "samples", )
    .then((response) => {
      let randNumber = Math.floor(Math.random() * response.data.length);
      const obj = response.data[randNumber]
      setId(obj._id)
      setSample(obj.text)
      setTitle(obj.title)
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
      const allScoresFreq = {}
      let bestScoreName = ""
      const scoresData = []
      const userNames = []

      // Get array of all scores and array of all names
      samples.forEach(sample => {
        sample.scores.forEach(data => {
          scoresData.push(data.score);
          userNames.push(data.name)
        })
      })

    let maxScore = scoresData[0]
    let maxScoreIndex = 0
    for (let i = 0; i < scoresData.length; i++) {
    if (maxScore < scoresData[i]) {
      maxScore = scoresData[i];
      maxScoreIndex = i
    }
    }
    bestScoreName = userNames[maxScoreIndex]

    // Get object of scores and their frequencies 
    scoresData.forEach(score => {
    allScoresFreq[score] = (allScoresFreq[score] || 0) + 1
    })
    setBestScore(maxScore)
    setBestScoreName(bestScoreName)
    setLabels(finalLabels(Object.keys(allScoresFreq)))
    setData(Object.values(allScoresFreq))
    })
    .catch(error => console.log(error.data))
  }

  const BestScore = () => {
    getBestScore()
    openModal()
  }

  const addNameScore = (id, userName, score) => {
    axios
    .patch(URL + "samples/" + id + "/scores", {name: userName.name, score: score})
    .then()
    .catch(error => console.log(error.data))

    alert(`Your score ${correctWords} saved`)
    restart()
  }

  const allSamplesCharts = () => {
    openModalList();
    axios
    .get(URL + "samples", )
    .then((response) => {
      setListOfSamples(response.data)
    })
    .catch((error) => console.log(error.data))
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
    if (checked) {
      typeSound()
    }
  }

  const meowPet = () => {
    if (checked) {
      meowSound()
    }
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
        <span {...bingImgPos()} className="pic" style={{
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
                            onClick={() => {allSamplesCharts()}}>
                    Charts by samples
                  </button>
                </div>
              </span>

              <div>
              <Timer key={key} setIsDisabled={setIsDisabled} timerActive={timerActive}
                      SECONDS={SECONDS} isOpenEndModal={isOpenEndModal} setIsOpenEndModal={setIsOpenEndModal}/>
              <p className="title">Title: <u>{title}</u></p>
              </div>
              <span className="accuracy">Accuracy: {Math.round((correctWords / allWords) * 100) || 0} %
                <div>
                  <button type="button" className="btn btn-secondary" onClick={BestScore}>
                    Best score
                  </button>
                  <div>
                    <Button variant={checked ? "primary" : "light"}
                      onClick={() => {
                        setChecked(!checked);
                        focusInput()
                      }}
                    >Sound {checked ? "OFF" : "ON"}</Button>
                  </div>
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
            focusInput={focusInput}
            bestScoreName={bestScoreName}
            labels={labels}
            data={data}
      />

      <ModalList isOpenML={isOpenML}
                closeModalList={closeModalList}
                listOfSamples={listOfSamples}
                finalLabels={finalLabels}
                modalRef1={modalRef1}
                closeModalListOutside={closeModalListOutside}
      />

      <EndModal closeEndModal={closeEndModal} isOpenEndModal={isOpenEndModal}
                id={id} correctWords={correctWords}
                restart={restart} allWords={allWords} focusInput={focusInput}
                inputElement={inputElement}
                addNameScore={addNameScore}
      /> 
      
    </div>
  );
}

export default App;