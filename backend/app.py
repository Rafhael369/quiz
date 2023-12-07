from flask import Flask, jsonify, request
from flask_cors import CORS
from quiz import Quiz

# quiz = Quiz()
app = Flask(__name__)
CORS(app)


@app.route("/correcao/<pergunta_id>/<resposta>")
def corrigir(pergunta_id, resposta):
    global quiz
    return quiz.correcao(pergunta_id, resposta)

@app.route("/temas")
def temas():
    global quiz
    quiz = Quiz()
    return quiz.temas()

@app.route("/perguntas/<tema>/<quantidade>", methods=["GET"])
def trazer_perguntas(tema, quantidade):
    global quiz
    return quiz.perguntas(tema, quantidade)
    
if __name__ == "__main__":
    app.run(debug=True)
    