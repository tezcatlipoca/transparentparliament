#!/usr/bin/env node
//
// generateImportSQL.js
//
// Generates SQL import scripts for the tsvs generated by ./preprocess
///////////////////////////////////////////////////////////////////////////////////////////
const path = require('path');
const colors = require('colors');
const fs = require('fs');
const csv = require('csv-parser');
const args = process.argv.slice(2);
const remoteDataDir = args[1];
const inputPath = args[0];
checkInputPath(inputPath);

let outputDir = `../TMP/${path.basename(inputPath)}`;
const sql_file = fs.createWriteStream(`${outputDir}/BUILD_DATABASE.sql`);
fs.readFile(`${outputDir}/HEADERS.json`, (err, data) => {
  if (err) throw err;
  const headers = JSON.parse(data);
  createBaseTable(`INDEX.tsv`, headers, tableScript => {
    sql_file.write('-- THIS IS A GENERATED FILE\n\n');
    sql_file.write(tableScript);
    headers.forEach(header => {
      if (fs.existsSync(`${outputDir}/${header}.tsv`)) {
        sql_file.write('\n\n');
        sql_file.write(
          generateTable(
            [
              { type: 'INT', name: 'id' },
              { type: 'TEXT', name: 'val' }
            ],
            `${header}`,
            `${header}.tsv`
          )
        );
      }
    });
  });

  /// FIXME: This is lazy :P
  setTimeout(() => process.exit(), 1000);
});

function createBaseTable(sourceFile, headers, cb) {
  let counter = 0;
  fs.createReadStream(`../TMP/${path.basename(inputPath)}/${sourceFile}`)
    .pipe(csv({ separator: '\t', headers }))
    .on('data', data => {
      if (counter === 0) {
        console.log('------------------------------------------');
        let indexTableFields = [];
        Object.keys(data).forEach((key, i) => {
          if (headers[i]) {
            const type = determineType(data[key]);
            indexTableFields.push({ type, name: headers[i] });
            console.log(
              `${
                type === 'text'
                  ? colors.brightCyan(type)
                  : type === 'BOOL'
                  ? colors.red(type)
                  : colors.yellow(type)
              }\t ${headers[i]} : ${colors.grey(data[key])}`
            );
          }
        });
        console.log('------------------------------------------');
        let sqlScript = generateTable(indexTableFields, 'debate', sourceFile);
        cb(sqlScript);
      }
      counter++;
    });
}

function generateTable(fields, name, sourceFile) {
  let script = '';
  script += `DROP TABLE IF EXISTS private.${name};\n`;
  script += `CREATE TABLE private.${name}\n`;
  script += '(\tid\t serial NOT NULL, PRIMARY KEY (id),\n';
  fields.forEach((field, idx) => {
    if (field.name !== 'id')
      script += `\t${field.name.trim()}\t\t${field.type}${
        idx < fields.length - 1 ? ',' : ''
      }\n`;
  });
  script += ');\n';

  script += `COPY private.${name} FROM PROGRAM 'sed ''s/\\\\/\\\\\\\\/g'' <${remoteDataDir}/${sourceFile}' NULL AS 'NULL';`;
  return script;
}

function determineType(data) {
  if (parseFloat(data).toString() === data) {
    if (data.includes('.')) {
      return 'float(n)';
    } else {
      return 'INT';
    }
  }
  if (data === 'TRUE' || data === 'FALSE') return 'BOOL';
  return 'text';
}

function checkInputPath(inputPath) {
  if (!inputPath) {
    console.log('./generateImportSQL [PATH TO SOURCE]');
    process.exit();
  } else if (!fs.existsSync(inputPath)) {
    console.log(`File "${inputPath}" does not exist!`);
    process.exit();
  }
}
