#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const readFile = promiseify(fs.readFile);
const writeFile = promiseify(fs.writeFile);

//TODO add reference to actual ts file in comments

/**
 *
 */
for (let arg of process.argv.slice(2)) {
  if (arg.indexOf('*') < 0) {
    // Argument is a directory target, add glob patterns to include every files.
    arg = path.join(arg, '**', '*');
  }

  const files = glob.sync(arg, {})
    .filter(name => /\.steps\.ts$/.test(name));  // Matches only ts steps files.

  return Promise.all(files.map(filePath => {
    return readFile(filePath, 'utf-8')
      .then(content => getMatches(content))
      .catch(err => {
        console.error('An error occured: ', err);
      });
  }))
    .then(matchesArrays => {
      let mergedMatches = [].concat.apply([], matchesArrays);
      let newFile = path.join(`${__dirname}/features/support/generated.steps.js`);

      console.log(`Generate feature steps: ${newFile} with ${matchesArrays.length} steps`);

      return writeFile(newFile, generateStepsFile(mergedMatches));
    });
}


function getMatches(content){
  return content.match(/@((then|when|given)\([^']+?)\)\s?\n/g) || [];
}

function generateStepsFile(matches) {

  return `
/**
 *
 * Generated via \`npm run generate-step-autocomplete\`
 *
 * ${new Date()}
 *
 * TODO add reference to actual ts file in comments
 *
 */    
var steps = function () {
  ${matches.map(getStepAsJs).join('\n  ')}
};

module.exports = steps;

`;

}

function getFunctionNameFromPath(path){
  return path.match(/.*\/([^']+?)\.steps\.ts/)[1];
}


function getStepAsJs(match){
  return `this.${getStepTypeFromMatch(match)}${getStepRegexFromMatch(match)}, (callback) => {});`;
}

function getStepRegexFromMatch(match){
  return match.substring(match.indexOf('(') + 1, match.lastIndexOf(')'));
}


function getStepTypeFromMatch(match){
  match = match.replace('@', '').substring(0, match.indexOf('('));
  return capitalizeFirstLetter(match);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function promiseify(fn) {
  return function() {
    const args = [].slice.call(arguments, 0);
    return new Promise((resolve, reject) => {
          fn.apply(this, args.concat([function (err, value) {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        }]));
    });
  };
}