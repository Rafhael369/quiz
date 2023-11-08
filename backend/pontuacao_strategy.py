from abc import ABC

# classe abstrata que define a interface para os algoritmos de pontuacao, usando o padrao strategy
class PontuacaoStrategy(ABC):
    # metodo para calcular a pontuacao
    def calcular_pontuacao(self):
        pass

# classe que implementa o calcullo de pontuacao facil
class PontuacaoStrategyFacil(PontuacaoStrategy):
    # retorna 5 se a pergunta for facil (0)
    def calcular_pontuacao(self):
        return int(round((100/75)*5))

# classe que implementa o calcullo de pontuacao dificil
class PontuacaoStrategyDificil(PontuacaoStrategy):
    # retorna 10 se a pergunta for dificil (1)
    def calcular_pontuacao(self):
        return int(round((100/75)*10))