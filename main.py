from flask import Flask, jsonify, request
from flask_cors import CORS
from quiz_app import Quiz

quiz = Quiz()
app = Flask(__name__)
CORS(app)

@app.route("/temas")
def temas():
    return quiz.temas()

@app.route("/perguntas/<tema>", methods=["GET"])
def trazer_perguntas(tema):
    print(quiz.perguntas("Python"))
    return quiz.perguntas(tema)

@app.route("/finalizar", methods=["GET"])
def finalizar():
    if request.method == "POST":
        return jsonify({"message": "POST"})
    if request.method == "GET":
        return jsonify({"message": "GET"})
    
if __name__ == "__main__":
    app.run(debug=True)
    