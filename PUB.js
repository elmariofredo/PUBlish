#!/usr/bin/env node

var watch = require('watch');

var PUB = require(__dirname+'/PUB.lib.js');

var cwd = process.cwd()+'/';

var config = {}, 
    data = {};

var data_init = function() {
  config = require(cwd+'PUB_config.json');
  config.cwd = cwd
  data = require(cwd+config.source.folder+'/'+config.build.data);
}

data_init();
PUB.init(config, data);


watch.watchTree(config.source.folder, function (file, curr, prev) {

  data_init();

  if (typeof file == "object" && prev === null && curr === null) {
    console.log('Finally in the PUB, wathing for beverage...');
  } else if (prev === null) {
    console.log('We have new drink on the bar... let\'s serve it', file);
    PUB.pass_me_that(config.cwd+file, config, data);
  } else if (curr.nlink === 0) {
    console.log('One glas just crushed... oh my!', file)
    // TODO: file removal
  } else {
    console.log('So you want another one...', file);
    PUB.pass_me_that(config.cwd+file, config, data);
  }
})