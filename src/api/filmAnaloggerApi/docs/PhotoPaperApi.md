# PhotoPaperApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPhotoPapersGetCollection**](#apiphotopapersgetcollection) | **GET** /photo_papers | Retrieves the collection of PhotoPaper resources.|
|[**apiPhotoPapersIdDelete**](#apiphotopapersiddelete) | **DELETE** /photo_papers/{id} | Removes the PhotoPaper resource.|
|[**apiPhotoPapersIdGet**](#apiphotopapersidget) | **GET** /photo_papers/{id} | Retrieves a PhotoPaper resource.|
|[**apiPhotoPapersIdPatch**](#apiphotopapersidpatch) | **PATCH** /photo_papers/{id} | Updates the PhotoPaper resource.|
|[**apiPhotoPapersPost**](#apiphotopaperspost) | **POST** /photo_papers | Creates a PhotoPaper resource.|

# **apiPhotoPapersGetCollection**
> ApiPhotoPapersGetCollection200Response apiPhotoPapersGetCollection()

Retrieves the collection of PhotoPaper resources.

### Example

```typescript
import {
    PhotoPaperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoPaperApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let status: string; // (optional) (default to undefined)
let status2: Array<string>; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPhotoPapersGetCollection(
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

**ApiPhotoPapersGetCollection200Response**

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
|**200** | PhotoPaper collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPhotoPapersIdDelete**
> apiPhotoPapersIdDelete()

Removes the PhotoPaper resource.

### Example

```typescript
import {
    PhotoPaperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoPaperApi(configuration);

let id: string; //PhotoPaper identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPhotoPapersIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | PhotoPaper identifier | defaults to undefined|
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
|**204** | PhotoPaper resource deleted |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPhotoPapersIdGet**
> PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead apiPhotoPapersIdGet()

Retrieves a PhotoPaper resource.

### Example

```typescript
import {
    PhotoPaperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoPaperApi(configuration);

let id: string; //PhotoPaper identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPhotoPapersIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | PhotoPaper identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead**

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
|**200** | PhotoPaper resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPhotoPapersIdPatch**
> PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead apiPhotoPapersIdPatch(photoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch)

Updates the PhotoPaper resource.

### Example

```typescript
import {
    PhotoPaperApi,
    Configuration,
    PhotoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoPaperApi(configuration);

let id: string; //PhotoPaper identifier (default to undefined)
let photoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch: PhotoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch; //The updated PhotoPaper resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPhotoPapersIdPatch(
    id,
    photoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **photoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch** | **PhotoPaperWritePhotoPaperCatalogStatusWriteJsonMergePatch**| The updated PhotoPaper resource | |
| **id** | [**string**] | PhotoPaper identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead**

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
|**200** | PhotoPaper resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPhotoPapersPost**
> PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead apiPhotoPapersPost(photoPaperWritePhotoPaperCatalogStatusWrite)

Creates a PhotoPaper resource.

### Example

```typescript
import {
    PhotoPaperApi,
    Configuration,
    PhotoPaperWritePhotoPaperCatalogStatusWrite
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoPaperApi(configuration);

let photoPaperWritePhotoPaperCatalogStatusWrite: PhotoPaperWritePhotoPaperCatalogStatusWrite; //The new PhotoPaper resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiPhotoPapersPost(
    photoPaperWritePhotoPaperCatalogStatusWrite,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **photoPaperWritePhotoPaperCatalogStatusWrite** | **PhotoPaperWritePhotoPaperCatalogStatusWrite**| The new PhotoPaper resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**PhotoPaperJsonldReadPhotoPaperTranslatableReadTimestampableBlameableReadCatalogStatusRead**

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
|**201** | PhotoPaper resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

