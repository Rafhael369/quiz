import json

# classe para representar uma questao
class Questao:
    # metodo construtor (reorganizar)
    def __init__(self, questao, opcoes , resposta_correta, dificuldade, tema):
        self.questao = questao
        self.opcoes = opcoes
        self.resposta_correta = resposta_correta
        self.dificuldade = dificuldade
        self.tema = tema


    # metodo para corrigir a resposta 
    def corrigir(self, resposta_usuario):
        return resposta_usuario == str(self.resposta_correta)
    
     # metodo para criar as questoes (retirado do QuestaoFactory)
    def criar_questoes(self):
        objetos_questoes = []
        questoes = CarregarJson.organizar_perguntas()
        for q in questoes:
            objetos_questoes.append(QuestaoFactory.questao_factory(self, q))

        return objetos_questoes


class CarregarJson:
     # metodo para criar as perguntas
    def organizar_perguntas():
        todas_questoes = []
        # abre o arquivo json
        with open("quiz.json", "r") as arquivo:
            # carrega os dados do arquivo
            dados = json.load(arquivo)
            for questoes in dados["questoes"]:
                # cria uma questao e adiciona na lista
                todas_questoes.append([
                    questoes["questao"],
                    questoes["opcoes"],
                    questoes["resposta_correta"],
                    questoes["dificuldade"],
                    questoes["tema"]])
        # retorna a lista de questoes
        return todas_questoes



#  classe para criar as perguntas apartir do json, usando o padrao factory
class QuestaoFactory:
    
    # refatorando para usar o metodo factory
    def questao_factory(self, q):
        return Questao(q[0], q[1], q[2], q[3], q[4])