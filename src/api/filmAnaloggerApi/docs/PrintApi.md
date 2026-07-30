# PrintApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPrintSessionsIdprintsGetCollection**](#apiprintsessionsidprintsgetcollection) | **GET** /print_sessions/{id}/prints | Retrieves the collection of Print resources.|
|[**apiPrintsGetCollection**](#apiprintsgetcollection) | **GET** /prints | Retrieves the collection of Print resources.|
|[**apiPrintsIdDelete**](#apiprintsiddelete) | **DELETE** /prints/{id} | Removes the Print resource.|
|[**apiPrintsIdGet**](#apiprintsidget) | **GET** /prints/{id} | Retrieves a Print resource.|
|[**apiPrintsIdPatch**](#apiprintsidpatch) | **PATCH** /prints/{id} | Updates the Print resource.|
|[**apiPrintsPost**](#apiprintspost) | **POST** /prints | Creates a Print resource.|

# **apiPrintSessionsIdprintsGetCollection**
> ApiPrintSessionsIdprintsGetCollection200Response apiPrintSessionsIdprintsGetCollection()

Retrieves the collection of Print resources.

### Example

```typescript
import {
    PrintApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintApi(configuration);

let id: string; //PrintSession identifier (default to undefined)
let page: number; //The collection page number (optional) (default to 1)
let session: string; // (optional) (default to undefined)
let session2: Array<string>; // (optional) (default to undefined)
let paperBrand: string; // (optional) (default to undefined)
let paperBrand2: Array<string>; // (optional) (default to undefined)
let contactSheetRef: string; // (optional) (default to undefined)
let negativeNumber: string; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintSessionsIdprintsGetCollection(
    id,
    page,
    session,
    session2,
    paperBrand,
    paperBrand2,
    contactSheetRef,
    negativeNumber,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | PrintSession identifier | defaults to undefined|
| **page** | [**number**] | The collection page number | (optional) defaults to 1|
| **session** | [**string**] |  | (optional) defaults to undefined|
| **session2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **paperBrand** | [**string**] |  | (optional) defaults to undefined|
| **paperBrand2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **contactSheetRef** | [**string**] |  | (optional) defaults to undefined|
| **negativeNumber** | [**string**] |  | (optional) defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ApiPrintSessionsIdprintsGetCollection200Response**

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
|**200** | Print collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintsGetCollection**
> ApiPrintSessionsIdprintsGetCollection200Response apiPrintsGetCollection()

Retrieves the collection of Print resources.

### Example

```typescript
import {
    PrintApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let session: string; // (optional) (default to undefined)
let session2: Array<string>; // (optional) (default to undefined)
let paperBrand: string; // (optional) (default to undefined)
let paperBrand2: Array<string>; // (optional) (default to undefined)
let contactSheetRef: string; // (optional) (default to undefined)
let negativeNumber: string; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintsGetCollection(
    page,
    session,
    session2,
    paperBrand,
    paperBrand2,
    contactSheetRef,
    negativeNumber,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | The collection page number | (optional) defaults to 1|
| **session** | [**string**] |  | (optional) defaults to undefined|
| **session2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **paperBrand** | [**string**] |  | (optional) defaults to undefined|
| **paperBrand2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **contactSheetRef** | [**string**] |  | (optional) defaults to undefined|
| **negativeNumber** | [**string**] |  | (optional) defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ApiPrintSessionsIdprintsGetCollection200Response**

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
|**200** | Print collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintsIdDelete**
> apiPrintsIdDelete()

Removes the Print resource.

### Example

```typescript
import {
    PrintApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintApi(configuration);

let id: string; //Print identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintsIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Print identifier | defaults to undefined|
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
|**204** | Print resource deleted |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintsIdGet**
> PrintJsonldReadPrintTimestampableBlameableRead apiPrintsIdGet()

Retrieves a Print resource.

### Example

```typescript
import {
    PrintApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintApi(configuration);

let id: string; //Print identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintsIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Print identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PrintJsonldReadPrintTimestampableBlameableRead**

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
|**200** | Print resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintsIdPatch**
> PrintJsonldReadPrintTimestampableBlameableRead apiPrintsIdPatch(printWritePrintJsonMergePatch)

Updates the Print resource.

### Example

```typescript
import {
    PrintApi,
    Configuration,
    PrintWritePrintJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintApi(configuration);

let id: string; //Print identifier (default to undefined)
let printWritePrintJsonMergePatch: PrintWritePrintJsonMergePatch; //The updated Print resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintsIdPatch(
    id,
    printWritePrintJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **printWritePrintJsonMergePatch** | **PrintWritePrintJsonMergePatch**| The updated Print resource | |
| **id** | [**string**] | Print identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PrintJsonldReadPrintTimestampableBlameableRead**

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
|**200** | Print resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPrintsPost**
> PrintJsonldReadPrintTimestampableBlameableRead apiPrintsPost(printWritePrint)

Creates a Print resource.

### Example

```typescript
import {
    PrintApi,
    Configuration,
    PrintWritePrint
} from './api';

const configuration = new Configuration();
const apiInstance = new PrintApi(configuration);

let printWritePrint: PrintWritePrint; //The new Print resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPrintsPost(
    printWritePrint,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **printWritePrint** | **PrintWritePrint**| The new Print resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PrintJsonldReadPrintTimestampableBlameableRead**

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
|**201** | Print resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

