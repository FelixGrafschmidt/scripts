export interface Entry {
	id: string;
	date_played: string;
	parent_id: string;
	parent_type: string;
	playhead: number;
	fully_watched: boolean;
	panel?: Panel;
}

export interface Panel {
	episode_metadata?: EpisodeMetadata;
	promo_description: string;
	linked_resource_key: string;
	id: string;
	streams_link: string;
	external_id: string;
	promo_title: string;
	slug: string;
	slug_title: string;
	title: string;
	images: Images;
	type: string;
	channel_id: string;
	description: string;
	movie_metadata?: MovieMetadata;
}

export interface EpisodeMetadata {
	audio_locale: string;
	availability_ends: string;
	availability_notes: string;
	availability_starts: string;
	availability_status: string;
	available_date: string | null;
	available_offline: boolean;
	closed_captions_available: boolean;
	content_descriptors?: string[];
	duration_ms: number;
	eligible_region: string;
	episode: string;
	episode_air_date: string;
	episode_number?: number;
	extended_maturity_rating: ExtendedMaturityRating;
	free_available_date: string;
	identifier: string;
	is_clip: boolean;
	is_dubbed: boolean;
	is_mature: boolean;
	is_premium_only: boolean;
	is_subbed: boolean;
	mature_blocked: boolean;
	maturity_ratings: string[];
	premium_available_date: string;
	premium_date: string | null;
	roles: string[];
	season_display_number: string;
	season_id: string;
	season_number: number;
	season_sequence_number: number;
	season_slug_title: string;
	season_title: string;
	sequence_number: number;
	series_id: string;
	series_slug_title: string;
	series_title: string;
	subtitle_locales: string[];
	upload_date: string;
	versions?: Version[];
	tenant_categories?: string[];
}

export interface ExtendedMaturityRating {
	level: string;
	rating: string;
	system: string;
}

export interface Version {
	audio_locale: string;
	guid: string;
	is_premium_only: boolean;
	media_guid: string;
	original: boolean;
	roles: string[];
	season_guid: string;
	variant: string;
}

export interface Images {
	thumbnail: Thumbnail[][];
}

export interface Thumbnail {
	height: number;
	source: string;
	type: string;
	width: number;
}

export interface MovieMetadata {
	SeriesGUID: string;
	availability_notes: string;
	availability_status: string;
	available_date: string | null;
	available_offline: boolean;
	closed_captions_available: boolean;
	content_descriptors: string[];
	duration_ms: number;
	extended_maturity_rating: ExtendedMaturityRating2;
	free_available_date: string;
	is_dubbed: boolean;
	is_mature: boolean;
	is_premium_only: boolean;
	is_subbed: boolean;
	mature_blocked: boolean;
	maturity_ratings: string[];
	movie_listing_id: string;
	movie_listing_slug_title: string;
	movie_listing_title: string;
	premium_available_date: string;
	premium_date: string | null;
}

export interface ExtendedMaturityRating2 {
	level: string;
	rating: string;
	system: string;
}
