Tech Stack used
1. postgres for database
2. nodeJs in typescript
3. Liquibase for schema setup
4. jest for unit test case

To run the project :-

1. install postgres
2. pgadmin to view the database
3. install liquibase - https://docs.liquibase.com/concepts/installation/installation-linux-unix-mac.html
(can be skipped, needed only to setup the schema)
4. Goto config->default.json
update the values like port, database name, database user, password as set in local postgres
5. npm install
6. to create schema using liquibase 
goto database folder & run --> liquibase update.
Schema is created.
7. Testdata in case needed to setup the data
8. Run npm start
9. access Swagger at "http://localhost:8100/swagger". port as given in default.json under config folder.
10. All api's can be accessed via swagger
11. To run unit test case -> npm test. 
