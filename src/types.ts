import { ReadStream } from "fs";
export interface HrflowOptions {
  api_secret: string;
  api_user: string;
  webhooks_key?: string;
}

export interface HrflowAPIResponse {
  code: number;
  message: string;
  data?: any;
}

export interface SourcesOptions {
  name?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  order_by?: string;
} 
export interface profilesSearchingOptions {
  source_keys: Array<string>;
  stage?: string;
  limit?: number;
  page?: number;
  order_by?: string;
  sort_by?: string;
  created_at_min?: Date | number | string;
  created_at_max?: Date | number | string;
  name?: string;
  email?: string;
  location_geopoint?: any;
  location_distance?: number;
  text_keywords?: Array<string>;
  experience_location_geopoint?: {
    lat: number;
    lon: number;
  };
  experience_location_distance?: number;
  experiences_duration_min?: number;
  experiences_duration_max?: number;
  education_location_geopoint?: {
    lat: number;
    lon: number;
  };
  education_location_distance?: number;
  educations_duration_min?: number;
  educations_duration_max?: number;
  skills?: Array<Skills>;
  languages?: Array<Languages>;
  interests?: Array<Interests>;
  tags?: Array<Tags>; 
}

export interface ProfilesScoringOptions {
  source_keys: Array<string>;
  job_key: string;
  board_key: string;
  use_agent?: number;
  stage?: string;
  limit?: number;
  page?: number;
  order_by?: string;
  sort_by?: string;
  created_at_min?: Date | number | string;
  timestamp_end?: Date | number | string;
  name?: string;
  email?: string;
  location_geopoint?: any;
  location_distance?: number;
  text_keywords?: Array<string>;
  experience_location_geopoint?: {
    lat: number;
    lon: number;
  };
  experience_location_distance?: number;
  experiences_duration_min?: number;
  experiences_duration_max?: number;
  education_location_geopoint?: {
    lat: number;
    lon: number;
  };
  education_location_distance?: number;
  educations_duration_min?: number;
  educations_duration_max?: number;
  skills?: Array<Skills>;
  languages?: Array<Languages>;
  interests?: Array<Interests>;
  tags?: Array<Tags>; 
}

export interface JobPostOptions {
  name: string;
  board_key: string;
  agent_key: string;
  url?: string;
  reference?: string;
  summary?: string;
  sections?: Array<Sections>;
  ranges_date?: Array<RangesDate>;
  ranges_float?: Array<RangesFloat>;
  location?: {
    text: string;
    lat: any;
    lng: any;
  };
  skills?: Array<Skills>;
  Interests?: Array<Interests>;
  Languages?: Array<Languages>;
  tags?: Array<Tags>;
  metadatas?: Array<Metadatas>;
  created_at?: number | Date | string;
  members?: Array<string>;
}

export interface jobsScoringOptions {
  board_keys: Array<string>;
  agent_key: string;
  profile_key: string;
  source_key: string;
  text_keywords?: Array<string>;
  tags?: Array<Tags>;
  use_agent?: any;
  page?: number;
  limit?: number;
  order_by?: string;
  sort_by?: string;
  name?: string;
  location_distance?: number;
  location_geopoint?: any;

}
export interface jobsSearchingOptions {
  board_keys: Array<string>;
  page?: number;
  limit?: number;
  order_by?: string;
  sort_by?: string;
  name?: string;
  text_keywords?: Array<string>;
  tags?: Array<Tags>;
  location_distance?: number;
  location_geopoint: any;
}

export interface ProfileOptionId {
  source_key: string;
  key: string;
  profile_email?: string;
  fields?: any;
}

export interface ProfileOptionReference {
  source_key: string;
  profile_reference: string;
  profile_email?: string;
}

export type ProfileOptionIdOrReference = ProfileOptionId | ProfileOptionReference;

export interface jobOptionId {
  job_key: string;
}

export interface jobOptionReference {
  job_reference: string;
}

export type jobOptionIdOrReference = jobOptionId | jobOptionReference;
export interface Metadatas {
  name: string;
  value: any;
}

export interface Labels {
  job_key?: string;
  job_reference?: string;
  stage?: string;
  stage_timestamp?: Date | number;
  rating?: string;
  rating_timestamp?: string;
}
export interface ProfileUpload {
  source_key: string;
  sync_parsing?: number;
  file: ReadStream;
  profile_type?: any;
  profile_content_type?: string;
  profile_reference?: string;
  created_at?: Date | number;
  tags?: Array<Tags>;
  labels?: Labels;
  metadatas?: Array<Metadatas>;
  webhook_parsing_sending?: number;
}

