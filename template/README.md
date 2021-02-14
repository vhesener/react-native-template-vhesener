## Updating the template when new versions of React Native come out

Run `create.js` which does the following:

1. Runs latest `react-native init` template and puts it into `MyProjectName` directory
2. Copies the files that are desirable from `MyProjectName` and the ones desirable from `custom` into the `merged` directory
3. Manually modifies `package.json` with some scripts
4. Removes Flipper because it don't work oob right now
5. Installs desirable `devDependencies` using `yarn`

To run the script simply use node to run the file with the `--clean` flag.

```sh
(cd template && npx node ./create.js --clean)
```

## Updating incremental configurations (no new React Native versions)

If only slight changes to the template files or scripts that generate the template are
needed, run the same script without the `--clean` flag. This will only process 
(everything but the first step above) what is needed without having to install the latest
React Native initial project.

```sh
(cd template && npx node ./create.js)
```