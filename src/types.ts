import { ReadStream } from "fs";
import { AnyTxtRecord } from "dns";
export interface HrflowOptions {
  API_Key: string;
  Webhooks_Key?: string;
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
  source_ids: Array<string>;
  limit?: number;
  page?: number;
  stage?: Stage;
  order_by?: OrderBy;
  sort_by?: SortBy;
  timestamp_start?: Date | number;
  timestamp_end?: Date | number;
  name?: string;
  email?: string;
  location_geopoint?: {
    lat: number;
    lon: number;
  };
  location_distance?: number;
  summary_keywords?: Array<string>;
  text_keywords?: Array<string>;
  experience_keywords?: Array<string>;
  experience_location_geopoint?: {
    lat: number;
    lon: number;
  };
  experience_location_distance?: number;
  experiences_duration_min?: number;
  experiences_duration_max?: number;
  skills_dict?: Array<string>;
  languages_dict?: Array<string>;
  interests_dict?: Array<string>;
  tags_dict?: Array<string>; 
}

export interface ProfilesScoringOptions {
  source_ids: Array<string>;
  job_id: string;
  use_agent?: number;
  stage?: string;
  limit?: number;
  page?: number;
  order_by?: string;
  sort_by?: string;
  timestamp_start?: Date | number;
  timestamp_end?: Date | number;
  name?: string;
  email?: string;
  location_geopoint?: any;
  location_distance?: number;
  summary_keywords?: Array<string>;
  text_keywords?: Array<string>;
  experience_keywords?: Array<string>;
  experience_location_geopoint?: {
    lat: number;
    lon: number;
  };
  experience_location_distance?: number;
  experiences_duration_min?: number;
  experiences_duration_max?: number;
  skills_dict?: Array<string>;
  languages_dict?: Array<string>;
  interests_dict?: Array<string>;
  tags_dict?: Array<string>; 
}

export interface jobsSearchingOptions {
  page?: number,
  limit?: number,
  order_by?: string,
  sort_by?: string,
  name?: string,
}

export interface ProfileOptionId {
  source_id: string;
  profile_id: string;
  profile_email?: string;
  fields?: any;
}

export interface ProfileOptionReference {
  source_id: string;
  profile_reference: string;
  profile_email?: string;
}

export type ProfileOptionIdOrReference = ProfileOptionId | ProfileOptionReference;

export interface jobOptionId {
  job_id: string;
}

export interface jobOptionReference {
  job_reference: string;
}

export type jobOptionIdOrReference = jobOptionId | jobOptionReference;
export interface TrainingMetadata {
  filter_reference: string;
  stage: Stage;
  stage_timestamp: Date | number;
  rating: number;
  rating_timestamp: Date | number;
}

export interface ProfileLabels {
  job_id?: string;
  job_reference?: string;
  stage?: string;
  rating?: number;
  stage_timestamp?: Date | number;
}
export interface ProfileUpload {
  source_id: string;
  file: ReadStream;
  profile_type?: any;
  profile_content_type?: string;
  profile_labels?: Array<ProfileLabels>;
  profile_reference?: string;
  timestamp_reception?: Date | number;
  training_metadata?: Array<TrainingMetadata>;
  sync_parsing?: boolean;
  profile_tags?: any;
}

export interface ProfileInfo {
  phone?: string;
  name?: string;
  email?: string;
  urls?: {
    from_resume?: Array<string>;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
    picture?: string;
  };
  location?: any;
}
export interface ProfileJSON {
  name?: string;
  email?: string;
  address?: string;
  summary?: string;
  info?: ProfileInfo;
  timestamp_reception?: Date | number;
  location_details?: {
    text?: string;
  };
  experiences?: Array<Experience>;
  educations?: Array<Education>;
  skills?: Array<string>;
  tags?: any;
  metadatas?: any;
  labels?: any;
  languages?: Array<string>;
  interests?: Array<string>;

}
export interface JsonUpload {
  source_id: string;
  profile_json: ProfileJSON;
  profile_type?: any;
  profile_labels?: Array<ProfileLabels>;
  profile_reference?: string;
  training_metadata?: Array<TrainingMetadata>;
  timestamp_reception?: Date | number;
  profile_tags?: any;
}

export interface StagePatchBase {
  source_id: string;
  stage: Stage | null;
}

export interface StagePatchProfileIdFilterId extends StagePatchBase {
  profile_id: string;
  filter_id: string;
}

export interface StagePatchProfileIdFilterReference extends StagePatchBase {
  profile_id: string;
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
  source_id: string;
  rating: number | null;
}

export interface RatingPatchProfileIdFilterId extends RatingPatchBase {
  profile_id: string;
  filter_id: string;
}

export interface RatingPatchProfileIdFilterReference extends RatingPatchBase {
  profile_id: string;
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
  start: string;
  end: string;
  title: string;
  company: string;
  location_details: {
    text: string;
  };
  location: string;
  description: string;
}

export interface Education {
  start: string;
  end: string;
  title: string;
  school: string;
  location_details: {
    text: string;
  };
  location: string;
  description: string;
}



export interface JsonUploadCheck {
  profile_json: ProfileJSON;
  training_metadata?: Array<TrainingMetadata>;
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
