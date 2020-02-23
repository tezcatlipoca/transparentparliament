# Transparent Parliament
**[Version: 0.0.1](https://semver.org/)**
**[MIT Licensed](license)**
Copyright &copy;2020 Southern Methodist University 


This codebase is formatted with [Prettier](https://prettier.io/).  
Built by Andrew Sempere of **[Place Lab Ltd.](https://theplacelab.com)**  

---

This is the sourcecode of the project hosted at: https://transparentparliament.com/

Documentation is hosted here: https://docs.transparentparliament.com/

---

# README (For Developers)

## Web Client
The website is a [React](https://reactjs.org/) app which wraps [D3](https://d3js.org/) and [Nivo](https://nivo.rocks/). 

In addition this repository contains all the scripts needed to generate its own API (inside `./database`) as well as documention, powered by [docz](https://www.docz.site/docs/getting-started). 


## Dev Setup
- Prerequistes: This assumes a posix environment with bash (OSX or Linux), node and yarn installed and access to a databse server.
- Remember to run `yarn` in the top level (for the website)
- Remember to run `yarn` in `./database/scripts` (for the database scripts)
- Remember to configure your .env file appropriately (see below)

###  Configure your .env 
Copy dotenv to .env and edit the values. With a properly configured .env you will be able to manage most tasks via yarn:

`yarn db:preprocess`
Equivalent of BOTH build steps below (preprocess and generate)

`yarn db:rebuild`
THIS IS DESTRUCTIVE. Erases and rebuilds the database. 

`yarn db:rebuildapi`
Equivalent of 'Build the API' step. This step does NOT auto-detect changes in the structure of the import file, so you may need to alter the API SQL scripts yourself if, for example, the header names change.

`yarn db:export`
Backs up the database

`yarn build`
Build website 

`yarn docz:dev`
View/Edit the documentation locally

----
> You do not need anything below this line if you have configured your .env correctly
----

## Creating the API

#### Acquire the Raw Data
You are looking for a large CSV or TSV file provided by the data cleaning team, probably on M2.

#### Manually Building the Database
There are two scripts inside of `database` folder which will take the raw data from the data team and turn it into a database-driven API. There are three steps:

1. Preprocess the raw data csv or tsv. This will spilit the data into a set of TSVs with assigned indexes:
`./preprocess.js SOURCE [DELIMITER]`

2. Generate the SQL import scripts based on the TSVs that were just created:
`./generateImportSQL.js SOURCE`

3. Transport the output of these scripts to the same machine that is hosting your database:
`rsync -azvr ./TMP/OUTPUT/* DEST`

4. Run the scripts using psql or whatever database tool you use. After this you will have a fully functional database and you can:

#### Manually Building the API
> NOTE: The previous steps do not make assumptions about the structure of the data, however once you create the API   
YOU MUST modify these scripts to match.

The API is provided by [PostgREST](https://postgrest.org/). The scripts to generate it are in `database/api` and assume the database has been created using the previous steps. 


## Building the Documentation
Documentation is generated using docz. From the docz docs:
>`yarn docz:build` will generate a static site for your site in .docz/dist/.

>You can try it out with `yarn docz:serve` or by serving the generated site with your favorite static file server (e.g. npx serve .docz/dist).

>You can have yarn docz build emit to a different directory by providing a path to the dest field in your doczrc.js or from the command line : `yarn docz:build --dest docs-site-directory`.

>Deploy
The output of docz consists of static assets only. This allows you to deploy your generated docz site with any static site hosting provider you'd like. Start by building your site with `yarn docz build`, if you haven't provided a dest flag to your config then you will find your generated files in .docz/dist that you can copy to your server to deploy your site.