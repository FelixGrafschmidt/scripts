import * as fs from "fs-extra";
import * as sqlite3 from "sqlite3";

const sql = sqlite3.verbose();

const db = new sql.Database("C:\\Users\\Felix\\Documents\\Paradox Interactive\\Europa Universalis IV\\launcher-v2.sqlite");

fs.remove("./euiv/playset/root/")
	.then(() => {
		db.all<{ dirPath: string; steamId: string }>(
			"SELECT dirPath, steamId from mods WHERE id IN (SELECT modId FROM playsets_mods WHERE playsetId IN (SELECT id FROM playsets WHERE isActive = 1));",
			(_err, result) => {
				result.forEach((value) => {
					console.log(value);

					fs.copy(value.dirPath, `./euiv/playset/root/${value.steamId}`);
				});

				db.close();
			}
		);
	})
	.catch()
	.finally();

db.on("trace", (...info) => {
	console.log(info);
});
