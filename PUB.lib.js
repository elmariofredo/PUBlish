/*
Basic PUBlish Library
 */

var fs = require('fs'),
  util = require('util'),
  ejs = require('ejs'),
  md = require('node-markdown').Markdown,
  glob = require('glob');

exports.fs = fs;

var build_file_path = function(file, config) {
  return file.replace(config.source.folder, config.build.folder);
}

/**
 * Check if file is meant to be parsed
 * @param  {String} file [description]
 * @return {Hash}
 */
var contain_alcohol = function(file, config) {

  var kind = file.split('.').reverse()[0];
 
  return {kind: kind, parseable: ( config.parse.file_types.indexOf(kind) != -1 )}
} 


/**
 * Parse files
 * @param  {String} file   Filename
 * @param  {Hash} config Site specific configuration data
 * @param  {Hash} data   Site specific content data
 * @return {Boolean}
 */
brew = function(file, config, data) {

  console.log('Brewing ', file)

  fs.readFile( file, function (err, file_data) {

    if (err) {
      throw err; 
    } else {

      var render_output = ejs.render(file_data.toString(), {
        data: data,
        methods: {
          md: md,
          ejs: ejs
        }
      });

      fs.writeFile( build_file_path(file, config), render_output, function(err) {
        if(err) {
            throw err;
        } else {
            console.log("Build Done!");
        }
      });

    }

  });

}

/**
 * Parse all files
 * @param  {Hash} config Site specific configuration data
 * @param  {Hash} data   Site specific content data
 * @return {Boolean}
 */
var drink_it_all = function(config, data) {

  config.parse.file_types.forEach(function(kind){
    // console.log(config.cwd+''+config.source.folder+'/**/*.'+kind)
    glob(config.cwd+'/'+config.source.folder+'/**/*.'+kind, {}, function (er, files) {
      files.forEach(function(file){
        console.log('>'+file+'<')
        brew(file, config, data);
      });      
    });
  });
  
  return true;
}

/**
 * On Init parse all files
 * @param  {Hash} config Site specific configuration data
 * @param  {Hash} data   Site specific content data
 * @return {Boolean}
 */
exports.init = function(config, data) {
  drink_it_all(config, data);
}

/**
 * Copy or copy&parse source files
 * @param  {String} file   Filename
 * @param  {Hash} config Site specific configuration data
 * @param  {Hash} data   Site specific content data
 * @return {Boolean}
 */
exports.pass_me_that = function(file, config, data) {

  var builded_file_path = build_file_path(file, config);

  var kind = contain_alcohol(file, config);
  console.info(kind)
  if ( kind.kind == 'json' )
    return drink_it_all(config, data);
  else if ( kind.parseable ) {
    return brew(file, config, data);
  } else {
    return fs.createReadStream(file).pipe(fs.createWriteStream(builded_file_path));
  }

}