export interface ProfileInfo {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  urls?: {
    from_resume?: Array<string>;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
    picture?: string;
  };
  location?: {
    text: string
  };
  summary?: string;
}

export interface ConsentAlgoritmic {
  owner: {
      parsing: boolean;
      revealing: boolean;
      embedding: boolean;
      searching: boolean;
      scoring: boolean;
      reasoning: boolean
  };
  controller: {
      parsing: boolean;
      revealing: boolean;
      embedding: boolean;
      searching: boolean;
      scoring: boolean;
      reasoning: boolean
  }
}
export interface ProfileJSON {
  source_key: string;
  info: ProfileInfo;
  profile_reference?: string;
  consent_algoritmic?: ConsentAlgoritmic;
  experiences?: Array<Experience>;
  educations?: Array<Education>;
  educations_duration?: number;
  eperience_duration?: number;
  text?: string;
  skills?: Array<Skills>;
  tags?: Array<Tags>;
  metadatas?: any;
  labels?: Labels;
  languages?: Array<Languages>;
  interests?: Array<Interests>;
  created_at?: number | Date;
}


export interface StagePatchBase {
  source_key: string;
  stage: Stage | null;
}

export interface StagePatchProfileIdFilterId extends StagePatchBase {
  profile_key: string;
  filter_id: string;
}

export interface StagePatchProfileIdFilterReference extends StagePatchBase {
  profile_key: string;
  filter_reference: string;
}

export interface StagePatchProfileReferenceFilterId extends StagePatchBase {
  profile_reference: string;
  filter_id: string;
}

export interface StagePatchProfileReferenceFilterReference extends StagePatchBase {
  profile_reference: string;
  filter_reference: string;
}

export type StagePatch =
  StagePatchProfileIdFilterId |
  StagePatchProfileIdFilterReference |
  StagePatchProfileReferenceFilterId |
  StagePatchProfileReferenceFilterReference;

export interface RatingPatchBase {
  source_key: string;
  rating: number | null;
}

export interface RatingPatchProfileIdFilterId extends RatingPatchBase {
  profile_key: string;
  filter_id: string;
}

export interface RatingPatchProfileIdFilterReference extends RatingPatchBase {
  profile_key: string;
  filter_reference: string;
}

export interface RatingPatchProfileReferenceFilterId extends RatingPatchBase {
  profile_reference: string;
  filter_id: string;
}

export interface RatingPatchProfileReferenceFilterReference extends RatingPatchBase {
  profile_reference: string;
  filter_reference: string;
}

export type RatingPatch =
  RatingPatchProfileIdFilterId |
  RatingPatchProfileIdFilterReference |
  RatingPatchProfileReferenceFilterId |
  RatingPatchProfileReferenceFilterReference;

export interface FilterId {
  filter_id: string;
}

export interface FilterReference {
  filter_reference: string;
}

export type FilterIdOrReference = FilterId | FilterReference;

export interface Experience {
  date_start: string;
  date_end: string;
  title: string;
  company: string;
  location: {
    text: string;
  };
  description: string;
}

export interface Education {
  date_start: string;
  date_end: string;
  title: string;
  school: string;
  location: {
    text: string;
  };
  description: string;
}

export interface Tags {
  name: string;
  value: any
}
export interface Skills {
  name: string;
  value: any
}

export interface Languages {
  name: string;
  value: any
}

export interface Interests {
  name: string;
  value: any
}

export interface Sections {
  name: string;
  title: string;
  description: string;
}

export interface RangesFloat {
  name: string;
  unit: string;
  value_min: number;
  value_max: number;
}

export interface RangesDate {
  name: string;
  value_min?: number | Date | string;
  value_max?:  number | Date | string;
}

export enum Stage {
  NEW = "NEW",
  YES = "YES",
  LATER = "LATER",
  NO = "NO",
}

export enum SortBy {
  DATE_RECEPTION = "date_reception",
  DATE_CREATION = "date_creation",
  LOCATION = "location",
  LOCATION_EXPERIENCE = "location_experience",
  LOCATION_EDUCATION = "location_education",
  SCORE_SEMENTIC = "score_semantic",
  SCORE_PREDECTIVE = "score_predictive",
}

export enum OrderBy {
  DESC = "desc",
  ASC = "asc"
}

export enum Seniority {
  ALL = "all",
  SENIOR = "senior",
  JUNIOR = "junior"
}

export interface WebhooksResponse {
  team_name: string;
  webhook_id: string;
  url: string;
  type: string;
}
