import os
from datetime import datetime

def save_to_kwh_table(kwh_value):
    """Guardar un valor de kWh con fecha y hora."""
    if not os.path.exists('data'):
        os.makedirs('data')

    file_path = 'data/kwh_table.txt'
    with open(file_path, 'a') as f:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        f.write(f"{timestamp}, {kwh_value}\n")
    print(f"Saved kWh: {kwh_value} at {timestamp}")

def save_to_agua_table(agua_value):
    """Guardar un valor de Agua m³ con fecha y hora."""
    if not os.path.exists('data'):
        os.makedirs('data')

    file_path = 'data/agua_table.txt'
    with open(file_path, 'a') as f:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        f.write(f"{timestamp}, {agua_value}\n")
    print(f"Saved Agua m³: {agua_value} at {timestamp}")

def save_to_dinero_table(dinero_value):
    """Guardar un valor de dinero con fecha y hora."""
    if not os.path.exists('data'):
        os.makedirs('data')

    file_path = 'data/dinero_table.txt'
    with open(file_path, 'a') as f:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Formato completo fecha y hora
        f.write(f"{timestamp}, {dinero_value}\n")
    print(f"Saved dinero: {dinero_value} at {timestamp}")