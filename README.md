PUBlish
=======

An offline Node.js publisher for small websites  

Ok to be fair this is very early stage, Here is what it should do and how.  

### What I need

Create small website with simple SEO friendly structure with possibility of easy updating using web interface.

### How it will work

* User will install node.js + my package with dependencies
  * ```npm install PUBlish```
* User will bootstrap basic structure using current twitter bootstrap(with posibility of using own template)
  * ```PUB```
     * Command will look for PUB_config.json and if not present it will continue bootstrapping process
     * For completing bootstrap i will ask for following
       * Project Name
       * Template [Twitter | Twitter modified | {GIT URL}]
       * Multi lang [y | N]
         * [y]
             * Space separated list of langs {String}
       * Deployment server [y | create | N]
         * [ create ]
             * Provider [Virtualmaster | Amazon]
             * API Key [{Key}]
         * Host [{FQDN}]
         * Method [scp | ftp]        
* At the end of bootstrap process it will startup PUBlish server and open website in browser
  * Every time user will change any of the file in Source folder, server will re-render it to Build folder
  * After every rebuild server will reload browser view
  * In browser user will have toolbar where he can change
      * PUB_config.json
         * All Site settings
      * Data.json
         * This is representation of Site models
      * Hit PUBlish Button which will deploy builded and compiled Site
      * In first stage user can edit files only in system editor



## TODO:

0. Choose tools
*	Testing
		* http://visionmedia.github.com/mocha/
		* http://pivotal.github.com/jasmine/
*	Deployment
		* https://npmjs.org/package/automaton
	*	http://gruntjs.com/
	* IO Event watcher
		* https://npmjs.org/package/walkdir   
	* Get inspiration about structure from other npm modules
  * https://github.com/senchalabs/connect
		* https://github.com/mhevery/jasmine-node/tree/master/lib/jasmine-node
  * coffee? https://github.com/viatropos/tower


1. Create Bootstrap script
	* Investigate on how to create proper npm module
	* What are testing options
	* Class naming and structure
	* Command line prompter
	* Create production server(see #4)  
  


2. Create local PUB
	* Speed up on file change watcher
	* Add auto browser update  
  


3. Create Deployment script
	* Build Source Dir
	* Compile js
	* Deploy to server(http://www.carbonsilk.com/node/deploying-nodejs-a)  
  

4. Create PUBlish Platform for Virtualmaster
  * ArchLinux(https://www.archlinux.org/)
  * Nginx or Mongoose http://code.google.com/p/mongoose/  
