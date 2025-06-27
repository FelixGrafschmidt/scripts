import "dotenv/config";
import * as fs from "fs";
import { Entry } from "./types.js";

const token = process.env.CRUNCHYROLL_TOKEN;
const id = process.env.CRUNCHYROLL_ID;
const locale = process.env.LOCALE || Intl.DateTimeFormat().resolvedOptions().locale;

const pageSize = 1000;
let page = 1;
let max = Infinity;

const dateFormat = new Intl.DateTimeFormat(locale, {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

async function fetchHistory() {
	if (!token) {
		console.error("CRUNCHYROLL_TOKEN is not set in the environment variables.");
		process.exit(1);
	}
	if (!id) {
		console.error("CRUNCHYROLL_ID is not set in the environment variables.");
		process.exit(1);
	}
	fs.rm("./cr_history.json", { force: true }, (err) => {
		if (err) {
			console.error("Error deleting file:", err);
		} else {
			console.log("File deleted successfully.");
		}
	});
	const entries: Entry[] = [];

	while (true) {
		if ((page - 1) * pageSize > max) {
			break; // Stop if we've reached the maximum number of entries
		}
		const response = await fetch(`https://www.crunchyroll.com/content/v2/${id}/watch-history?page=${page}&page_size=${pageSize}`, {
			headers: {
				authorization: token,
			},
			body: null,
			method: "GET",
		});
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			break;
		}
		const data = await response.json();
		entries.push(...data.data);
		max = Math.min(max, data.total);
		page++;
	}

	const dataToWrite = [];

	for (const entry of entries) {
		if (!entry.panel) {
			console.warn("No panel data found for entry:", entry);
			continue;
		}
		switch (entry.panel.type) {
			case "episode":
				if (!entry.panel?.episode_metadata?.series_title) {
					console.warn("No series title found for episode entry:", entry);
					continue;
				}
				dataToWrite.push({
					title: entry.panel.episode_metadata.series_title,
					episode: entry.panel.title,
					date: dateFormat.format(new Date(entry.date_played)),
				});
				break;
			case "movie":
				if (!entry.panel?.title) {
					console.warn("No title found for movie entry:", entry);
					continue;
				}
				dataToWrite.push({
					title: entry.panel.title,
					date: dateFormat.format(new Date(entry.date_played)),
				});
				break;
			default:
				console.warn("Unknown panel type for entry:", entry);
				continue;
		}
	}

	fs.appendFile("./cr_history.json", JSON.stringify(dataToWrite, null, 2), (err) => {
		if (err) {
			console.error("Error writing file:", err);
		} else {
			console.log("File has been saved.");
		}
	});
}

await fetchHistory();
