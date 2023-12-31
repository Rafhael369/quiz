from abc import ABC

# classe abstrata que define a interface para os algoritmos de pontuacao, usando o padrao strategy
class PontuacaoStrategy(ABC):    
    def __init__(self, peso=0):
        self.peso = peso
    # metodo para calcular a pontuacao
    def calcular_pontuacao(self):
        pass

# classe que implementa o calcullo de pontuacao facil
class PontuacaoStrategyFacil(PontuacaoStrategy):
    def __init__(self, peso=5):
        super().__init__(peso)
    # retorna 5 se a pergunta for facil (0)
    def calcular_pontuacao(self, quantidade):
        print(quantidade, int(round((100/75)*self.peso)))
        return int(round((100/75)*self.peso)) * (10/quantidade)

# classe que implementa o calcullo de pontuacao dificil
class PontuacaoStrategyDificil(PontuacaoStrategy):
    def __init__(self, peso=10):
        super().__init__(peso)
    # retorna 10 se a pergunta for dificil (1)
    def calcular_pontuacao(self, quantidade):
        print(quantidade, int(round((100/75)*self.peso)))
        return int(round((100/75)*self.peso)) * (10/quantidade)