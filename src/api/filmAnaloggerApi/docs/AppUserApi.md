# AppUserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAppUsersGetCollection**](#apiappusersgetcollection) | **GET** /app_users | Retrieves the collection of AppUser resources.|
|[**apiAppUsersIdGet**](#apiappusersidget) | **GET** /app_users/{id} | Retrieves a AppUser resource.|
|[**apiAppUsersIdPatch**](#apiappusersidpatch) | **PATCH** /app_users/{id} | Updates the AppUser resource.|
|[**uploadAvatar**](#uploadavatar) | **POST** /app_users/{id}/avatar | Upload user avatar|

# **apiAppUsersGetCollection**
> ApiAppUsersGetCollection200Response apiAppUsersGetCollection()

Retrieves the collection of AppUser resources.

### Example

```typescript
import {
    AppUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AppUserApi(configuration);

let page: number; //The collection page number (optional) (default to 1)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiAppUsersGetCollection(
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

**ApiAppUsersGetCollection200Response**

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
|**200** | AppUser collection |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAppUsersIdGet**
> AppUserJsonldReadAppUserTimestampableBlameableRead apiAppUsersIdGet()

Retrieves a AppUser resource.

### Example

```typescript
import {
    AppUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AppUserApi(configuration);

let id: string; //AppUser identifier (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiAppUsersIdGet(
    id,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | AppUser identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**AppUserJsonldReadAppUserTimestampableBlameableRead**

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
|**200** | AppUser resource |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAppUsersIdPatch**
> AppUserJsonldReadAppUserTimestampableBlameableRead apiAppUsersIdPatch(appUserWriteAppUserJsonMergePatch)

Updates the AppUser resource.

### Example

```typescript
import {
    AppUserApi,
    Configuration,
    AppUserWriteAppUserJsonMergePatch
} from './api';

const configuration = new Configuration();
const apiInstance = new AppUserApi(configuration);

let id: string; //AppUser identifier (default to undefined)
let appUserWriteAppUserJsonMergePatch: AppUserWriteAppUserJsonMergePatch; //The updated AppUser resource
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.apiAppUsersIdPatch(
    id,
    appUserWriteAppUserJsonMergePatch,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appUserWriteAppUserJsonMergePatch** | **AppUserWriteAppUserJsonMergePatch**| The updated AppUser resource | |
| **id** | [**string**] | AppUser identifier | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**AppUserJsonldReadAppUserTimestampableBlameableRead**

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
|**200** | AppUser resource updated |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadAvatar**
> AppUserJsonldReadAppUserTimestampableBlameableRead uploadAvatar()

Upload or replace the avatar image for a user.

### Example

```typescript
import {
    AppUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AppUserApi(configuration);

let id: string; //AppUser identifier (default to undefined)
let avatarFile: File; //The avatar image file (default to undefined)
let xLOCALE: string; //Locale (e.g. \"en\", \"fr\") (optional) (default to undefined)
let acceptLanguage: string; //Accept-Language (e.g. \"en\", \"fr\", \"en-US,en;q=0.9,fr;q=0.8\") - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used (optional) (default to undefined)

const { status, data } = await apiInstance.uploadAvatar(
    id,
    avatarFile,
    xLOCALE,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | AppUser identifier | defaults to undefined|
| **avatarFile** | [**File**] | The avatar image file | defaults to undefined|
| **xLOCALE** | [**string**] | Locale (e.g. \&quot;en\&quot;, \&quot;fr\&quot;) | (optional) defaults to undefined|
| **acceptLanguage** | [**string**] | Accept-Language (e.g. \&quot;en\&quot;, \&quot;fr\&quot;, \&quot;en-US,en;q&#x3D;0.9,fr;q&#x3D;0.8\&quot;) - used as a fallback if X-LOCALE is not set, the first language in the list that matches an available locale will be used | (optional) defaults to undefined|


### Return type

**AppUserJsonldReadAppUserTimestampableBlameableRead**

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json, application/ld+json, multipart/form-data, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**201** | AppUser resource created |  -  |
|**400** | Invalid input |  -  |
|**422** | An error occurred |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

