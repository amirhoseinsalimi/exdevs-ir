# Exception Website

### Clone this repo
```
git clone https://gitlab.com/Exceptional-Dev/IOException/WebException/ex-website
```

### Project setup
1. If you just want to run this app on a production environment, you only need to run: `npm i -S`
2. If you want to test this app out you should install dev dependencies as well, so run `npm i
 -D` or just `npm i`

### Create database connection
1. Create a database named `ex_website`
2. Create a new file named `connection.js` at the root of the project
3. In `connection.js` Create a connection as described on [npm](https://www.npmjs.com/package/mysql).
4. Export the connection object and save the file. 

### Compiles and hot-reloads for development
```
npm run serve
```

### Run in test mode
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run in production environment
```
npm start
```
