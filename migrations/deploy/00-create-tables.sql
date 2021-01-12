-- Deploy Doggy-API:00-create-tables to pg

BEGIN;

-- SCHEMAS

CREATE SCHEMA "doggyAPI";

-- TABLES DU SCHEMA DOGGYAPI (7)

CREATE TABLE "doggyAPI"."dog" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender_id" INT NOT NULL,
    "breed_id" INT NOT NULL,
    "owner_id" INT NOT NULL

);

CREATE TABLE "doggyAPI"."gender" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."breed" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."owner" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."favorite_food" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."m2m_dog_favorite_food" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "dog_id" INT NOT NULL,
    "favorite_food_id" INT NOT NULL
    
);

CREATE TABLE "doggyAPI"."account" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
    
);


COMMIT;
