CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "urls" (
    "id" SERIAL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT UNIQUE NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT(0),
    "userId" INTEGER REFERENCES users(id)
);
