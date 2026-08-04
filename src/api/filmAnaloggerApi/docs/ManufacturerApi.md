# ManufacturerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiManufacturersGetCollection**](#apimanufacturersgetcollection) | **GET** /manufacturers | Retrieves the collection of Manufacturer resources.|
|[**apiManufacturersIdDelete**](#apimanufacturersiddelete) | **DELETE** /manufacturers/{id} | Removes the Manufacturer resource.|
|[**apiManufacturersIdGet**](#apimanufacturersidget) | **GET** /manufacturers/{id} | Retrieves a Manufacturer resource.|
|[**apiManufacturersIdPatch**](#apimanufacturersidpatch) | **PATCH** /manufacturers/{id} | Updates the Manufacturer resource.|
|[**apiManufacturersPost**](#apimanufacturerspost) | **POST** /manufacturers | Creates a Manufacturer resource.|

# **apiManufacturersGetCollection**
> ApiManufacturersGetCollection200Response apiManufacturersGetCollection()

Retrieves the collection of Manufacturer resources.

### Example

```typescript
import {
    ManufacturerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ManufacturerApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let status: string; // (optional) (default to undefined)
let status2: Array<string>; // (optional) (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiManufacturersGetCollection(
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

**ApiManufacturersGetCollection200Response**

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
|**200** | Manufacturer collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiManufacturersIdDelete**
> apiManufacturersIdDelete()

Removes the Manufacturer resource.

### Example

```typescript
import {
    ManufacturerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ManufacturerApi(configuration);

let id: string; //Manufacturer identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiManufacturersIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Manufacturer identifier | defaults to undefined|
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
|**204** | Manufacturer resource deleted |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiManufacturersIdGet**
> ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead apiManufacturersIdGet()

Retrieves a Manufacturer resource.

### Example

```typescript
import {
    ManufacturerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ManufacturerApi(configuration);

let id: string; //Manufacturer identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiManufacturersIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Manufacturer identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead**

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
|**200** | Manufacturer resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiManufacturersIdPatch**
> ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead apiManufacturersIdPatch(manufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch)

Updates the Manufacturer resource.

### Example

```typescript
import {
    ManufacturerApi,
    Configuration,
    ManufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new ManufacturerApi(configuration);

let id: string; //Manufacturer identifier (default to undefined)
let manufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch: ManufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch; //The updated Manufacturer resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiManufacturersIdPatch(
    id,
    manufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **manufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch** | **ManufacturerWriteManufacturerCatalogStatusWriteJsonMergePatch**| The updated Manufacturer resource | |
| **id** | [**string**] | Manufacturer identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead**

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
|**200** | Manufacturer resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiManufacturersPost**
> ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead apiManufacturersPost(manufacturerWriteManufacturerCatalogStatusWrite)

Creates a Manufacturer resource.

### Example

```typescript
import {
    ManufacturerApi,
    Configuration,
    ManufacturerWriteManufacturerCatalogStatusWrite
} from './api';

const configuration = new Configuration();
const apiInstance = new ManufacturerApi(configuration);

let manufacturerWriteManufacturerCatalogStatusWrite: ManufacturerWriteManufacturerCatalogStatusWrite; //The new Manufacturer resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiManufacturersPost(
    manufacturerWriteManufacturerCatalogStatusWrite,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **manufacturerWriteManufacturerCatalogStatusWrite** | **ManufacturerWriteManufacturerCatalogStatusWrite**| The new Manufacturer resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead**

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
|**201** | Manufacturer resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

