from flask import jsonify
from questoes_factory import QuestaoFactory, Questao
from pontuacao_strategy import PontuacaoStrategyFacil, PontuacaoStrategyDificil

class Quiz:

    # usando o padrao singleton, ctrl+c ctrl+v
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.__init__()
        return cls._instance

    # construtor
    def __init__(self):
        self.tema = None
        self.questoes = Questao.criar_questoes(self)
        self.pontuacao = 0
        self.questao_atual = 0
        self.pontuacao_strategy = None

    # escolha da classe de pontuacao conforme a dificuldade da pergunta (automatico)
    def escolher_pontuacao_strategy(self):
        # usando o padrao strategy
        if self.questoes[self.questao_atual].dificuldade == 0:
            self.pontuacao_strategy = PontuacaoStrategyFacil()
        else:
            self.pontuacao_strategy = PontuacaoStrategyDificil()    

    # metodo para listar o nome dos temas das perguntas e permitir que o usuario escolha um
    def temas(self):
        temas = [] 
        temas_formatado = []     

        # percorre os temas e guarda
        for tema in self.questoes:
            if temas == []:
                temas.append(tema.tema)
            if tema.tema != temas[-1]:
                temas.append(tema.tema)

        temas_formatado = [{"id": i, "nome": tema} for i, tema in enumerate(temas)]
        return temas_formatado

    def perguntas(self, tema):
        self.questoes = [questao for questao in self.questoes if questao.tema == tema]  
        perguntas_formatado = [{"id": i, "questao": questao.questao, "opcoes": questao.opcoes, 
                                "resposta_correta": questao.resposta_correta, "dificuldade": questao.dificuldade} for i, questao in enumerate(self.questoes)]
        return perguntas_formatado     

    def correcao(self, pergunta_id, resposta):
        self.questao_atual = int(pergunta_id)
        if self.questoes[self.questao_atual].corrigir(resposta):
            self.escolher_pontuacao_strategy()
            self.pontuacao += self.pontuacao_strategy.calcular_pontuacao()
            return jsonify({"pontuacao": self.pontuacao, "correcao": True})
        else:
            return jsonify({"pontuacao": self.pontuacao, "correcao": False})