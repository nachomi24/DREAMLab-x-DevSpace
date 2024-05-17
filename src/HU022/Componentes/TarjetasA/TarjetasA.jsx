import React from 'react';
import './TarjetasA.css';



/*
@app.get('/api/reservaciones', tags=["Reservación"])
def consultar_reservaciones():
    cur = conn.cursor()
    query = '''
            SELECT Reservacion.*, estudiante.nombre
            FROM Reservacion
            INNER JOIN estudiante ON Reservacion.matricula = estudiante.matricula
    
    '''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    
    results = []
    for row in data:
        result = {
            "ReservacionID": row[0],
            "Matricula": row[1],
            "NombreEstudiante": row[9],  # Se supone que el nombre del estudiante es la columna 9 en los resultados de la consulta SQL
            "SalaID": row[2],
            "Dia": row[3].strftime('%Y-%m-%d'),
            "HoraInicio": str(row[4]),
            "HoraFin": str(row[5]),
            "Recursos": row[6],
            "Personas": row[7],
            "Confirmada": row[8]
        }
        results.append(result)  # Movido dentro del bucle for

    return JSONResponse(content=results, headers={"Access-Control-Allow-Origin": "*"})


*/


function TarjetasA({ datos }) {
  console.log("Datos recibidos en TarjetasA:", datos); // Registro de los datos recibidos

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };



/*
CHECRA QUEIRES DE BASE DE DATOS 
SERIA CAMBIAR BASE DE DATOS Y AGREGAR DOS COLUMNAS NUEVAS
SERIA CAMBIAR LAS RUTAS DEL API
SI NO HYA OTRA FORMA




*/

  const Tarjetas = ({
    ReservacionID,
    Matricula,
    NombreEstudiante,
    NombreSala,
    SalaID,
    Dia,
    HoraInicio,
    HoraFin,
    Recursos,
    Personas,
    Confirmada
  }) => {
    return (
      <div className="tarjeta-reserva">
        <div className="info-container">
          <div className="tarjeta-reserva-info">
            <h2>{NombreEstudiante}</h2>
            <p>{NombreSala}</p>
            <p>{convertirHora(HoraInicio)} - {convertirHora(HoraFin)}</p> {/* Convertir la hora aquí */}
          </div>
          <div className="tarjeta-reserva-botones">
            <button>DETALLES</button>
            <button>CONFIRMAR</button>
            <button>RECHAZAR</button>
          </div>
        </div>
      </div>
    );
  };

  console.log("Datos recibidos en TarjetasA:", datos); // Registrar los datos recibidos en la consola

  return (
    <div className="contenedor-tarjeta-general">
      
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
        <h1>RESERVACIONES PENDIENTES</h1>
        
          {/* Renderizar Tarjetas con datos si están disponibles */}
          {datos && datos.length > 0 && datos.map((dato) => (
            
            <Tarjetas
              key={dato.ReservacionID}
              {...dato}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TarjetasA;
