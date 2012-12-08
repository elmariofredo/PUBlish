#!/usr/bin/env node

var chokidar = require('chokidar');


var PUB = require(__dirname+'/PUB.lib.js');

var cwd = process.cwd()+'/';

var config = {}, data = {};

var data_init = function() {
  config = require(cwd+'PUB_config.json');
  config.cwd = cwd;
  data = require(cwd+config.source.folder+'/'+config.build.data);
};

data_init();
PUB.init(config, data);


var watcher = chokidar.watch(config.source.folder, {ignored: /^\./, persistent: true});

console.log('Finally in the PUB, wathing for beverage...');

watcher
  .on('add', function(file) {
    console.log('We have new drink on the bar... let\'s serve it', file);
    PUB.pass_me_that(config.cwd+file, config, data);
  })
  .on('change', function(file) {
    console.log('So you want another one...', file);
    PUB.pass_me_that(config.cwd+file, config, data);
  })
  .on('unlink', function(file) {
    console.log('is it bird? ariplane? not it\'s big crush in your favorite PUB!', file);
  })
  .on('error', function(error) {
    console.log('One glas just crushed... oh my!', file);
    // TODO: file removal
  })
  .on('all', function () {
    data_init();
  });

