#Setting up Typescript in express

1. `npm init -y` (setup package json)
2. `npm i express`
3. `npm i -D typescript` (ts should be installed in dev dependencies)
4. `npm i -D @types/express` (all types of ts will always have a prefix of @types)

if intellisense is not reading the type acquisition do (view > command pallette: ctrl+shif+p ) type "TypeScript: Restart TS Server"

5. ts by default is using common js so if we do in terminal `node app.ts` it wont run cause we are using import. to do this we set up it in 2 ways(1. transpile everything ts into js) to do this we create tsconfig.json, to generate this we do `npx tsc --init` to generate tsconfig.json
6. uncomment `rooDir: "./"` and set `rooDir: "./src"` since almost all of our ts are in the "./src" folder
7. uncomment `outDir: "./"` and set `outDir: "./dist"` ... this makes that any transpiled ts file that is converted to js file will be generated in the `outDir: "./dist"`, btw we can name it into any name like build,transpiledFile etc. but most are `"./dist"`

#Set up strict types (enables warnings)
8. uncomment `"noImplicitAny": true` to make sure data types are properly typed
9. uncomment `"strictNullChecks": true` to make sure that if we are passing something that possibly NULL, ts will warn us
10. uncomment `"strictFunctionTypes": true` to make sure that when assigning functions, it checks to ensure the parameters and the return values are subtype-compatible.
11. `npx tsc --build` (to compile ts into js)
12. back to step 5, we can now run the file without error using `node ./dist/app.js`
13. setup script in package.json. in script put `"build": "tsc --build"` so we only do `npm run build` and it will compile the ts into js without typing `npx tsc --build`
14. setup script `"start": "./dist/app.js"` so we only do `npm start` and it will run the compiled js file
15. setup nodemon so we dont have to start over and over. in script  `"start:dev": "nodemon ./src/app.ts"`
16. in CLI `npm run start:dev` but will give error cause we dont have ts-node
17. install ts-node `npm i -D ts-node`
18. do step 16 (will have no more error)


 