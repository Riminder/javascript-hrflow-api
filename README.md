# node-hrflow-api
⚡️ Hrflow API javascript/node Wrapper

# Install

```bash
npm install --save hrflow
```

# Usage

```javascript
import Hrflow from 'hrflow';
const client = new Hrflow({ 
    api_secret: "Your API Key",
    api_user: "Your API user email" 
});
```

# API

## Hrflow

Class constructor for your client instance, it should be called with an `options` object where you define your `
`.

> **Note:** All methods return a Promise when called. All promises can throw exceptions so you should catch them at the end of your promise.

## Source

### client.source.list

Method that gets a list of sources.

```javascript
client.source.list();
```

### client.source.get

Method that gets a source by its key.

```javascript
client.source.get("source_key_here");
```

## Job

### client.job.add

Method that allow you to add a new job given its json

```javascript
const data = {
    "board_key": "board_key",
    "name": "Data Engineer",
    "agent_key": "agent_key",
    "reference": "Job's reference abc",
    "url": "https://www.pole-emploi.ai/jobs/data_engineer",
    "summary": "As an engineer for the Data Engineering Infrastructure team,
                you will design, build, scale, and evolve our data engineering
                platform, services and tooling. Your work will have a critical 
                impact on all areas of business: powering core data pipelines,
                supporting detailed internal analytics, calculating customer
                usage, securing our platform, and much more.",
    "location": {
                  "text": "Dampierre en Burly (45)",
                  "geopoint": {
                      "lat": 47.7667,
                      "lon": 2.5167
                  }
                 },
    "sections": [{
                    "name": "profile",
                    "title": "Searched Profile",
                    "description": "Bac+5"
                  }],
    "skills": [{
                  "name": "python",
                  "value": null
               },
               {
                  "name": "spark",
                  "value": 0.9
               }],
    "languages": [{
                     "name": "english",
                     "value": 1
                  },
                 {  
                     "name": "french",
                     "value": 1
                  }],
    "tags": [{
                "name": "archive",
                "value": true
             },
             {  
                "name": "tag example",
                "value": "tag"
              }],
    "ranges_date": [{
                       "name": "Dates",
                       "value_min": "2020-05-18T21:59",
                       "value_max": "2020-09-15T21:59"
                    }],
    "ranges_float": [{
                       "name": "salary",
                       "value_min": 30,
                       "value_max": 40,
                       "unit": "eur"
                    }],
    "metadatas": [{
                     "name": "metadata example",
                     "value": "metadata"
                  }],
}

client.job.add(data).then(response => {
    console.log(response);
});
```

### client.job.add

Method that allow you to update an existing job using its key

```javascript
const data = {
    "key": "job_key"
    "board_key": "board_key",
    "name": "Data Engineer",
    "agent_key": "agent_key",
    "reference": "Job's reference abc",
    "url": "https://www.pole-emploi.ai/jobs/data_engineer",
    "summary": "As an engineer for the Data Engineering Infrastructure team,
                you will design, build, scale, and evolve our data engineering
                platform, services and tooling. Your work will have a critical 
                impact on all areas of business: powering core data pipelines,
                supporting detailed internal analytics, calculating customer
                usage, securing our platform, and much more.",
    "location": {
                  "text": "Dampierre en Burly (45)",
                  "geopoint": {
                      "lat": 47.7667,
                      "lon": 2.5167
                  }
                 },
    "sections": [{
                    "name": "profile",
                    "title": "Searched Profile",
                    "description": "Bac+5"
                  }],
    "skills": [{
                  "name": "python",
                  "value": null
               },
               {
                  "name": "spark",
                  "value": 0.9
               }],
    "languages": [{
                     "name": "english",
                     "value": 1
                  },
                 {  
                     "name": "french",
                     "value": 1
                  }],
    "tags": [{
                "name": "archive",
                "value": true
             },
             {  
                "name": "tag example",
                "value": "tag"
              }],
    "ranges_date": [{
                       "name": "Dates",
                       "value_min": "2020-05-18T21:59",
                       "value_max": "2020-09-15T21:59"
                    }],
    "ranges_float": [{
                       "name": "salary",
                       "value_min": 30,
                       "value_max": 40,
                       "unit": "eur"
                    }],
    "metadatas": [{
                     "name": "metadata example",
                     "value": "metadata"
                  }],
}

client.job.edit(data).then(response => {
    console.log(response);
});
```


