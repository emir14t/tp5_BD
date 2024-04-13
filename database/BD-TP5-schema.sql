DROP SCHEMA IF EXISTS ornithologue_bd CASCADE;

CREATE SCHEMA ornithologue_bd;
SET search_path = ornithologue_bd;


CREATE TABLE Observateur (
    idobservateur VARCHAR(10) PRIMARY KEY,
    nomobservateur VARCHAR(255),
    contactobservateur VARCHAR(255)
);

CREATE TABLE Rapport (
    idrapport VARCHAR(10) PRIMARY KEY,
    titrerapport VARCHAR(255),
    contenurapport TEXT,
    idobservateur VARCHAR(255) NOT NULL,
    dateredaction DATE NOT NULL,
    FOREIGN KEY (idobservateur) REFERENCES Observateur(idobservateur)
);

CREATE TABLE Communaute (
    nomcommunaute VARCHAR(255) PRIMARY KEY,
    descriptioncomm TEXT
);

CREATE TABLE Amateur (
    idobservateur VARCHAR(10) PRIMARY KEY,
    scorefiabilite INT,
    nomcommunaute VARCHAR(255) NOT NULL,
    FOREIGN KEY (nomcommunaute) REFERENCES Communaute(nomcommunaute),
    FOREIGN KEY (idobservateur) REFERENCES Observateur(idobservateur)
);

CREATE TABLE Professionnel (
    idobservateur VARCHAR(10) PRIMARY KEY,
    numerolicense VARCHAR(15),
    FOREIGN KEY (idobservateur) REFERENCES Observateur(idobservateur)
);

CREATE TABLE Expertise (
    champsexpertise VARCHAR(255),
    nomcommunaute VARCHAR(255),
    PRIMARY KEY (champsexpertise, nomcommunaute),
    FOREIGN KEY (nomcommunaute) REFERENCES Communaute(nomcommunaute)
);

CREATE TABLE Especeoiseau (
    nomscientifique VARCHAR(255) PRIMARY KEY,
    nomcommun VARCHAR(255),
    statutspeces VARCHAR(255),
    nomscientifiquecomsommer VARCHAR(255), -- nom scientifique du prédateur de l'espèce courante
    FOREIGN KEY (nomscientifiquecomsommer) REFERENCES Especeoiseau(nomscientifique)
);

CREATE TABLE Observation (
    idobservation VARCHAR(10) PRIMARY KEY,
    notes TEXT,
    dateobs DATE,
    idrapport VARCHAR(10) NOT NULL,
    idobservateur VARCHAR(10) NOT NULL,
    nomscientifique VARCHAR(255) NOT NULL,
    FOREIGN KEY (idrapport) REFERENCES Rapport(idrapport),
    FOREIGN KEY (idobservateur) REFERENCES Observateur(idobservateur),
    FOREIGN KEY (nomscientifique) REFERENCES Especeoiseau(nomscientifique)
);

CREATE TABLE Zonegeographique (
    nomzone VARCHAR(255) PRIMARY KEY,
    descriptionzone TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE Resider (
    nomscientifique VARCHAR(255),
    nomzone VARCHAR(255),
    nbindividus INT NOT NULL,
    PRIMARY KEY (nomscientifique, nomzone),
    FOREIGN KEY (nomscientifique) REFERENCES Especeoiseau(nomscientifique),
    FOREIGN KEY (nomzone) REFERENCES Zonegeographique(nomzone)
);