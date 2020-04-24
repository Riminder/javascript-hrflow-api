# node-hrflow-api
⚡️ Hrflow API Node Wrapper

# Install

```bash
npm install --save hrflow
```

# Usage

```javascript
import Hrflow from 'hrflow';
const hrflow = new Hrflow({API_Key: "Your API Key"});
```

# API

## Hrflow

Class constructor for your client instance, it should be called with an `options` object where you define your `API_Key`.

> **Note:** All methods return a Promise when called. All promises can throw exceptions so you should catch them at the end of your promise.

## Source

### hrflow.source.list

Method that gets a list of sources.

```javascript
hrflow.source.list();
```

### hrflow.source.get

Method that gets a source by its id.

```javascript
hrflow.source.get("source_id_here");
```

## Job

### hrflow.job.searching.get()

Method that gets a list of jobs.

```javascript
hrflow.job.searching.get();
```

### hrflow.job.parsing.get()

Method that gets the job parsing by its id or its reference. It accepts an object as follows

```javascript
const options = {
    job_id: "job_id",
    // Or
    job_reference: "job_reference"
}

hrflow.job.parsing.get(options);
```

## Profile

### hrflow.profile.searching.list()

Method that gets a list of profiles potentially filtered. It uses the following object to filter the results.
Only the array source_ids is required

```javascript
const options =  {
  source_ids: ['source_id1', 'source_id2',..], // Required, list of sources ids
  limit: 10, //  Total profiles to search
  page: 1, //  Page number
  order_by: 'asc', // Order by 'asc' or 'desc'
  sort_by: 'date_reception', // Sort by 'date_reception', 'date_creation', 'location', 'location_experience', 'location_education', 'score_semantic'  or 'score_predictive'
  timestamp_start: 1569320033, // 'Start date'
  timestamp_end: 1586945633,  // 'Start date'
  name: 'name', // Profile's name  
  email: 'exemple@exemple.com', // Profile's email
  location_geopoint: {
    // Filter by location's latitude and longitude
    lat: '357516600',
    lon: '10.7110900',
  },
  location_distance: 40, // Filter by location distance in km
  summary_keywords: ['keyword1', 'keyword2',...], // Filter by summary keywords
  text_keywords: ['keyword1', 'keyword2',...], // Filter by text keywords,
  experience_keywords: ['keyword1', 'keyword2',...], // Filter by experience keywords
  experience_location_geopoint: {
  // Filter by experience's latitude and longitude
    lat: '357516600',
    lon: '10.7110900',
  },
  experience_location_distance:  40, // Filter by experience location distance in km
  experiences_duration_min: 3, // Min total years of experience
  experiences_duration_max: 7, // Max total years of experience
  skills_dict: ['skill1', 'skill2', ...], // List of skills
  languages_dict: ['lang1',..], // List of language
  interests_dict: ['interest1', 'interest2',...], // List of interests 
  tags_dict: ['tag1', 'tag2', ...], // List of tags
}


hrflow.profile.searching.get(options);

```


