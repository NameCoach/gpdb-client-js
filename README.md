# Gpdb Client

The package is a simple wrapper around NameCoach GPDB (General Pronunciation Database) API.
It is useful to external developers who wish to add NameCoach services to an application. 

For more information on NameCoach GPDB APi, you can visit [documentation page](https://namecoachgpdb.docs.apiary.io/#).

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API](#api)
  - [Pronunciations](#pronunciations)
    - [Simple search](#simple-search)
    - [Complex search](#complex-search)
    - [Search by Sig](#search-by-sig)
    - [Create user response](#create-user-response)
    - [Create recording](#create-recording)
  - [Analytics Events](#analytics-events)
    - [Create](#create-analytics-events)
  - [Permissions](#permissions)
   - [Load](#load)
  

## Installation

Using npm:

```javascript
npm i --save gpdb-api-client
```

#### Configuration:

Specify all needed values through environment variables:

`GPDB_API_URL`           - api url (e.x. `https://gpdb.name-coach.com/api/public/v1`)  
`GPDB_ANALYTICS_API_URL` - analytics api url (e.x. `https://analytics-api-staging.name-coach.com/api/v1`)   
`GPDB_ACCESS_KEY_ID`     - access key id for your app   
`GPDB_SECRET_ACCESS_KEY` - secret access key for your app   

Or pass it manually:

```javascript
import { Configuration } from "gpdb-client";

const config = new Configuration({
  accessKeyId: 'access key',
  secretAccessKey: 'secret access key',
  apiUrl: 'https://gpdb.name-coach.com/api/public/v1',
  analyticsApiUrl: 'https://analytics-api-staging.name-coach.com/api/v1'
});
```

## Usage

You need to create a client instance to perform requests. Basic example:

```javascript
import { Client, TargetTypeSig } from "gpdb-client";
// ... configuration

const client = new Client({ instanceSig: 'example.com', typeSig: 'dns' }, config);
const result = await client.pronunciations.simpleSearch({ target: "Sergey", targetTypeSig: TargetTypeSig.FirstName, targetOwnerSig: "sergey" })
```

You can find detailed information about all possible parameters and the response format
on the [documentation page](https://namecoachgpdb.docs.apiary.io/#).
Links to the specific methods are placed at the end of each paragraph.

**All parameters should be in camelCase**

## API

### Pronunciations

#### Simple search

Quick simple request to get pronunciation for a single target.

```javascript
import { TargetTypeSig } from "gpdb-client";

const result = await client.pronunciations.simpleSearch({ 
  target: "Sergey", 
  targetTypeSig: TargetTypeSig.FirstName, 
  targetOwnerSig: "sergey" 
});

result
  // { target_result: { ... }, meta: { ... } }
```

[Simple search documentation](https://namecoachgpdb.docs.apiary.io/#reference/pronunciations/simple-search/simple-search)

#### Complex search

Perform a search in GPDB given between 1 and 10 search targets.

```javascript
import { TargetTypeSig } from "gpdb-client";

const result =  await client.pronunciations.complexSearch({
  targets: [
    { target: "jack", targetTypeSig: TargetTypeSig.FirstName, targetOwnerContext: { signature: 'uuid' } },
    { target: "pavel", targetTypeSig: TargetTypeSig.FirstName, targetOwnerContext: { signature: 'uuid' } } 
    ],
  userContext: { signature: "uuid" }
});

  result
  // { target_result: { ... }, meta: { ... } }
```

#### Search by Sig

Perform a search in GPDB by target owner signature.

```javascript
  const result =  await client.pronunciations.searchBySig({
    targetOwnerContext: { signature: "uuid" },
    userContext: { signature: "uuid" }
  });

  result
  // { target_result: { ... }, meta: { ... } }
```
    
TODO add link to docs after release

### Create User Response

Create a user response to a pronunciation if your licensing allows it.

```javascript

const result = await gpdbClient.pronunciations.userResponse({
  recordingId: "some_id",
  userResponse: "save",
  userContext: { signature: "uuid" },
  targetOwnerSig: "targetOwnerSig"
});

result
// {
//   "response_id": "aGPDBResponseSig",
//   "user_sig": "uuid",
//   "name_owner_sig": "targetOwnerSig",
//   "user_response": "save",
//   "created_at": "timestamp"
// }
```

[Create user response documentation](https://namecoachgpdb.docs.apiary.io/#reference/pronunciations/create-user-response/create-user-response)

### Create Recording

Creating a recording requires target (name), name owner context(not required but advised), user context and application context - required.

```javascript
import { TargetTypeSig } from "gpdb-client";

const result = await gpdbClient.pronunciations.createRecording({
  target: 'name',
  targetTypeSig: TargetTypeSig.FirstName,
  audioBase64: 'long_base64_string',
  userContext: { signature: 'userSig' },
  nameOwnerContext: { signature: 'nameOwnerSig' },
});

result
// {
//   "id": "ABCDE",
//   "name_text": "name",
//   "audio_url": "https://a.name-coach.audiourl",
// ...
// }
```
[Create recording documentation](https://namecoachgpdb.docs.apiary.io/#reference/pronunciations/create-a-pronunciation/create-a-pronunciation)

### Analytics Events

#### Create analytics events

Create analytics event:

```javascript
  await client.analyticsEvents.create({
    customerId: "uuid",
    entityId: "uuid",
    entityType: "playback",
    userId: "uuid"
  });
```
[Create analytics events documentation](https://s3-us-west-1.amazonaws.com/public-api-documentations/data-analytics-api.html#analytics-events-post)

### Permissions

#### Load

Quick simple request to get resource permissions for current app.

```javascript

  const result = await client.permissions.load();

  result
  // const permissionsManager = result;
  // const canCreateRecording = permissionsManager.can("pronounciation", "create");~~_``_~~
```
