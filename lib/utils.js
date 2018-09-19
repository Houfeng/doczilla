const utils = require('ntils');
const fs = require('fs');
const copy = require('copy');
const oneport = require('oneport');
const mkdirp = require('mkdirp');

utils.readFile = function (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, buffer) => {
      if (err) return reject(err);
      return resolve(buffer.toString());
    });
  });
};

utils.writeFile = function (filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) return reject(err);
      return resolve(filename);
    });
  });
};

utils.mkdirp = function (dist) {
  return new Promise((resolve, reject) => {
    mkdirp(dist, function (err) {
      if (err) return reject(err);
      return resolve(dist);
    });
  });
};

utils.copyFiles = async function (files, dist) {
  if (!fs.existsSync(dist)) {
    await this.mkdirp(dist);
  }
  return new Promise((resolve, reject) => {
    copy(files, dist, function (err, files) {
      if (err) return reject(err);
      return resolve(files);
    });
  });
};

utils.oneport = function () {
  return new Promise((resolve, reject) => {
    oneport.acquire(function (err, port) {
      return err ? reject(err) : resolve(port);
    });
  });
};

module.exports = utils;