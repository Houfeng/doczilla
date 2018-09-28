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

utils.sleep = function (delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

//批量执行时用这个函数，方案统在这个函数中切换串行或并行
utils.batchExec = async function (list, fn, parallel = true) {
  if (parallel) return Promise.all(list.map(fn));
  const results = [];
  for (let item of list) results.push(await fn(item));
  return results;
};

utils.strEqual = function (a, b) {
  if (a === b) return 0;
  if (a > b) return 1;
  if (a < b) return -1;
};

module.exports = utils;