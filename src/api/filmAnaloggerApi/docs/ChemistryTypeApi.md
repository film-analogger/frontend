# ChemistryTypeApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiChemistryTypesGetCollection**](#apichemistrytypesgetcollection) | **GET** /chemistry_types | Retrieves the collection of ChemistryType resources.|
|[**apiChemistryTypesIdDelete**](#apichemistrytypesiddelete) | **DELETE** /chemistry_types/{id} | Removes the ChemistryType resource.|
|[**apiChemistryTypesIdGet**](#apichemistrytypesidget) | **GET** /chemistry_types/{id} | Retrieves a ChemistryType resource.|
|[**apiChemistryTypesIdPatch**](#apichemistrytypesidpatch) | **PATCH** /chemistry_types/{id} | Updates the ChemistryType resource.|
|[**apiChemistryTypesPost**](#apichemistrytypespost) | **POST** /chemistry_types | Creates a ChemistryType resource.|

# **apiChemistryTypesGetCollection**
> ApiChemistryTypesGetCollection200Response apiChemistryTypesGetCollection()

Retrieves the collection of ChemistryType resources.

### Example

```typescript
import {
    ChemistryTypeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChemistryTypeApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiChemistryTypesGetCollection(
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

**ApiChemistryTypesGetCollection200Response**

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
|**200** | ChemistryType collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiChemistryTypesIdDelete**
> apiChemistryTypesIdDelete()

Removes the ChemistryType resource.

### Example

```typescript
import {
    ChemistryTypeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChemistryTypeApi(configuration);

let id: string; //ChemistryType identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiChemistryTypesIdDelete(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ChemistryType identifier | defaults to undefined|
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
|**204** | ChemistryType resource deleted |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiChemistryTypesIdGet**
> ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead apiChemistryTypesIdGet()

Retrieves a ChemistryType resource.

### Example

```typescript
import {
    ChemistryTypeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChemistryTypeApi(configuration);

let id: string; //ChemistryType identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiChemistryTypesIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ChemistryType identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead**

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
|**200** | ChemistryType resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiChemistryTypesIdPatch**
> ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead apiChemistryTypesIdPatch(chemistryTypeWriteChemistryTypeJsonMergePatch)

Updates the ChemistryType resource.

### Example

```typescript
import {
    ChemistryTypeApi,
    Configuration,
    ChemistryTypeWriteChemistryTypeJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new ChemistryTypeApi(configuration);

let id: string; //ChemistryType identifier (default to undefined)
let chemistryTypeWriteChemistryTypeJsonMergePatch: ChemistryTypeWriteChemistryTypeJsonMergePatch; //The updated ChemistryType resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiChemistryTypesIdPatch(
    id,
    chemistryTypeWriteChemistryTypeJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **chemistryTypeWriteChemistryTypeJsonMergePatch** | **ChemistryTypeWriteChemistryTypeJsonMergePatch**| The updated ChemistryType resource | |
| **id** | [**string**] | ChemistryType identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead**

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
|**200** | ChemistryType resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiChemistryTypesPost**
> ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead apiChemistryTypesPost(chemistryTypeWriteChemistryType)

Creates a ChemistryType resource.

### Example

```typescript
import {
    ChemistryTypeApi,
    Configuration,
    ChemistryTypeWriteChemistryType
} from './api';

const configuration = new Configuration();
const apiInstance = new ChemistryTypeApi(configuration);

let chemistryTypeWriteChemistryType: ChemistryTypeWriteChemistryType; //The new ChemistryType resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiChemistryTypesPost(
    chemistryTypeWriteChemistryType,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **chemistryTypeWriteChemistryType** | **ChemistryTypeWriteChemistryType**| The new ChemistryType resource | |
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**ChemistryTypeJsonldReadChemistryTypeTranslatableReadTimestampableBlameableRead**

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
|**201** | ChemistryType resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