### client.job.searching.list

Method that gets a list of jobs.

```javascript
const params = {
    board_key: 'board_key',
    name: "data scientist",
    page: 1,
    limit: 10,
    order_by: "asc",
    sort_by: "date",
    text_keywords: ["engineer", "python"],
    tags: [{name: "active", value: true}],
    location_distance: 30,
    location_geopoint: {"lat":33.59662,"lng":-7.61889}
}

client.job.searching.list(params).then(response => {
    console.log(response);
});
```

### client.job.indexing.get

Method that gets the job indexing by its key or its reference.

```javascript
const data = {
    board_key: "board_key"
    key: "job_key",
    // Or
    job_reference: "job_reference"
}

client.job.indexing.get(data);
```

### client.job.scoring.list

Method that list the jobs scoring for a job.

```javascript
const params = {
    board_keys: ['board_key'],
    agent_key: 'agent_key',
    profile_key: 'profile_key',
    source_key: 'source_key',
    name: "data scientist",
    page: 1,
    limit: 10,
    order_by: "asc",
    sort_by: "date",
    text_keywords: ["engineer", "python"],
    tags_included: [[{name: "active", value: true}]],
    location_distance: 30,
    location_geopoint: {"lat":33.59662,"lng":-7.61889}
}


client.job.scoring.list(params).then(response => {
    console.log(response);
});
```

### client.job.searching.list

Method that search for a list of jobs using a specific filters.

```javascript
const params = {
    board_key: 'board_key',
    name: "data scientist",
    page: 1,
    limit: 10,
    order_by: "asc",
    sort_by: "date",
    text_keywords: ["engineer", "python"],
    tags_included: [[{name: "active", value: true}]],
    location_distance: 30,
    location_geopoint: {"lat":33.59662,"lng":-7.61889}
}


client.job.searching.list(params).then(response => {
    console.log(response);
});
```


<!-- ### client.job.parsing.get

Method that gets the job parsing by its id or its reference. It accepts an object as follows

```javascript
const data = {
    job_key: "job_key",
    // Or
    job_reference: "job_reference"
}

client.job.parsing.get(data);
``` -->

## Profile

### client.profile.searching.list

Method that gets a list of profiles potentially filtered. It uses the following object to filter the results.
Only the array source_keys is required

```javascript
const data = {
  source_keys: ['source_key1', 'source_key2',..], // Required, list of sources ids
  limit: 10, //  Total profiles to search
  page: 1, //  Page number
  order_by: 'asc', // Order by 'asc' or 'desc'
  sort_by: 'date_reception', // Sort by 'date_reception', 'date_creation', 'location', 'location_experience', 'location_education', 'score_semantic'  or 'score_predictive'
  created_at_min: '2020-05-15T23:59:59.999Z', // 'Start date'
  created_at_max: '2020-07-15T23:59:59.999Z',  // 'Start date'
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
  skills: [{name: 'python', value: 0.9}], // List of skills
  languages: [{name: 'english', value: 'fluent'}], // List of language
  interests: [{name: 'design', value: 1}], // List of interests 
  tags: [{name: 'active', value: true}], // List of tags
}


client.profile.searching.list(data);

```

### client.profile.addFile()

Method that uploads a resume for a particular profile. It uses the following data:

