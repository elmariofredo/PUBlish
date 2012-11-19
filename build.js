// TODO: project quick starter
// 1. get twitter bootstrap code
// 2. design models
// 3. lang support
// 4. live updating - limited to only changes files
// 5. js/css compiling
// 6. deployment to virtualmaster
//        http://www.carbonsilk.com/node/deploying-nodejs-a
// 7. custim vm image for smallest static web server
//        https://www.archlinux.org/
//        ngingx or http://code.google.com/p/mongoose/

var site_data = require(__dirname+'/_data/com.test.www-121118-01.json');

var fs = require('fs');
// TODO: conver to jade
// npm install jade
// npm install html2jade
var ejs = require("ejs");
var md = require("node-markdown").Markdown;

var move = function(options) {
  fs.createReadStream(options.in).pipe(fs.createWriteStream(options.out));
}

var parse = function(options) {

  console.log('Compiling ', options.in, ' to ', options.out)

  fs.readFile( options.in, function (err, data) {

    if (err) {
      throw err; 
    } else {

      var render_output = ejs.render(data.toString(), {
        data: site_data,
        methods: {
          md: md,
          ejs: ejs
        }
      });

      fs.writeFile( options.out, render_output, function(err) {
        if(err) {
            throw err;
        } else {
            console.log("Build Done!");
        }
      });

    }

  });

}

parse({
  in: __dirname + '/index.html',
  out: __dirname+'/_build/index.html'
});

parse({
  in: __dirname + '/css/style.css',
  out: __dirname+'/_build/css/style.css'
});

move({
  in: __dirname + '/js/app.js',
  out: __dirname+'/_build/js/app.js'
});

//java -jar /Users/mario/Downloads/compiler-latest/compiler.jar --js jquery.js --js jquery.easing.js --js bootstrap.js --js jquery.aw-showcase.js --js app.js --js_output_file=all.js

