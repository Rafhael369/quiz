import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [inicio, setInicio] = useState(true);
  const [themes, setThemes] = useState([])
  const [quant, setQuant] = useState([2, 4, 6, 8, 10])
  const [iniciarPerguntas, setIniciarPerguntas] = useState(false)
  const [perguntas, setPerguntas] = useState([])
  const [acertou, setAcertou] = useState(false)
  const [errou, setErrou] = useState(false)
  const [quantidadeSelecionada, setquantidadeSelecionada] = useState()
  const [temaSelecionado, setTemaSelecionado] = useState('')
  const [resposta_correta, setResposta_correta] = useState()
  const [corTema, setCorTema] = useState()


  //reiniciar
  const reiniciar = async () => {
    // await axios.get('http://localhost:5000/temas')
    setStart(false)
    setIniciarPerguntas(false)
    setInicio(true)
    setShowScore(false)
  }


  // ao iniciar buscamos os temas
  const iniciar = async () => {
    setInicio(false)
    setStart(true)
    setCorTema()
    const themesAxios = await axios.get('http://localhost:5000/temas')
    setThemes(themesAxios.data)
    setPerguntas()
    setCurrentQuestion(0)
  }

  // ao selecionar o tema buscamos as perguntas
  const tema = async (tema, quantidade) => {
    var botao = document.getElementById("tema");
    botao.style.backgroundColor = "green"
    const perguntasAxios = await axios.get(`http://localhost:5000/perguntas/${tema}/${quantidade}`)
    setPerguntas(perguntasAxios.data)
    setStart(false)
    setIniciarPerguntas(true)
    setShowScore(false)
  }

  //quantidade de perguntas
  const escolha_quantidade = async (quant) => {
    tema(temaSelecionado, quant)
  }

  // ao clicar em uma opção de resposta
  const responder = async (pergunta, resposta) => {
    const correcaoAxios = await axios.get(`http://localhost:5000/correcao/${pergunta.id}/${resposta}`)

    if (correcaoAxios.data) {
      setResposta_correta(correcaoAxios.data.resposta)
      setScore(correcaoAxios.data.pontuacao)
      if (correcaoAxios.data.correcao) {
        setAcertou(true)
      } else {
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
      setResposta_correta('')
      setAcertou(false)
      setErrou(false)
    }, 1000);
  };

  return (
    <div className='app'>
      {/* Se o showScore for true, mostra a pontuação final */}
      {showScore ? (
        <div className='question-count'>
          <span>Quiz</span>
          <h2 style={{ marginTop: '50px' }}>Sua pontuação final é {score}/100</h2>
          <button onClick={reiniciar} style={{ marginTop: '80px' }}>Reiniciar Quiz</button>
        </div>
      ) : (
        <>
          {/* Se o showScore for false, quer dizer que é o inicio do quiz */}
          {inicio ? (
            <div className='question-count'>
              <span>Quiz</span>
              <button onClick={iniciar} style={{ marginTop: '80px' }}>Iniciar</button>
            </div>
          ) : (null)}
          {start || !quantidadeSelecionada && !inicio ? (
            <>
              <div className='question-count'>
                <span>Tema</span>
                <div>
                  {themes.map((theme, index) => (
                    <button style={{ marginTop: '10px',
                    backgroundColor: index === corTema ? 'green' : '' 
                  }} id="tema" onClick={() => [setTemaSelecionado(theme.nome), setCorTema(index)]}>{theme.nome}</button>))
                  }
                </div>
              </div>
              <div className='question-count'>
                <span>Quantidade</span>
                <div>
                  {quant.map((quant) => (
                    <button style={{ marginTop: '10px'}} onClick={() => [setquantidadeSelecionada(true), escolha_quantidade(quant)]}>{quant}</button>))
                  }
                </div>
              </div>
            </>
          ) : (
            null
          )}
          {iniciarPerguntas && quantidadeSelecionada ? (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Pergunta {currentQuestion + 1} de {perguntas.length}</span>
                </div>
                <div className='question-text'>Perg.: {perguntas[currentQuestion].questao}</div>
                {acertou && (
                  <span className='correct'>Parabéns, você acertou!</span>
                )}
                {errou && (
                  <span className='incorrect'>Que pena, você errou!</span>
                )}

              </div>
              <div className='answer-section'>
                {perguntas[currentQuestion].opcoes.map((answerOption, index) => (
                  <button style={{ marginTop: '10px',
                  backgroundColor: index === resposta_correta ? 'green' : '' 
                }} onClick={() => responder(perguntas[currentQuestion], index)}>{answerOption}</button>
                ))}
              </div>
            </>
          ) : (null)}
        </>
      )}
    </div>
  );
}