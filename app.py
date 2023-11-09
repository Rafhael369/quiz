from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.quiz import Quiz

quiz = Quiz()
app = Flask(__name__)
CORS(app)


@app.route("/correcao/<pergunta_id>/<resposta>")
def corrigir(pergunta_id, resposta):
    return quiz.correcao(pergunta_id, resposta)

@app.route("/temas")
def temas():
    return quiz.temas()

@app.route("/perguntas/<tema>/<quantidade>", methods=["GET"])
def trazer_perguntas(tema, quantidade):
    return quiz.perguntas(tema, quantidade)

@app.route("/finalizar", methods=["GET"])
def finalizar():
    if request.method == "POST":
        return jsonify({"message": "POST"})
    if request.method == "GET":
        return jsonify({"message": "GET"})
    
if __name__ == "__main__":
    app.run(debug=True)
    