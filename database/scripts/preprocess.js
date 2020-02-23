#!/usr/bin/env node
//
// preprocess.js
//
// Slices the Hansard export file, assigning unique IDs in preperation of Postgres import.
///////////////////////////////////////////////////////////////////////////////////////////

// Any table headers with this name will be namespaced to prevent DB issues
const reservedWords = ['text', 'debate', 'date'];

// Any fields named here will be treated as boolean
const processAsBool = namespaceReserved(['sentence_errata']);

// Any fields here will be assumed unique but large text and stored in their own table with an index
const processAsTextBlob = namespaceReserved([
  'text',
  'sentence_entities',
  'debate'
]);

// Any fields here will be aggregated, be careful not to include fields that are
// mostly unique, this is intended for data that repeats a lot.
const processAsAggregatable = namespaceReserved([
  'src_file_id',
  'section_category',
  'speaker',
  'constituency',
  'speaker_house',
  'sentence_entities',
  'entity_labels',
  'X20'
]);

// Any fields listed here will be forced into the form NUMBER or NULL
const coerceNumeric = namespaceReserved(['src_column']);

// Edit above this line ////////////////////////////////////////////////////

const processCheckInAt = 100000;
const path = require('path');
const colors = require('colors');
const csv = require('csv-parser');
const fs = require('fs');
const args = process.argv.slice(2);
const inputPath = args[0];
const separator = args[1] ? args[1] : ',';
if (!inputPath) {
  console.log('./preprocess [PATH TO SOURCE] [SEPERATOR]');
  process.exit();
} else if (!fs.existsSync(inputPath)) {
  console.log(`File "${inputPath}" does not exist!`);
  process.exit();
}

let field_file = {};
let hrstart = process.hrtime();
let lastCheck = process.hrtime();
let aggregator = {};
let aggregatorIndex = {};
let counter = 0;

let outputDir = `../TMP/${path.basename(inputPath)}`;
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
const debate_file = fs.createWriteStream(`${outputDir}/INDEX.tsv`);
const headers_file = fs.createWriteStream(`${outputDir}/HEADERS.json`);
namespaceReserved([...processAsAggregatable, ...processAsTextBlob]).forEach(
  field => {
    field_file[field] = fs.createWriteStream(`${outputDir}/${field}.tsv`);
  }
);

processAsAggregatable.forEach(field => {
  aggregator[field] = {};
  aggregatorIndex[field] = 0;
});

console.log('------------------------------------------');
fs.createReadStream(inputPath)
  .pipe(csv({ separator }))
  .on('data', data => {
    data = namespaceReserved(data);
    if (counter === 0) {
      let headers = ['id', ...namespaceReserved(Object.keys(data))];
      headers_file.write(JSON.stringify(headers));
      headers.forEach(key =>
        console.log(
          `${colors.white(key)}: ${colors.grey(truncate(data[key], 50))}`
        )
      );
      console.log('------------------------------------------');
    }
    debate_file.write(`${counter}`);
    namespaceReserved(Object.keys(data)).forEach(field => {
      let datum = data[field].trim();
      if (coerceNumeric.find(el => el === field))
        datum = parseFloat(datum) ? parseFloat(datum) : 'NULL';
      if (processAsTextBlob.find(el => el === field)) {
        field_file[field].write(`${counter}\t${datum}\n`);
        debate_file.write(`\t${counter}`);
      } else if (processAsBool.find(el => el === field)) {
        debate_file.write(
          `\t${field.trim().toLowerCase() === 'true' ? 'TRUE' : 'FALSE'}`
        );
      } else if (processAsAggregatable.find(el => el === field)) {
        if (counter % processCheckInAt === 0) {
          if (
            Object.keys(aggregator[field]).length > 100 &&
            counter - Object.keys(aggregator[field]).length <= 10
          ) {
            console.log(
              `${colors.yellow(
                `\nWARNING:`
              )} "${field}" appears to be a poor candidate for aggregation and will likely cause memory issues. (${counter -
                Object.keys(aggregator[field])
                  .length} unique after ${counter.toLocaleString()} records)`
            );
          }
        }
        if (typeof aggregator[field][datum] === 'undefined') {
          aggregator[field][datum] = aggregatorIndex[field];
          aggregatorIndex[field]++;
          field_file[field].write(`${aggregator[field][datum]}\t${datum}\n`);
        }
        debate_file.write(`\t${aggregator[field][datum]}`);
      } else {
        debate_file.write(`\t${datum}`);
      }
    });
    debate_file.write(`\n`);
    showProgress(counter);
    counter++;
  })
  .on('end', () => {
    console.log(
      `${colors.green(`Done:`)} Processed ${colors.grey(
        counter.toLocaleString()
      )} records`
    );
    console.log(`${colors.green(`Output:`)} ${colors.grey(outputDir)}`);
    process.exit();
  });

let indent = 0;

function namespaceReserved(data) {
  if (Array.isArray(data)) {
    let newHeaders = [];
    data.forEach(item => {
      if (reservedWords.find(el => el === item.toLowerCase())) {
        newHeaders.push(`debate_${item}`);
      } else {
        newHeaders.push(item);
      }
    });
    return newHeaders;
  } else {
    let newObject = {};
    Object.keys(data).forEach(key => {
      if (reservedWords.includes(key.toLowerCase())) {
        newObject[`debate_${key}`] = data[key];
      } else {
        newObject[key] = data[key];
      }
    });
    return newObject;
  }
}

const showProgress = counter => {
  if (counter > processCheckInAt) {
    if (counter % processCheckInAt === 0) {
      if (indent === 0) indent = counter / 10000 / 2;
      console.log(
        ` ${colors.brightCyan(counter.toLocaleString())} records processed`
      );
      let minutes = process.hrtime(hrstart)[0] / 60;
      minutes = Math.round(minutes > 0 ? minutes : 0);
      times(indent)(() => process.stdout.write(' '));
      const elapsed = `Elapsed: ${minutes}min | ${
        process.hrtime(hrstart)[0]
      }s ${process.hrtime(hrstart)[1] / 1000000}ms | Pace: ${
        process.hrtime(lastCheck)[0]
      }s`;
      console.log(colors.grey(elapsed));
      lastCheck = process.hrtime();
    }
    if (counter % 10000 === 0) process.stdout.write('.');
  }
};

const times = x => f => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

const truncate = (string, at) => {
  if (string && string.length > at) {
    return `${string.substring(0, at)}...`;
  } else {
    return string;
  }
};
