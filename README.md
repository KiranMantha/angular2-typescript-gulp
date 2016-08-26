##Introduction
A sample angularjs2 application using typescript and gulp. This provides the implementation of modules, 2-way bindings, handling click events, creating services, writing observables, creation of components dynamically and destroying them. If found difficulty, please feel free to post and raise issues with proper description and if possible provide a plunker.

###Setup

1. Clone the repository to your local project folder
    ```
    git clone -git-repository-url
    ```
2. Create dist folder at root. this will be your build folder.

3. run 'npm install' to install the dependancies mentioned in package.json

4. if you change the build folder name then update gulpfile.js at line:23 and systemjs.config.js at line:8

5. run 'gulp' to start application at localhost:8080. you can change the port number in gulpfile.js at line:191

6. this repository is created on the basis of https://github.com/pkozlowski-opensource/ng2-play. if found any difficulty in this repo check ng2-play repo for simplified structure.


#####Update:
The latest project is completely migrated to angularjs 2.0.0-rc-5 build to take advantage of latest routing modules, @NgModule decorator and also improved the reliability of gulp tasks.
