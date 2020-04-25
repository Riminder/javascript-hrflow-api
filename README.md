# node-hrflow-api
⚡️ Hrflow API javascript/node Wrapper

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

### hrflow.job.searching.get

Method that gets a list of jobs.

```javascript
hrflow.job.searching.get();
```

### hrflow.job.parsing.get

Method that gets the job parsing by its id or its reference. It accepts an object as follows

```javascript
const data = {
    job_id: "job_id",
    // Or
    job_reference: "job_reference"
}

hrflow.job.parsing.get(data);
```

### hrflow.job.scoring.get

Method that gets the job scoring by its id or its reference. It accepts an object as follows

```javascript
const data = {
    job_id: "job_id",
    // Or
    job_reference: "job_reference"
}

hrflow.job.scoring.get(data);
```

### hrflow.job.reasoning.get

Method that gets the job reasoning by its id or its reference. It accepts an object as follows

```javascript
const data = {
    job_id: "job_id",
    // Or
    job_reference: "job_reference"
}

hrflow.job.reasoning.get(data);
```

## Profile

### hrflow.profile.searching.get

Method that gets a list of profiles potentially filtered. It uses the following object to filter the results.
Only the array source_ids is required

```javascript
const data =  {
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


hrflow.profile.searching.get(data);

```

### hrflow.profile.addFile()

Method that uploads a resume for a particular profile. It uses the following data:

```javascript
const data = {
  source_id: "source_id", // Required, list of sources ids
  file: fs.createReadStream("path to your file"), // Required, profile's document
  timestamp_reception: 1569320033,  // Reception date
  training_metadata?: [{"name":"mail","value":"test@test.com"}, ...], // Profile's metadatas
  profile_content_type: 'application/pdf', // Document content type
  profile_reference: 'profile_reference', // Profile's reference
  profile_labels:  [ // Profile's label
    {
      "job_id": "job_id",
      "job_reference": "test",
      "stage": "yes",
      "stage_timestamp":1585662186,
      "rating":0.5,
      "stage_timestamp":1585662186
    }, 
    ...
  ],
  profile_tags:  [{"name":"blacklist","value":True}, ...], // Profile's tags
  sync_parsing: true, // enable/disable real time parsing
}

hrflow.profile.addFile(data);
```


### hrflow.profile.addJosn()

Method that post a json data for a particular profile. It uses the following data:

```javascript
const profleJson = {
  "name": "Harry Potter",
  "email": "harry.potter@gmail.com",
  "address": "1 rue streeling",
  "info" : {
      "name":"Harry Potter",
      "email":"harry.potter@gmail.com",
      "phone":"0202",
      "location":"somewhere",
      "urls": {
          "from_resume": [],
          "linkedin":"",
          "twitter":"",
          "facebook":"",
          "github":"",
          "picture":""},
      "location":{"text":""}},
  "summary": "test summary",
  "experiences": [{
      "start": "15/02/1900",
      "end": "",
      "title": "Lead",
      "company": "Mathematic Departement",
      "location": {"text":"Paris"},
      "description": "Developping."
      }],
  "educations": [{
      "start": "12540",
      "end": "12550",
      "title": "Mathematicien",
      "school": "University",
      "description": "Description",
      "location": {"text":"Scotland"}
  }],
  "skills": ["manual skill", "Creative spirit", "Writing skills", "Communication"],
  "languages" : ["english"],
  "interests": ["football"],
  "tags":[],
  "metadatas":[],
  "labels":["stage":"yes","job_id":"job_id"]
}

const data = {
  source_id: "source_id", // Required, list of sources ids
  file: profleJson, // Required, Profile's json
  timestamp_reception: 1569320033,  // Reception date
  training_metadata?: [{"name":"mail","value":"test@test.com"}, ...], // Profile's metadatas
  profile_content_type: 'application/pdf', // Document content type
  profile_reference: 'profile_reference', // Profile's reference
  profile_labels:  [ // Profile's label
    {
      "job_id": "job_id",
      "job_reference": "test",
      "stage": "yes",
      "stage_timestamp":1585662186,
      "rating":0.5,
      "stage_timestamp":1585662186
    }, 
    ...
  ],
  profile_tags:  [{"name":"blacklist","value":True}, ...], // Profile's tags
  sync_parsing: true, // enable/disable real time parsing
}

hrflow.profile.addJson(data));
```


### hrflow.profile.attachments.list

Method that gets the attachments associated to a profile by its id or reference.

```typescript
const data = {
    source_id: "source_id",
    profile_id: "id",
    // Or
    profile_reference: "reference"
}

hrflow.profile.attachments.list(data);
```


### riminder.profile.tags.list

Method that gets the tags associated to a profile by its id or reference.

```typescript
const data = {
    source_id: "source_id",
    profile_id: "id",
    // Or
    profile_reference: "reference"
}

hrflow.profile.tags.list(data);
```

### riminder.profile.metadatas.list

Method that gets the metadatas associated to a profile by its id or reference.

```typescript
const data = {
    source_id: "source_id",
    profile_id: "id",
    // Or
    profile_reference: "reference"
}

hrflow.profile.metadatas.list(data);
```

### hrflow.profile.parsing.get

Method that gets the parsing result of a profile by its id or reference.

```typescript
const data = {
    source_id: "source_id",
    profile_id: "id",
    // Or
    profile_reference: "reference"
}

hrflow.profile.parsing.get(data);
```


### hrflow.profile.scoring.list

Method that gets the scoring result of a profile by its id or reference.

```typescript
const data = {
    source_id: "source_id",
    profile_id: "id",
    // Or
    profile_reference: "reference"
}

hrflow.profile.scoring.list(data);
```


### hrflow.profile.embedding.get

Method that reveals the embedding result of a profile (by id or reference) with a filter (by id or reference).

```typescript
const options: ProfileOptionIdOrReference = {
    source_id: "source_id",
    profile_id: "id",
    // Or
    profile_reference: "reference",
    filter_id: "id",
    // Or
    filter_reference: "reference"
}

hrflow.profile.embedding.get(options);
```


# Webhooks

## Hrflow.webhooks

This object is used to handle webhooks. If you give your webhooks secret key when you create the Hrflow objects, you can set them up.

```typescript
const hrflow = new Hrflow({
    API_Key: "Your API Key",
    Webhooks_Key: "Your Webhooks key"
});
```

## Check

### webhooks.check

This function is used to check if the webhook integration is set up.

```typescript
hrflow.webhooks.check().then((response: WebhooksResponse) => console.log(response))

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