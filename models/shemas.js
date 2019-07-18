const tables = `
CREATE TABLE IF NOT EXISTS
            users(
                id SERIAL PRIMARY KEY,
                email VARCHAR(128) NOT NULL UNIQUE,
                firstName VARCHAR(128) NOT NULL,
                lastName VARCHAR(128),
                password TEXT NOT NULL,
                phoneNumber VARCHAR(15) NOT NULL,
                address VARCHAR(128) NOT NULL,
                isAgent BOOLEAN DEFAULT TRUE,
                isAdmin BOOLEAN DEFAULT FALSE,
                createdAt TIMESTAMP DEFAULT NOW(),
                updatedAt TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS
            property(
                id SERIAL PRIMARY KEY,
                status VARCHAR(9) DEFAULT 'AVAILABLE',
                description VARCHAR(128) NOT NULL UNIQUE,
                type VARCHAR(20) NOT NULL,
                state VARCHAR(128) NOT NULL,
                city VARCHAR(20) NOT NULL,
                address VARCHAR(128) NOT NULL,
                price FLOAT DEFAULT 0,
                createdOn TIMESTAMP DEFAULT NOW(),
                updatedOn TIMESTAMP DEFAULT NOW(),
                owner INTEGER NOT NULL ,
                imageUrl VARCHAR(128) NOT NULL,
                FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS
          flag(
              id SERIAL PRIMARY KEY,
              createdOn TIMESTAMP DEFAULT NOW(),
              reason VARCHAR(20) NOT NULL,
              description VARCHAR(128) NOT NULL,
              reporter INTEGER NOT NULL ,
              FOREIGN KEY(reporter) REFERENCES users(id) ON DELETE CASCADE,
              propertyId INTEGER NOT NULL,
              FOREIGN KEY(propertyId) REFERENCES property(id) ON DELETE CASCADE);`;

module.exports = {
  tables,
};
