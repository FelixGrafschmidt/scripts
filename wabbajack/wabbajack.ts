import * as fs from "fs";
import * as https from "https";
import { IncomingMessage } from "node:http";

const filesDir = "wabbajack/files/";

async function downloadFiles() {
	let index = 0;
	while (true) {
		console.log(index);
		try {
			const response = await download("https://authored-files.wabbajack.org/QWEST%203.2.2.wabbajack_b690ae77-e053-4ab9-a506-b8d3aa89f0f3/parts/" + index);
			response.pipe(fs.createWriteStream(filesDir + (index++).toString()));
			continue;
		} catch (e) {
			console.log(e);
			break;
		}
	}
}

function download(url: string): Promise<IncomingMessage> {
	return new Promise((resolve, reject) => {
		https.get(url, (response) => {
			if (response.statusCode !== 200) reject(response.statusMessage);
			resolve(response);
		});
	});
}

function combineFiles() {
	const files = fs.readdirSync(filesDir);
	const sortedFiles = files.sort((a, b) => {
		return parseInt(a) < parseInt(b) ? -1 : 1;
	});
	sortedFiles.forEach((file) => {
		console.log(file);
		if (fs.lstatSync(filesDir + file).isFile()) {
			fs.appendFileSync("wabbajack/qwest.wabbajack", fs.readFileSync(filesDir + file));
		}
	});
}

async function wrapper() {
	await downloadFiles();
	combineFiles();
}

wrapper();