```javascript
const data = {
  source_key: "source_key", // Required, list of sources ids
  file: fs.createReadStream("path to your file"), // Required, profile's document
  created_at: 1569320033,  // Reception date
  metadatas: [{"name":"mail","value":"test@test.com"}, ...], // Profile's metadatas
  profile_content_type: 'application/pdf', // Document content type
  reference: 'reference', // Profile's reference
  labels:  [ // Profile's label
    {
      "job_key": "job_key",
      "job_reference": "test",
      "stage": "yes",
      "stage_timestamp":1585662186,
      "rating":0.5,
      "stage_timestamp":1585662186
    }, 
    ...
  ],
  tags:  [{"name":"blacklist","value":true}, ...], // Profile's tags
  sync_parsing: 1, // enable/disable real time parsing
}

client.profile.addFile(data);
```


### client.profile.addJson()

Method that post a json data for a particular profile. It uses the following data:

```javascript
const data = {
  "source_key": "source_key",
  "consent_algorithmic": {
      "owner": {
          "parsing": true,
          "revealing": false,
          "embedding": true,
          "searching": false,
          "scoring": true,
          "reasoning": false
      },
      "controller": {
          "parsing": true,
          "revealing": false,
          "embedding": true,
          "searching": false,
          "scoring": true,
          "reasoning": false
      }
  },
  "info": {
      "full_name": "Harry Potter",
      "first_name": "Harry",
      "last_name": "Potter",
      "email": "harry.potter@gmail.com",
      "phone": "0202",
      "gender": null,
      "urls": {
          "from_resume": [],
          "linkedin": "",
          "twitter": "",
          "facebook": "",
          "github": "",
          "picture": ""
      },
      "picture": null,
      "location": {
          "text": null
      },
      "summary": "Brief summary"
  },
  "text": "test text",
  "experiences": [
      {
          "date_start": "15/02/1900",
          "date_end": "",
          "title": "Lead",
          "company": "Mathematic Departement",
          "location": {
              "text": "Paris"
          },
          "description": "Developping."
      }
  ],
  "experiences_duration": 5,
  "educations": [
      {
          "date_start": "12540",
          "date_end": "12550",
          "title": "Mathematicien",
          "school": "University",
          "description": "Description",
          "location": {
              "text": "Scotland"
          }
      }
  ],
  "educations_duration": 4,
  "skills": [
      {
          "name": "manual skill",
          "value": null
      },
      {
          "name": "Creative spirit",
          "value": null
      },
      {
          "name": "Writing skills",
          "value": null
      },
      {
          "name": "Communication",
          "value": null
      }
  ],
  "languages": [
      {
          "name": "english",
          "value": null
      }
  ],
  "interests": [
      {
          "name": "football",
          "value": null
      }
  ],
  "tags": [],
  "metadatas": [],
  "labels": [
      {
          "stage": "yes",
          "job_key": "job_key"
      }
  ],
  "attachments": [],
  "created_at": new Date().toISOString(),
};

client.profile.addJson(data));
```

### client.profile.edit

Method that update an exesting profile.

