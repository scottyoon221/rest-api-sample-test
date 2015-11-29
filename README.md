## Sample REST API Test
##### Author: Scott Yoon
##### Email: scottyoon221@yahoo.com

### Intro
The project is to demonstrate on testing REST API using test framework and local server. Frisby.js was used as REST API test framework and jsonplaceholder as local REST API server for the purpse of the project. The workflow of a testing is to send get, post, put, patch, delete to the server, which in turn will send back a meaningful result in json format. The objective is to validate the returned data.

 To run the provided script, you need to install following:
- **Node.js, NPM, Frisby.js:** http://frisbyjs.com
- **json-server:** https://github.com/typicode/json-server

### Running REST API Local Server
```bash
cd sample-rest-api-test
json-server --watch db.json
```

### Running Test
Type following command in Mac terminal to run test script
```bash
cd sample-rest-api-test
jasmine-node spec/api/
```

### Backup database
Once the database is modified from the test execution, you can manually replace the database file, **/sample-rest-api-test/db.json** with **/sample-rest-api-test/backup-db.json** file to start fresh. Note that you also need to restart json-server to correctly update new database file.

