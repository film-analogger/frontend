# DevelopmentLogApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiDevelopmentLogsGetCollection**](#apidevelopmentlogsgetcollection) | **GET** /development_logs | Retrieves the collection of DevelopmentLog resources.|
|[**apiDevelopmentLogsIdDelete**](#apidevelopmentlogsiddelete) | **DELETE** /development_logs/{id} | Removes the DevelopmentLog resource.|
|[**apiDevelopmentLogsIdGet**](#apidevelopmentlogsidget) | **GET** /development_logs/{id} | Retrieves a DevelopmentLog resource.|
|[**apiDevelopmentLogsIdPatch**](#apidevelopmentlogsidpatch) | **PATCH** /development_logs/{id} | Updates the DevelopmentLog resource.|
|[**apiDevelopmentLogsPost**](#apidevelopmentlogspost) | **POST** /development_logs | Creates a DevelopmentLog resource.|

# **apiDevelopmentLogsGetCollection**
> ApiDevelopmentLogsGetCollection200Response apiDevelopmentLogsGetCollection()

Retrieves the collection of DevelopmentLog resources.

### Example

```typescript
import {
    DevelopmentLogApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevelopmentLogApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let film: string; // (optional) (default to undefined)
let film2: Array<string>; // (optional) (default to undefined)
let camera: string; // (optional) (default to undefined)
let camera2: Array<string>; // (optional) (default to undefined)
let shotAtYear: number; // (optional) (default to undefined)
let shotAtYear2: Array<number>; // (optional) (default to undefined)
let shotAtMonth: number; // (optional) (default to undefined)
let shotAtMonth2: Array<number>; // (optional) (default to undefined)
let isoShotAt: number; // (optional) (default to undefined)
let isoShotAt2: Array<number>; // (optional) (default to undefined)
let shootingNotes: string; // (optional) (default to undefined)
let process: string; // (optional) (default to undefined)
let process2: Array<string>; // (optional) (default to undefined)
let stepsChemistryName: string; // (optional) (default to undefined)
let rating: number; // (optional) (default to undefined)
let rating2: Array<number>; // (optional) (default to undefined)
let tags: string; // (optional) (default to undefined)
let tags2: Array<string>; // (optional) (default to undefined)
let binderId: string; // (optional) (default to undefined)
let contactSheetNumber: number; // (optional) (default to undefined)
let contactSheetNumber2: Array<number>; // (optional) (default to undefined)
let ratingBetween: string; // (optional) (default to undefined)
let ratingGt: string; // (optional) (default to undefined)
let ratingGte: string; // (optional) (default to undefined)
let ratingLt: string; // (optional) (default to undefined)
let ratingLte: string; // (optional) (default to undefined)
let developedAtBefore: string; // (optional) (default to undefined)
let developedAtStrictlyBefore: string; // (optional) (default to undefined)
let developedAtAfter: string; // (optional) (default to undefined)
let developedAtStrictlyAfter: string; // (optional) (default to undefined)
let pulled: boolean; //Filters development logs shot below the film\'s nominal sensibility (isoShotAt < film.sensibility). (optional) (default to undefined)
let pushed: boolean; //Filters development logs shot above the film\'s nominal sensibility (isoShotAt > film.sensibility). (optional) (default to undefined)
let orderShotAt: 'asc' | 'desc'; // (optional) (default to 'asc')
let orderDevelopedAt: 'asc' | 'desc'; // (optional) (default to 'asc')
let orderBinderId: 'asc' | 'desc'; // (optional) (default to 'asc')
let orderContactSheetNumber: 'asc' | 'desc'; // (optional) (default to 'asc')
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiDevelopmentLogsGetCollection(
    page,
    film,
    film2,
    camera,
    camera2,
    shotAtYear,
    shotAtYear2,
    shotAtMonth,
    shotAtMonth2,
    isoShotAt,
    isoShotAt2,
    shootingNotes,
    process,
    process2,
    stepsChemistryName,
    rating,
    rating2,
    tags,
    tags2,
    binderId,
    contactSheetNumber,
    contactSheetNumber2,
    ratingBetween,
    ratingGt,
    ratingGte,
    ratingLt,
    ratingLte,
    developedAtBefore,
    developedAtStrictlyBefore,
    developedAtAfter,
    developedAtStrictlyAfter,
    pulled,
    pushed,
    orderShotAt,
    orderDevelopedAt,
    orderBinderId,
    orderContactSheetNumber,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | The collection page number | (optional) defaults to 1|
| **film** | [**string**] |  | (optional) defaults to undefined|
| **film2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **camera** | [**string**] |  | (optional) defaults to undefined|
| **camera2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **shotAtYear** | [**number**] |  | (optional) defaults to undefined|
| **shotAtYear2** | **Array&lt;number&gt;** |  | (optional) defaults to undefined|
| **shotAtMonth** | [**number**] |  | (optional) defaults to undefined|
| **shotAtMonth2** | **Array&lt;number&gt;** |  | (optional) defaults to undefined|
| **isoShotAt** | [**number**] |  | (optional) defaults to undefined|
| **isoShotAt2** | **Array&lt;number&gt;** |  | (optional) defaults to undefined|
| **shootingNotes** | [**string**] |  | (optional) defaults to undefined|
| **process** | [**string**] |  | (optional) defaults to undefined|
| **process2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **stepsChemistryName** | [**string**] |  | (optional) defaults to undefined|
| **rating** | [**number**] |  | (optional) defaults to undefined|
| **rating2** | **Array&lt;number&gt;** |  | (optional) defaults to undefined|
| **tags** | [**string**] |  | (optional) defaults to undefined|
| **tags2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **binderId** | [**string**] |  | (optional) defaults to undefined|
| **contactSheetNumber** | [**number**] |  | (optional) defaults to undefined|
| **contactSheetNumber2** | **Array&lt;number&gt;** |  | (optional) defaults to undefined|
| **ratingBetween** | [**string**] |  | (optional) defaults to undefined|
| **ratingGt** | [**string**] |  | (optional) defaults to undefined|
| **ratingGte** | [**string**] |  | (optional) defaults to undefined|
| **ratingLt** | [**string**] |  | (optional) defaults to undefined|
| **ratingLte** | [**string**] |  | (optional) defaults to undefined|
| **developedAtBefore** | [**string**] |  | (optional) defaults to undefined|
| **developedAtStrictlyBefore** | [**string**] |  | (optional) defaults to undefined|
| **developedAtAfter** | [**string**] |  | (optional) defaults to undefined|
| **developedAtStrictlyAfter** | [**string**] |  | (optional) defaults to undefined|
| **pulled** | [**boolean**] | Filters development logs shot below the film\&#39;s nominal sensibility (isoShotAt &lt; film.sensibility). | (optional) defaults to undefined|
| **pushed** | [**boolean**] | Filters development logs shot above the film\&#39;s nominal sensibility (isoShotAt &gt; film.sensibility). | (optional) defaults to undefined|
| **orderShotAt** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to 'asc'|
| **orderDevelopedAt** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to 'asc'|
| **orderBinderId** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to 'asc'|
| **orderContactSheetNumber** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to 'asc'|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ApiDevelopmentLogsGetCollection200Response**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | DevelopmentLog collection |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiDevelopmentLogsIdDelete**
> apiDevelopmentLogsIdDelete()

Removes the DevelopmentLog resource.

### Example

```typescript
import {
    DevelopmentLogApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevelopmentLogApi(configuration);

let id: string; //DevelopmentLog identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiDevelopmentLogsIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | DevelopmentLog identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/ld+json, application/problem+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | DevelopmentLog resource deleted |  -  |
|**403** | Forbidden |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiDevelopmentLogsIdGet**
> DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead apiDevelopmentLogsIdGet()

Retrieves a DevelopmentLog resource.

### Example

```typescript
import {
    DevelopmentLogApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevelopmentLogApi(configuration);

let id: string; //DevelopmentLog identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiDevelopmentLogsIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | DevelopmentLog identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | DevelopmentLog resource |  -  |
|**403** | Forbidden |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiDevelopmentLogsIdPatch**
> DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableRead apiDevelopmentLogsIdPatch(developmentLogWriteDevelopmentLogJsonMergePatch)

Updates the DevelopmentLog resource.

### Example

```typescript
import {
    DevelopmentLogApi,
    Configuration,
    DevelopmentLogWriteDevelopmentLogJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new DevelopmentLogApi(configuration);

let id: string; //DevelopmentLog identifier (default to undefined)
let developmentLogWriteDevelopmentLogJsonMergePatch: DevelopmentLogWriteDevelopmentLogJsonMergePatch; //The updated DevelopmentLog resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiDevelopmentLogsIdPatch(
    id,
    developmentLogWriteDevelopmentLogJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **developmentLogWriteDevelopmentLogJsonMergePatch** | **DevelopmentLogWriteDevelopmentLogJsonMergePatch**| The updated DevelopmentLog resource | |
| **id** | [**string**] | DevelopmentLog identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: application/merge-patch+json
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | DevelopmentLog resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**403** | Forbidden |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiDevelopmentLogsPost**
> DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableRead apiDevelopmentLogsPost(developmentLogWriteDevelopmentLog)

Creates a DevelopmentLog resource.

### Example

```typescript
import {
    DevelopmentLogApi,
    Configuration,
    DevelopmentLogWriteDevelopmentLog
} from './api';

const configuration = new Configuration();
const apiInstance = new DevelopmentLogApi(configuration);

let developmentLogWriteDevelopmentLog: DevelopmentLogWriteDevelopmentLog; //The new DevelopmentLog resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiDevelopmentLogsPost(
    developmentLogWriteDevelopmentLog,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **developmentLogWriteDevelopmentLog** | **DevelopmentLogWriteDevelopmentLog**| The new DevelopmentLog resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: application/ld+json, application/json, multipart/form-data
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | DevelopmentLog resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

