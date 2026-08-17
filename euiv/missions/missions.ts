import * as fs from 'node:fs';
import klaw from 'klaw';

const modDir = `/mnt/d/Games/Steam/steamapps/workshop/content/236850/`;

const result: Array<{ missionCount: number, filename: string, modname: string, gameversion: string }> = [];

const filepath = 'euiv/missions/result.csv';

if (fs.existsSync(filepath)) {
  fs.unlinkSync(filepath);
}

fs.appendFileSync(filepath, 'modname,gameversion,filename,missionCount\n');

(async () => {
  const files = klaw(modDir, {
    filter: file => !file.includes('.') || (file.includes('/missions/') && !file.includes('/gfx/')),
  });
  for await (const file of files) {
    if (file.stats.isDirectory()) {
      continue;
    }

    console.log(`Processing file: ${file.path}`);
    let modname = '';
    let gameversion = '';
    const modFilePathMatch = file.path.match(/\/mnt\/d\/Games\/Steam\/steamapps\/workshop\/content\/236850\/\d+/);
    if (modFilePathMatch) {
      let descriptor;
      if (!fs.existsSync(modFilePathMatch[0].concat('/descriptor.mod'))) {
        // read other files with the .mod extension
        const modFiles = fs.readdirSync(modFilePathMatch[0]);
        const modFile = modFiles.find(f => f.endsWith('.mod'));
        if (!modFile) {
          console.error('No mod file found in', modFilePathMatch[0]);
          continue;
        }
        descriptor = fs.readFileSync(modFilePathMatch[0].concat('/', modFile)).toString();
      } else {
        descriptor = fs.readFileSync(modFilePathMatch[0].concat('/descriptor.mod')).toString();
      }
      const versionMatch = descriptor.match(/supported_version="(.+)"/);
      if (versionMatch) {
        gameversion = versionMatch[1];
        // if (!gameversion.startsWith("1.32")) {
        //  continue;
        // }
      } else {
        console.error('Modname not found', file.path);
      }
      const modNameMatch = descriptor.match(/name="(.+)"/);
      if (modNameMatch) {
        modname = modNameMatch[1];
      } else {
        console.error('Modname not found', file.path);
      }
    } else {
      console.error('Mod files outside mod folder', file.path);
    }
    const fileContent = fs.readFileSync(file.path).toString()
    const missionCount = fileContent.match(/position =/g)?.length || 0;
    if (missionCount === 0) {
      console.log('No missions found in', file.path);
      continue;
    }
    result.push({ missionCount, filename: file.path.split('/').reverse()[0], modname, gameversion });
  }
  result.sort((s1, s2) => {
    return s1.missionCount > s2.missionCount ? -1 : 1;
  });

  result.forEach((e) => {
    fs.appendFileSync(filepath, `"${e.modname}","${e.gameversion}","${e.filename}","${e.missionCount}"\n`);
  });
})();
