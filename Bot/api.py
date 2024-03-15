from flask import Flask, render_template, jsonify, send_from_directory, request
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
import requests, os, json

app = Flask(__name__, static_folder='static', template_folder='templates')
mail = Mail(app)

app.config['MYSQL_HOST'] = '172.191.21.164'
app.config['MYSQL_USER'] = 'devspacenet'
app.config['MYSQL_PASSWORD'] = 'Shakirarocks123!'
app.config['MYSQL_DB'] = 'SistemaReservacionesPrueba'
mysql = MySQL(app)

@app.route('/')
def index():
    # Renderiza el archivo bot.html
    return render_template('bot.html')

@app.route('/congrats')
def congrats():
    # Renderiza el archivo congrats.html
    return render_template('congrats.html')

@app.route('/inicio')
def inicio():
    # Renderiza el archivo inicio.html
    return render_template('inicio.html')

@app.route('/secciones')
def secciones():
    # Renderiza el archivo bot.html
    return render_template('secciones.html')

@app.route('/perfil')
def perfil():
    # Renderiza el archivo perfil.html
    return render_template('perfil.html')

@app.route('/perfil/<string:matricula>')
def perfil_especifico(matricula):
    # Renderiza el archivo perfil.html
    return render_template('perfil_template.html', matricula=matricula)

@app.route('/api/new_chat/<string:query>', methods=['GET', 'POST'])
def query_new_chat(query):
    if request.method == 'POST':
        ID = "clts78yhx007ro98iwmxb43gz"
        TOKEN = "09942a07-4d7d-4cce-a166-f15f04a66605"
        DREAMY_API = f"https://api.chaindesk.ai/agents/{ID}/query"

        payload = {
            "query": query
        }
        
        headers = {
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json"
        }

        response = requests.post(DREAMY_API, json=payload, headers=headers)
        data = response.json()

        return jsonify(data), response.status_code
    else:
        return jsonify({"error": "Método no permitido. Por favor, envíe una solicitud POST."}), 405

@app.route('/api/existing_chat/<string:conversationId>/<string:query>', methods=['GET', 'POST'])
def query_existing_chat(conversationId, query):
    if request.method == 'POST':
        ID = "clts78yhx007ro98iwmxb43gz"
        TOKEN = "09942a07-4d7d-4cce-a166-f15f04a66605"
        DREAMY_API = f"https://api.chaindesk.ai/agents/{ID}/query"

        payload = {
            "conversationId": conversationId,
            "query": query
        }
        
        headers = {
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json"
        }

        response = requests.post(DREAMY_API, json=payload, headers=headers)
        data = response.json()

        return jsonify(data), response.status_code
    else:
        return jsonify({"error": "Método no permitido. Por favor, envíe una solicitud POST."}), 405
    
@app.route('/api/reservacion', methods=['POST'])
def insertar_reservacion() :
    # Ejemplo de publicación a la base de datos
    #request.json es el payload a recibir en la solicitud
    data = request.json
    #separa todos los elementos del json e iguala las variables hacia estos elementos
    matricula = data['Matricula']
    id_sala = data['IDSala']
    dia = data['Dia']
    hora_inicio = data['HoraInicio']
    hora_fin = data['HoraFin']
    recursos = data['Recursos']
    personas = data['Personas']
    cur = mysql.connection.cursor()
    #se construye el query
    query = """INSERT INTO Reservacion (Matricula, IDSala, Dia, HoraInicio, HoraFin, Recursos, Personas) 
               VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    values = (matricula, id_sala, dia, hora_inicio, hora_fin, recursos, personas)
    #se ejecuta el query
    cur.execute(query, values)
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Datos insertados en la tabla Reservacion correctamente'})
    

@app.route('/api/consulta', methods=['GET'])
def consulta():
    # Ejemplo de consulta a la base de datos
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM Reservacion;''')
    data = cur.fetchall()
    cur.close()

    # Crear una lista de diccionarios para los resultados
    results = []
    for row in data:
        result = {
            'ID': row[0],
            'Matricula': row[1],
            'IDSala': row[2],
            'Dia': row[3].strftime('%Y-%m-%d'),  # Convertir a formato de fecha ISO
            'HoraInicio': str(row[4]),  # Convertir a formato de cadena
            'HoraFin': str(row[5]),  # Convertir a formato de cadena
            'Recursos': row[6],
            'Personas': row[7]
        }
        results.append(result)

    # Devolver los resultados como JSON
    return jsonify(results)

@app.route('/api/consulta/<string:matricula>', methods=['GET'])
def consulta_especifica(matricula):
    # Ejemplo de consulta a la base de datos
    cur = mysql.connection.cursor()
    cur.execute('''
        SELECT r.*, u.Nombre, u.Carrera 
        FROM Reservacion r 
        JOIN Usuario u ON r.Matricula = u.Matricula 
        WHERE r.Matricula = %s;
                ''', (matricula,))
    data = cur.fetchall()
    cur.close()

    # Crear una lista de diccionarios para los resultados
    results = []
    for row in data:
        result = {
            'ID': row[0],
            'Matricula': row[1],
            'IDSala': row[2],
            'Dia': row[3].strftime('%Y-%m-%d'),  # Convertir a formato de fecha ISO
            'HoraInicio': str(row[4]),  # Convertir a formato de cadena
            'HoraFin': str(row[5]),  # Convertir a formato de cadena
            'Recursos': row[6],
            'Personas': row[7],
            'Nombre': row[8],
            'Carrera': row[9]
        }
        results.append(result)

    # Devolver los resultados como JSON
    return jsonify(results)

@app.route('/api/enviar-correo/<string:matricula>', methods=['POST'])
def enviar_correo(matricula):
    data = request.json

    # Extraer el contenido del correo desde los datos recibidos
    contenido_correo = data['contenido_correo']

    # Construir el mensaje de correo
    mensaje = Message(subject="RESERVACIÓN",
                      sender="dreamy@dreamlab.com",
                      recipients=[f"{matricula}@tec.mx"],
                      body=contenido_correo)

    # Enviar el correo
    mail.send(mensaje)

    return jsonify({"mensaje": "Correo enviado correctamente"})

if __name__ == '__main__':
    app.run(debug=True)