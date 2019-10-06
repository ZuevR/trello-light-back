<p align="center">
    <h1 align="center">Trello light (backend part)</h1>
    <br>
</p>

#### Used technologies:
`Node.js, Postgresql, Sequelize`

# Install

If you do not have [npm](https://www.npmjs.com/), you should install Node.js by following the instructions
at [nodejs.org](https://nodejs.org).

Then clone the repository and install dependencies:
```shell
# clone
git clone https://github.com/ZuevR/trello-light-back.git

# change directory
cd trello-light-back

# install dependencies
npm install
```

CONFIGURATION
-------------

### Database
- Create new database

- Edit the file `.env-example` with real data and change filename to `.env`:

Initialization
-------------
### Database

Run the migration script to create the database structure
~~~
npm run migrate
~~~

Launching
-------------
Run the command being in the root folder of the project
~~~
npm start
~~~