```typescript
const data = {
  "key" : "profile_key",
  "source_key": "source_key",
  "consent_algorithmic": {
      "owner": {
          "parsing": true,
          "revealing": false,
          "embedding": true,
          "searching": false,
          "scoring": true,
          "reasoning": false
      },
      "controller": {
          "parsing": true,
          "revealing": false,
          "embedding": true,
          "searching": false,
          "scoring": true,
          "reasoning": false
      }
  },
  "info": {
      "full_name": "Harry Potter",
      "first_name": "Harry",
      "last_name": "Potter",
      "email": "harry.potter@gmail.com",
      "phone": "0202",
      "gender": null,
      "urls": {
          "from_resume": [],
          "linkedin": "",
          "twitter": "",
          "facebook": "",
          "github": "",
          "picture": ""
      },
      "picture": null,
      "location": {
          "text": null
      },
      "summary": "Brief summary"
  },
  "text": "test text",
  "experiences": [
      {
          "date_start": "15/02/1900",
          "date_end": "",
          "title": "Lead",
          "company": "Mathematic Departement",
          "location": {
              "text": "Paris"
          },
          "description": "Developping."
      }
  ],
  "experiences_duration": 5,
  "educations": [
      {
          "date_start": "12540",
          "date_end": "12550",
          "title": "Mathematicien",
          "school": "University",
          "description": "Description",
          "location": {
              "text": "Scotland"
          }
      }
  ],
  "educations_duration": 4,
  "skills": [
      {
          "name": "manual skill",
          "value": null
      },
      {
          "name": "Creative spirit",
          "value": null
      },
      {
          "name": "Writing skills",
          "value": null
      },
      {
          "name": "Communication",
          "value": null
      }
  ],
  "languages": [
      {
          "name": "english",
          "value": null
      }
  ],
  "interests": [
      {
          "name": "football",
          "value": null
      }
  ],
  "tags": [],
  "metadatas": [],
  "labels": [
      {
          "stage": "yes",
          "job_key": "job_key"
      }
  ],
  "attachments": [],
  "created_at": new Date().toISOString(),
};

client.profile.edit(data);
```


### client.profile.parsing.get

Method that gets the parsing result of a profile by its id or reference.

```typescript
const data = {
    source_key: "source_key",
    key: "profile_key",
    // Or
    reference: "reference"
}

client.profile.parsing.get(data);
```

### client.profile.indexing.get

Method that gets the indexing result of a profile by its id or reference.

```typescript
const data = {
    source_key: "source_key",
    key: "profile_key",
    // Or
    reference: "reference"
}

client.profile.indexing.get(data);
```

### client.profile.attachments.list

Method that gets the attachments associated to a profile by its key or reference.

```typescript
const data = {
    source_key: "source_key",
    profile_key: "profile_key",
    // Or
    reference: "reference",
    email: 'example@example.com',
}

client.profile.attachments.list(data);
```


<!-- ### client.profile.tags.list

Method that gets the tags associated to a profile by its id or reference.

```typescript
const data = {
    source_key: "source_key",
    profile_key: "id",
    // Or
    reference: "reference"
}

client.profile.tags.list(data);
``` -->

<!-- ### client.profile.metadatas.list

Method that gets the metadatas associated to a profile by its id or reference.

```typescript
const data = {
    source_key: "source_key",
    profile_key: "id",
    // Or
    reference: "reference"
}

client.profile.metadatas.list(data);
``` -->


### client.profile.searching.list

Method that search a list of profiles based on a list of filters.

```typescript

const params = {
  source_keys: ['source_key1', 'source_key2'],
  stage: 'new,
  limit: 10,
  page: 1,
  order_by: 'asc',
  sort_by: 'date',
  created_at_min: '2020-05-15T23:59:59.999Z',
  created_at_max: '2020-07-15T23:59:59.999Z',
  name: 'name',
  email: 'exemple@exemple.com',
  location_geopoint: {
    lat: '357516600',
    lon: '10.7110900',
  },
  location_distance: 40,
  summary_keywords: ['keyword1', 'keyword2'],
  text_keywords: ['keyword1', 'keyword2'],
  experience_keywords: ['keyword1', 'keyword2'],
  experience_location_geopoint: {
    lat: '357516600',
    lon: '10.7110900',
  },
  experience_location_distance:  40,
  experiences_duration_min: 3,
  experiences_duration_max: 7,
  skills: [{name: 'python', value: 0.9}],
  languages: [{name: 'english', value: 'fluent'}],
  interests: [{name: 'design', value: 1}],
  tags: [{name: 'active', value: true}],
}

hrflow.profile.searching.list(params);
```

### client.profile.scoring.list

Method that gets the scoring result of a profile by its key or reference.

