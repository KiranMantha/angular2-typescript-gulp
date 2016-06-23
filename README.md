A sample angularjs2 application using typescript and gulp

Setup

1. Clone the repository to your local project folder

    git clone -git-repository-url

2. Create dist folder at root. this will be your build folder.

3. run 'npm install' to install the dependancies mentioned in package.json

4. if you change the build folder name then update gulpfile.js at line:156 and systemjs.config.js at line:8

5. run 'gulp' to start application at localhost:8080. you can change the port number in gulpfile.js at line:159

6. this repository is created on the basis of https://github.com/pkozlowski-opensource/ng2-play. if found any difficulty in this repo check ng2-play repo for basic structure.


Note: 
If found any errors in npm install, please run npm install once again it will clear all the errors. After running gulp, please make sure that all your scripts are migrated to your build folder accordingly if not please run gulp again to run localhost(it will show errors in .d.ts files but ignore them).

Update:
The latest project is completely migrated to angularjs 2.0.0-rc-3 build to take advantage of latest routing modules. it is not compatible with beta builds.