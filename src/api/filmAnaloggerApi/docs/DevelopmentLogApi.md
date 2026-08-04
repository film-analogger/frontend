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
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiDevelopmentLogsGetCollection(
    page,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | The collection page number | (optional) defaults to 1|
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

