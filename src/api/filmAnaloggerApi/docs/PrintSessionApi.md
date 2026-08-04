# PrintSessionApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPrintSessionsGetCollection**](#apiprintsessionsgetcollection) | **GET** /print_sessions | Retrieves the collection of PrintSession resources.|
|[**apiPrintSessionsIdDelete**](#apiprintsessionsiddelete) | **DELETE** /print_sessions/{id} | Removes the PrintSession resource.|
|[**apiPrintSessionsIdGet**](#apiprintsessionsidget) | **GET** /print_sessions/{id} | Retrieves a PrintSession resource.|
|[**apiPrintSessionsIdPatch**](#apiprintsessionsidpatch) | **PATCH** /print_sessions/{id} | Updates the PrintSession resource.|
|[**apiPrintSessionsPost**](#apiprintsessionspost) | **POST** /print_sessions | Creates a PrintSession resource.|

# **apiPrintSessionsGetCollection**
> ApiPrintSessionsGetCollection200Response apiPrintSessionsGetCollection()

Retrieves the collection of PrintSession resources.

### Example

```typescript
import {
    PrintSessionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintSessionApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let dateBefore: string; // (optional) (default to undefined)
let dateStrictlyBefore: string; // (optional) (default to undefined)
let dateAfter: string; // (optional) (default to undefined)
let dateStrictlyAfter: string; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintSessionsGetCollection(
    page,
    dateBefore,
    dateStrictlyBefore,
    dateAfter,
    dateStrictlyAfter,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | The collection page number | (optional) defaults to 1|
| **dateBefore** | [**string**] |  | (optional) defaults to undefined|
| **dateStrictlyBefore** | [**string**] |  | (optional) defaults to undefined|
| **dateAfter** | [**string**] |  | (optional) defaults to undefined|
| **dateStrictlyAfter** | [**string**] |  | (optional) defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ApiPrintSessionsGetCollection200Response**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/ld+json, multipart/form-data


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**200** | PrintSession collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintSessionsIdDelete**
> apiPrintSessionsIdDelete()

Removes the PrintSession resource.

### Example

```typescript
import {
    PrintSessionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintSessionApi(configuration);

let id: string; //PrintSession identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintSessionsIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | PrintSession identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/ld+json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**204** | PrintSession resource deleted |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintSessionsIdGet**
> PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableRead apiPrintSessionsIdGet()

Retrieves a PrintSession resource.

### Example

```typescript
import {
    PrintSessionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintSessionApi(configuration);

let id: string; //PrintSession identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintSessionsIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | PrintSession identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/ld+json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**200** | PrintSession resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintSessionsIdPatch**
> PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableRead apiPrintSessionsIdPatch(printSessionWritePrintSessionJsonMergePatch)

Updates the PrintSession resource.

### Example

```typescript
import {
    PrintSessionApi,
    Configuration,
    PrintSessionWritePrintSessionJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintSessionApi(configuration);

let id: string; //PrintSession identifier (default to undefined)
let printSessionWritePrintSessionJsonMergePatch: PrintSessionWritePrintSessionJsonMergePatch; //The updated PrintSession resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintSessionsIdPatch(
    id,
    printSessionWritePrintSessionJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **printSessionWritePrintSessionJsonMergePatch** | **PrintSessionWritePrintSessionJsonMergePatch**| The updated PrintSession resource | |
| **id** | [**string**] | PrintSession identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: application/merge-patch+json
 - **Accept**: application/json, application/ld+json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**200** | PrintSession resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintSessionsPost**
> PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableRead apiPrintSessionsPost(printSessionWritePrintSession)

Creates a PrintSession resource.

### Example

```typescript
import {
    PrintSessionApi,
    Configuration,
    PrintSessionWritePrintSession
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintSessionApi(configuration);

let printSessionWritePrintSession: PrintSessionWritePrintSession; //The new PrintSession resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintSessionsPost(
    printSessionWritePrintSession,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **printSessionWritePrintSession** | **PrintSessionWritePrintSession**| The new PrintSession resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PrintSessionJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: application/ld+json, application/json, multipart/form-data
 - **Accept**: application/json, application/ld+json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**201** | PrintSession resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

