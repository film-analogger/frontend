# FilmApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiFilmsGetCollection**](#apifilmsgetcollection) | **GET** /films | Retrieves the collection of Film resources.|
|[**apiFilmsIdDelete**](#apifilmsiddelete) | **DELETE** /films/{id} | Removes the Film resource.|
|[**apiFilmsIdGet**](#apifilmsidget) | **GET** /films/{id} | Retrieves a Film resource.|
|[**apiFilmsIdPatch**](#apifilmsidpatch) | **PATCH** /films/{id} | Updates the Film resource.|
|[**apiFilmsPost**](#apifilmspost) | **POST** /films | Creates a Film resource.|

# **apiFilmsGetCollection**
> ApiFilmsGetCollection200Response apiFilmsGetCollection()

Retrieves the collection of Film resources.

### Example

```typescript
import {
    FilmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FilmApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let status: string; // (optional) (default to undefined)
let status2: Array<string>; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiFilmsGetCollection(
    page,
    status,
    status2,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | The collection page number | (optional) defaults to 1|
| **status** | [**string**] |  | (optional) defaults to undefined|
| **status2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ApiFilmsGetCollection200Response**

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
|**200** | Film collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiFilmsIdDelete**
> apiFilmsIdDelete()

Removes the Film resource.

### Example

```typescript
import {
    FilmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FilmApi(configuration);

let id: string; //Film identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiFilmsIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Film identifier | defaults to undefined|
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
|**204** | Film resource deleted |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiFilmsIdGet**
> FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead apiFilmsIdGet()

Retrieves a Film resource.

### Example

```typescript
import {
    FilmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FilmApi(configuration);

let id: string; //Film identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiFilmsIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Film identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead**

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
|**200** | Film resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiFilmsIdPatch**
> FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead apiFilmsIdPatch(filmWriteFilmCatalogStatusWriteJsonMergePatch)

Updates the Film resource.

### Example

```typescript
import {
    FilmApi,
    Configuration,
    FilmWriteFilmCatalogStatusWriteJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new FilmApi(configuration);

let id: string; //Film identifier (default to undefined)
let filmWriteFilmCatalogStatusWriteJsonMergePatch: FilmWriteFilmCatalogStatusWriteJsonMergePatch; //The updated Film resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiFilmsIdPatch(
    id,
    filmWriteFilmCatalogStatusWriteJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filmWriteFilmCatalogStatusWriteJsonMergePatch** | **FilmWriteFilmCatalogStatusWriteJsonMergePatch**| The updated Film resource | |
| **id** | [**string**] | Film identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead**

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
|**200** | Film resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiFilmsPost**
> FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead apiFilmsPost(filmWriteFilmCatalogStatusWrite)

Creates a Film resource.

### Example

```typescript
import {
    FilmApi,
    Configuration,
    FilmWriteFilmCatalogStatusWrite
} from './api';

const configuration = new Configuration();
const apiInstance = new FilmApi(configuration);

let filmWriteFilmCatalogStatusWrite: FilmWriteFilmCatalogStatusWrite; //The new Film resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiFilmsPost(
    filmWriteFilmCatalogStatusWrite,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filmWriteFilmCatalogStatusWrite** | **FilmWriteFilmCatalogStatusWrite**| The new Film resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**FilmJsonldReadFilmTranslatableReadTimestampableBlameableReadCatalogStatusRead**

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
|**201** | Film resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

