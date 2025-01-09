from flask import Flask, render_template, request, jsonify
import mysql.connector
import datetime
from flask_cors import CORS

app = Flask(__name__)
app.debug = True
CORS(app)  # Permite solicitudes desde dominios diferentes

# Configuración de la base de datos
db_config = {
    'host': 'eif037975979db.ch00woi2qdij.us-east-1.rds.amazonaws.com',
    'user': 'admin',
    'password': 'Pedro3103$A',
    'database': 'dashb1a',
    'port': 3306  # Puerto predeterminado de MySQL
}

def connect_to_db():
    """Conectar a la base de datos MySQL."""
    try:
        return mysql.connector.connect(**db_config)
    except mysql.connector.Error as err:
        print(f"Error al conectar a la base de datos: {err}")
        raise

@app.route('/')
def home():
    app.logger.info("Rendering index.html")
    return render_template('index.html')

@app.route('/save_data', methods=['POST'])
def save_data():
    """Guardar un nuevo valor de dinero en la tabla y devolver el total actualizado."""
    data = request.json  # Recibimos los datos del cliente

    if 'dinero' in data:
        value = data['dinero']
        try:
            value = float(value)
            if value >= 0:
                timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                # Conectar a la base de datos
                conn = connect_to_db()
                cursor = conn.cursor()

                # Insertar el nuevo valor en la tabla
                cursor.execute(
                    "INSERT INTO dinerotable (timestamp, dinero_value) VALUES (%s, %s)",
                    (timestamp, value)
                )
                conn.commit()

                # Obtener el total actualizado
                cursor.execute("SELECT SUM(dinero_value) FROM dinerotable")
                total_ventas = cursor.fetchone()[0] or 0.0

                cursor.close()
                conn.close()

                print(f"Saved dinero: {value} at {timestamp}")
                return jsonify({'message': 'Data saved successfully', 'total_ventas': total_ventas}), 200
            else:
                return jsonify({'message': 'Invalid dinero value'}), 400
        except ValueError:
            return jsonify({'message': 'Invalid data format'}), 400

    return jsonify({'message': 'No dinero value provided'}), 400

@app.route('/get_dinero_data', methods=['GET'])
def get_dinero_data():
    """Leer los datos de dinero de la tabla y enviarlos al cliente con el total calculado."""
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT timestamp, dinero_value FROM dinerotable")
    rows = cursor.fetchall()

    data = [{'timestamp': row['timestamp'].strftime('%Y-%m-%d %H:%M:%S'), 'value': row['dinero_value']} for row in rows]

    # Calcular el total de ventas
    cursor.execute("SELECT SUM(dinero_value) FROM dinerotable")
    total_ventas = cursor.fetchone()['SUM(dinero_value)'] or 0.0

    cursor.close()
    conn.close()

    return jsonify({'data': data, 'total_ventas': total_ventas})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
