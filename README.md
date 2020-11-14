# Exceptional Developers Website

Exceptional Developers' portfolio website. https://expteam.ir

---

Simply clone and run this website for your personal use :D

### Requirements to run this website
1. Node.js and npm
2. MariaDB or MySQL Server (As the main database)
3. Redis (For session management)

**NOTE**: This project uses `bcrypt` so you should have an LTS version of Node.js.

### Project setup

1. **Clone this repo:**\
Run `git clone https://github.com/amirhoseinsalimi/expteam-ir && cd expteam-ir`
2. **Install dependencies:**
Run `npm i`
3. **Configure environment variables:**\
Copy `.env.example` to `.env`, fill all required fields. For `SECRET` field, run `node gen-secret.js` and paste the output there.
4. **Run migrations:**\
Run `knex migration:run`. See [Knex.js Documentation](https://www.npmjs.com/package/knex) for more\ 
5. **Run the website:**\
a. For development: `npm run serve` with a nice hot reload, thanks to [Browser-Sync](https://www.npmjs.com/package/browser-sync) \
b. For production: `npm start`!\
c. See `package.json` for other possible commands
 ---
