# CameraApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCamerasGetCollection**](#apicamerasgetcollection) | **GET** /cameras | Retrieves the collection of Camera resources.|
|[**apiCamerasIdDelete**](#apicamerasiddelete) | **DELETE** /cameras/{id} | Removes the Camera resource.|
|[**apiCamerasIdGet**](#apicamerasidget) | **GET** /cameras/{id} | Retrieves a Camera resource.|
|[**apiCamerasIdPatch**](#apicamerasidpatch) | **PATCH** /cameras/{id} | Updates the Camera resource.|
|[**apiCamerasPost**](#apicameraspost) | **POST** /cameras | Creates a Camera resource.|

# **apiCamerasGetCollection**
> ApiCamerasGetCollection200Response apiCamerasGetCollection()

Retrieves the collection of Camera resources.

### Example

```typescript
import {
    CameraApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CameraApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let status: string; // (optional) (default to undefined)
let status2: Array<string>; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiCamerasGetCollection(
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

**ApiCamerasGetCollection200Response**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Camera collection |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCamerasIdDelete**
> apiCamerasIdDelete()

Removes the Camera resource.

### Example

```typescript
import {
    CameraApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CameraApi(configuration);

let id: string; //Camera identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiCamerasIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Camera identifier | defaults to undefined|
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
|**204** | Camera resource deleted |  -  |
|**403** | Forbidden |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCamerasIdGet**
> CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead apiCamerasIdGet()

Retrieves a Camera resource.

### Example

```typescript
import {
    CameraApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CameraApi(configuration);

let id: string; //Camera identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiCamerasIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Camera identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Camera resource |  -  |
|**403** | Forbidden |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCamerasIdPatch**
> CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead apiCamerasIdPatch(cameraWriteCameraCatalogStatusWriteJsonMergePatch)

Updates the Camera resource.

### Example

```typescript
import {
    CameraApi,
    Configuration,
    CameraWriteCameraCatalogStatusWriteJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new CameraApi(configuration);

let id: string; //Camera identifier (default to undefined)
let cameraWriteCameraCatalogStatusWriteJsonMergePatch: CameraWriteCameraCatalogStatusWriteJsonMergePatch; //The updated Camera resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiCamerasIdPatch(
    id,
    cameraWriteCameraCatalogStatusWriteJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cameraWriteCameraCatalogStatusWriteJsonMergePatch** | **CameraWriteCameraCatalogStatusWriteJsonMergePatch**| The updated Camera resource | |
| **id** | [**string**] | Camera identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: application/merge-patch+json
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Camera resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**403** | Forbidden |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCamerasPost**
> CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead apiCamerasPost(cameraWriteCameraCatalogStatusWrite)

Creates a Camera resource.

### Example

```typescript
import {
    CameraApi,
    Configuration,
    CameraWriteCameraCatalogStatusWrite
} from './api';

const configuration = new Configuration();
const apiInstance = new CameraApi(configuration);

let cameraWriteCameraCatalogStatusWrite: CameraWriteCameraCatalogStatusWrite; //The new Camera resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiCamerasPost(
    cameraWriteCameraCatalogStatusWrite,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cameraWriteCameraCatalogStatusWrite** | **CameraWriteCameraCatalogStatusWrite**| The new Camera resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**CameraJsonldReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: application/ld+json, application/json, multipart/form-data
 - **Accept**: application/ld+json, application/json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Camera resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