```typescript

const params = {
  source_keys: ['source_key1', 'source_key2'],
  job_key: 'job_key',
  board_key: 'board_key',
  use_agent: 1,
  stage: 'new,
  limit: 10,
  page: 1,
  order_by: 'asc',
  sort_by: 'date',
  created_at_min: '2020-05-15T23:59:59.999Z',
  created_at_max: '2020-07-15T23:59:59.999Z',
  name: 'name',
  email: 'exemple@exemple.com',
  location_geopoint: {
    lat: '357516600',
    lon: '10.7110900',
  },
  location_distance: 40,
  summary_keywords: ['keyword1', 'keyword2'],
  text_keywords: ['keyword1', 'keyword2'],
  experience_keywords: ['keyword1', 'keyword2'],
  experience_location_geopoint: {
    lat: '357516600',
    lon: '10.7110900',
  },
  experience_location_distance:  40,
  experiences_duration_min: 3,
  experiences_duration_max: 7,
  skills: [{name: 'python', value: 0.9}],
  languages: [{name: 'english', value: 'fluent'}],
  interests: [{name: 'design', value: 1}],
  tags: [{name: 'active', value: true}],
}

hrflow.profile.scoring.list(params);
```


### client.profile.embedding.get

Method that reveals the embedding result of a profile (by id or reference) with a filter (by id or reference).

```typescript
const params = {
    source_key: "source_key",
    key: "profile_key",
    // Or
    reference: "reference",
    email: 'example@example.com'
    fields: {'profile': 1, 'skills':1, 'educations':[0]},
}

client.profile.embedding.get(params);
```


# Webhooks

## client.webhooks

This object is used to handle webhooks. If you give your webhooks secret key when you create the hrflow objects, you can set them up.

```typescript
const client = new Hrflow({
    
    : "Your API Key",
    api_user: "Your user email",
    webhooks_key: "Your Webhooks key",
});
```

## Check

### webhooks.check

This function is used to check if the webhook integration is set up.

```typescript
client.webhooks.check().then((response: WebhooksResponse) => console.log(response))

const WebhooksResponse {
  team_name: string;
  webhook_id: string;
  webhook_url: string;
}
```

## Events

The current list of events is:

```typescript
const events = [
 "profile.parsing.success",
  "profile.parsing.error",
  "profile.parsing.update",
  "profile.scoring.success",
  "profile.scoring.error",
  "profile.scoring.update",
  "profile.revealing.success",
  "profile.revealing.error",
  "profile.revealing.update",
  "profile.reasoning.success",
  "profile.reasoning.error",
  "profile.reasoning.update",
  "profile.embedding.success",
  "profile.embedding.error",
  "profile.embedding.update",
  "job.parsing.success",
  "job.parsing.error",
  "job.parsing.update",
  "job.scoring.success",
  "job.scoring.error",
  "job.scoring.update",
  "job.revealing.success",
  "job.revealing.error",
  "job.revealing.update",
  "job.reasoning.success",
  "job.reasoning.error",
  "job.reasoning.update",
  "job.embedding.success",
  "job.embedding.error",
  "job.embedding.update",
  "action.stage.success",
  "action.stage.error",
  "action.rating.success",
  "action.rating.error",
  "agent.training.success",
  "agent.training.error",
  "agent.training.update",
  "agent.scoring.success",
  "agent.scoring.error",
  "agent.scoring.update",
];
```

### webhooks.on

You can use this funtion to setup a callback function called when a particular event happens. The eventName is not mandatory, it's only here for simplicity.

```typescript
hrflow.webhooks.on("profile.parsing.success", (webhooksData: Webhooks.Response, eventName?: string) => {
    console.log("profile.parsing.success received !");
});
```

> **Note:** You can set a callback up only once, otherwise it will throw an error.

### webhooks.handle

This function is the callback you need to call when a request is received on the webhook endpoint.
It takes an object corresponding to the headers of the request and returns a function.

```typescript
router.post(".../webhooks", client.webhooks.handle(request.headers));
```