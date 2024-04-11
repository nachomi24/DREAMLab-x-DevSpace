CREATE TABLE Salas (
	salaID VARCHAR(5) PRIMARY KEY,
    nombre VARCHAR(100),
    recursos VARCHAR(1000),
    horainicio time,
    horafin time
);

CREATE TABLE Profesor (
    nomina CHAR(8) PRIMARY KEY,
    nombre_completo VARCHAR(255),
    contrasena VARCHAR(255),
    tipo ENUM('profesor', 'administrador')
);

CREATE TABLE UF (
    UFID CHAR(7) PRIMARY KEY,
    nombre VARCHAR(255),
    puntos INT CHECK (puntos BETWEEN 1 AND 5),
    carrera CHAR(3),
    semestre INT CHECK (semestre BETWEEN 1 AND 8)
);

CREATE TABLE Taller (
    tallerID INT AUTO_INCREMENT PRIMARY KEY,
    nomina_profesor CHAR(8),
    UFID CHAR(7),
    nombre VARCHAR(255),
    cupo INT CHECK (cupo <= 35),
    hora_inicio TIME,
    hora_fin TIME,
    fecha DATE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nomina_profesor) REFERENCES Profesor(nomina),
    FOREIGN KEY (UFID) REFERENCES UF(UFID)
);
CREATE TABLE Estudiante(
	matricula CHAR(8) PRIMARY KEY,
    nombre VARCHAR(100),
    carrera VARCHAR(3),
    semestre INT check (semestre <=8)
);
create table Reservacion (
reservacionId int auto_increment primary key,
matricula char(8),
salaID varchar(5),
dia date,
hora_inicio time,
hora_fin time,
recursos varchar(1000),
personas int check (personas <= 15),
confirmada bool,
FOREIGN KEY (matricula) references Estudiante(matricula),
FOREIGN KEY (salaID) references Salas(salaID)
);	
CREATE TABLE EstudianteUF(
	matricula_estudiante CHAR(8),
    UFID_estudiante VARCHAR(7),
    FOREIGN KEY (matricula_estudiante) REFERENCES Estudiante(matricula),
    FOREIGN KEY (UFID_estudiante) REFERENCES UF(UFID),
    primary key (matricula_estudiante, UFID_estudiante)
);
CREATE TABLE SalaUF(
	salaID varchar(5),
    UFID char(7),
    FOREIGN KEY (salaID) REFERENCES Salas(salaID),
    PRIMARY KEY (salaID, UFID)
);
