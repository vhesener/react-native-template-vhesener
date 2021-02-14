// pass --clean to start from a latest version react native project

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const PROJ = 'MyProjectName';
const CUSTOM = 'custom';
const MERGE = 'merged';
const IOS = 'ios';
const ANDROID = 'android';
const IGNORE = ['Pods', 'Podfile.lock', 'node_modules'];
const CLEAN = process.argv.includes('--clean');

function getPackage(dir) {
  const jsonPath = path.resolve(dir,'package.json');
  const jsonObj = JSON.parse(fs.readFileSync(jsonPath))
  return {
    path: jsonPath,
    json: jsonObj,
  }
}

function initialize() {
  if(CLEAN) {
    fs.rmdirSync(PROJ, { recursive: true });
    createDefaultProject();
  }
  fs.rmdirSync(MERGE, { recursive: true });
  fs.mkdirSync(MERGE);
}

function isIgnored(aPath) {
  return IGNORE.includes(path.basename(aPath));
}

function copyFileSync( source, target ) {
  if (isIgnored(source)) {
    return;
  }
  let targetFile = target;
  // If target is a directory, a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target, newName ) {
  if (isIgnored(source)) {
    return;
  }
  let files = [];
  // Check if folder needs to be created or integrated
  const targetFolder = path.join( target, path.basename( newName ? newName : source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }

  // Copy
  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          const curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync( curSource, targetFolder );
          }
      } );
  }
}

function createDefaultProject() {
  execSync(`npx react-native init ${PROJ}`);
}

function copyProjectFiles() {
  const ios = path.resolve(PROJ, IOS);
  const newIos = path.resolve(MERGE);
  const android = path.resolve(PROJ, ANDROID);
  const newAndroid = path.resolve(MERGE);
  copyFolderRecursiveSync(ios, newIos);
  copyFolderRecursiveSync(android, newAndroid);
}

function copyCustomFiles() {
  const custom = path.resolve(CUSTOM, 'files');
  const currentDir = path.resolve();
  copyFolderRecursiveSync(custom, currentDir, MERGE);
}

function modifyPackageFile() {
  const proj = getPackage(PROJ);
  const projJSON = proj.json;
  const custom = getPackage(CUSTOM);
  const customJSON = custom.json;

  const newJSON = {
    ...projJSON
  };

  for (const key in customJSON) {
    if (key === 'devDependencies' || key === 'dependencies') {
      continue;
    }
    newJSON[key] = {
      ...newJSON[key],
      ...customJSON[key]
    };
  }

  const newPath = path.resolve(MERGE,'package.json');
  fs.writeFileSync(newPath, JSON.stringify(newJSON, null, 2), 'utf8');
}

function removeFlipper() {
  const diffPath = path.resolve(CUSTOM, 'removeFlipper.diff')
  execSync(
    `git apply ${diffPath}`, 
    { stdio: 'inherit' }
  ); 
}

const DEP_TYPE_DEV = 'devDependencies';
const DEP_TYPE_MAIN = 'dependencies';

function installDependencies() {
  installDependencyType(DEP_TYPE_MAIN);
  installDependencyType(DEP_TYPE_DEV);
}

function installDependencyType(depType) {
  const custom = getPackage(CUSTOM);
  const dependencies = custom.json[depType];

  let depList = '';
  for (const depName in dependencies) {
    depList = `${depList} ${depName}`;
  }

  if (depList) {
    execSync(
      `(cd ${MERGE}; yarn add ${depType === DEP_TYPE_DEV ? '-D' : ''} ${depList})`, 
      { stdio: 'inherit' }
    );
  }
}

function cleanup() {
  fs.rmdirSync(path.resolve(MERGE, 'node_modules'), { recursive: true });
  fs.rmdirSync(path.resolve(MERGE, IOS, 'Pods'), { recursive: true });
}

initialize();
copyProjectFiles();
copyCustomFiles();
modifyPackageFile();
removeFlipper();
installDependencies();
cleanup();