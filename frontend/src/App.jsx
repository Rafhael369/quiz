import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [inicio, setInicio] = useState(true);
  const [themes, setThemes] = useState([])
  const [iniciarPerguntas, setIniciarPerguntas] = useState(false)
  const [perguntas, setPerguntas] = useState([])
  const [correcao, setCorrecao] = useState([])
  const [acertou, setAcertou] = useState(false)
  const [errou, setErrou] = useState(false)

  const iniciar = async () => {
    setInicio(false)
    setStart(true)
    const themesAxios = await axios.get('http://localhost:5000/temas')
    setThemes(themesAxios.data)
  }

  const tema = async (nome) => {
    const perguntasAxios = await axios.get(`http://localhost:5000/perguntas/${nome}`)
    setPerguntas(perguntasAxios.data)
    setStart(false)
    setIniciarPerguntas(true)
  }


	const handleAnswerOptionClick = async (pergunta, resposta) => {
    const correcaoAxios = await axios.get(`http://localhost:5000/correcao/${pergunta.id}/${resposta}`)
    setCorrecao(correcaoAxios.data)

    if(correcao) {
      console.log(correcao)
      setScore(correcao.pontuacao)
      if (correcao.correcao) {
        console.log('acertou')
        setAcertou(true)
      } else {
        console.log('errou')
        setErrou(true)
      }
    }
    // delay de 1 segundo
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < perguntas.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      } 
      setAcertou(false)
      setErrou(false)
    }, 700);

	};

	return (
		<div className='app'>
			{showScore ? (
      <>
      <div className='question-count'>
        <span>Quiz</span>
        <h3>Sua pontuação final é {score}/100</h3>
      </div>
      </>
			) : (
        <>
        {inicio ? (
          <>
						<div className='question-count'>
							<span>Quiz</span>
              <h1></h1>
              <button onClick={iniciar}>Iniciar</button>
						</div>
          </>
        ) : (
          <>
          </>
        )}
        {start ? (
          <>
          <div className='question-section'>
						<div className='question-count'>
							<span>Tema</span>
						</div>
					</div>
					<div className='answer-section'>
            {themes.map((theme) => (
              <button onClick={() => tema(theme.nome)}>{theme.nome}</button>))  
            }
					</div>
          </>
				) : (
          <>
          </>
        )}
        {iniciarPerguntas ? (
          <>
          <div className='question-section'>
						<div className='question-count'>
							<span>Pergunta {currentQuestion + 1}</span>/{perguntas.length}
						</div>
						<div className='question-text'>{perguntas[currentQuestion].questao}</div>
            {/* <div className='answaer-section'> */}
            {acertou && (
              <span className='correct'>Parabéns, você acertou!</span>
            )} 
            {errou && (
              <span className='incorrect'>Que pena, você errou!</span>
            )}
              
					</div>
					<div className='answer-section'>
						{perguntas[currentQuestion].opcoes.map((answerOption, index) => (
              <button onClick={() => handleAnswerOptionClick(perguntas[currentQuestion], index)}>{answerOption}</button>
            ))}
					</div>
          </>
        ) : (
          <>
          </>
        )
        }
        </>
			)}
		</div>
	);
}