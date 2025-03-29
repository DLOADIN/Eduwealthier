CREATE DATABASE Eduwealth;
USE Eduwealth;

CREATE TABLE USER (
    userid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    registrationDate DATE,
    session_token VARCHAR(255),
    session_expiry DATETIME
);

CREATE TABLE MENTOR (
    mentorid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    expertise VARCHAR(255),
    availability VARCHAR(255),
    userid VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES USER(userid)
);

CREATE TABLE SUBSCRIPTION (
    subscriptionid VARCHAR(255) PRIMARY KEY,
    userid VARCHAR(255),
    startDate DATE,
    endDate DATE,
    subStatus VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES USER(userid)
);

CREATE TABLE COURSE (
    courseid VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    creationDate DATE
);

CREATE TABLE PROGRESS (
    progressid VARCHAR(255) PRIMARY KEY,
    userid VARCHAR(255),
    courseid VARCHAR(255),
    completionPercentage INT,
    lastAccessed DATE,
    FOREIGN KEY (userid) REFERENCES USER(userid),
    FOREIGN KEY (courseid) REFERENCES COURSE(courseid)
);

CREATE TABLE QUIZ (
    quizid VARCHAR(255) PRIMARY KEY,
    courseid VARCHAR(255),
    question TEXT,
    answerOptions TEXT,
    correctAnswer VARCHAR(255),
    FOREIGN KEY (courseid) REFERENCES COURSE(courseid)
);

CREATE TABLE TUTORIAL (
    tutorialid VARCHAR(255) PRIMARY KEY,
    courseid VARCHAR(255),
    contentType VARCHAR(255),
    description TEXT,
    FOREIGN KEY (courseid) REFERENCES COURSE(courseid)
);

CREATE TABLE LEADERBOARD (
    leaderboardid VARCHAR(255) PRIMARY KEY,
    courseid VARCHAR(255),
    userid VARCHAR(255),
    rank INT,
    score INT,
    FOREIGN KEY (courseid) REFERENCES COURSE(courseid),
    FOREIGN KEY (userid) REFERENCES USER(userid)
);

CREATE TABLE BADGE (
    badgeid VARCHAR(255) PRIMARY KEY,
    userid VARCHAR(255),
    badgeType VARCHAR(255),
    awardedDate DATE,
    FOREIGN KEY (userid) REFERENCES USER(userid)
);

CREATE TABLE RECOMMENDATION (
    recommendationid VARCHAR(255) PRIMARY KEY,
    userid VARCHAR(255),
    courseid VARCHAR(255),
    recommendationType VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES USER(userid),
    FOREIGN KEY (courseid) REFERENCES COURSE(courseid)
);

CREATE TABLE CERTIFICATION (
    certificationid VARCHAR(255) PRIMARY KEY,
    userid VARCHAR(255),
    courseid VARCHAR(255),
    issueDate DATE,
    blockchainHash VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES USER(userid),
    FOREIGN KEY (courseid) REFERENCES COURSE(courseid)
);
