-- Create database if not exists
CREATE DATABASE IF NOT EXISTS donarplus;

-- Use the database
USE donarplus;

-- Table for registering donors
CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Others') NOT NULL,
    aadharCardNo VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    bloodType VARCHAR(5) NOT NULL,
    medicalHistory TEXT,
    infectionDiseases TEXT,
    surgicalHistory TEXT,
    allergies TEXT,
    smokingStatus ENUM('Yes', 'No'),
    alcoholConsumption ENUM('Yes', 'No'),
    drugUse ENUM('Yes', 'No'),
    dietExercise ENUM('Yes', 'No'),
    organs VARCHAR(255),
    idProofUpload VARCHAR(255),
    termsConditions TINYINT(1) NOT NULL,
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for registering patients
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Others') NOT NULL,
    aadharCardNo VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    bloodType VARCHAR(5) NOT NULL,
    medicalHistory TEXT,
    infectionDiseases TEXT,
    surgicalHistory TEXT,
    allergies TEXT,
    smokingStatus ENUM('Yes', 'No'),
    alcoholConsumption ENUM('Yes', 'No'),
    drugUse ENUM('Yes', 'No'),
    dietExercise ENUM('Yes', 'No'),
    organNeeded VARCHAR(255),
    idProofUpload VARCHAR(255),
    termsConditions TINYINT(1) NOT NULL,
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for transplant matching
CREATE TABLE transplantMatches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    donorId INT NOT NULL,
    matchingScore DECIMAL(5,2) NOT NULL,
    matchDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id),
    FOREIGN KEY (donorId) REFERENCES donors(id)
);
