# USERS-CRUD-SERVER

Its a backend Api, made in Node and Express. It has a Middleware (crypto) to encrypt Passwords.

It is necessary to provide database credentials in order to conect with DB (MySql)
    
    const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "devel0per",
    database: "usersCrud",
    });

## Available Scripts

In the project directory (users-server), you can run:

### `node index.js`

Runs the localhost server at port 3001