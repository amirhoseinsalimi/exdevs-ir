# Exceptional Developers Website

### Requirements to run this website
1. Node.js and npm
2. MariaDB or MySQL 
3. Globally installed `db-migrate` module (Simply run `npm i -g db-migrate`)
4. Globally installed `gulp` (Run `npm i -g gulp`)
5. Globally installed `pm2` (Run `npm i -g pm2`)

### Project setup

1. **Clone this repo:**\
Run `git clone https://gitlab.com/Exceptional-Dev/IOException/WebException/ex-website.git ex-website && cd ex-website`
2. **Install dependencies:**
Run `npm i -S`
3. **Setup database:**\
Create a database named `ex_website` (This website uses this database to store information. Should be automated but it's
 not!)
Create a new file named `connection.js` at the root of the project. In `connection.js` create a *pool connection* as
 described on [npm](https://www.npmjs.com/package/mysql). Export the pool object and save the file.
4. **Setup migrations:**\
Configure the database interfaces for `db-migrate` under `./db/config`. To have the database tables up and running
 simply run the following:\
`db-migrate up --migrations-dir ./db/migrations --config ./db/config/{dev|prod}.json`\
This creates tables from the migration and seeds them too. To drop the tables run this command multiple times as
 long as all tables are dropped. This is because each time you run this command, one table is being removed recursively
 (More information on that should be found at the module's website):
`db-migrate down --migrations-dir ./db/migrations --config ./db/config/{dev|prod}.json`
5. **Run the website**\
a. For development purpose: `npm run serve` with a nice hot reload, thanks to [Browser-Sync](https://www.npmjs.com/package/browser-sync)\
b. To ship as a product: `npm start`!\
c. See `package.json` for other possible commands
 ---
If you want to report a bug or willing a new feature feel free to open a issue. PRs are welcome as well!
