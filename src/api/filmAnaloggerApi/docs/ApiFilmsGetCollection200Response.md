# ApiFilmsGetCollection200Response

Film.jsonld-read-film_translatable-read_timestampable-blameable-read collection.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**hydra_totalItems** | **number** |  | [optional] [default to undefined]
**hydra_search** | [**HydraCollectionBaseSchemaNoPaginationHydraSearch**](HydraCollectionBaseSchemaNoPaginationHydraSearch.md) |  | [optional] [default to undefined]
**hydra_view** | [**HydraCollectionBaseSchemaAllOfHydraView**](HydraCollectionBaseSchemaAllOfHydraView.md) |  | [optional] [default to undefined]
**hydra_member** | [**Array&lt;FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead&gt;**](FilmJsonldReadFilmTranslatableReadTimestampableBlameableRead.md) |  | [default to undefined]

## Example

```typescript
import { ApiFilmsGetCollection200Response } from './api';

const instance: ApiFilmsGetCollection200Response = {
    hydra_totalItems,
    hydra_search,
    hydra_view,
    hydra_member,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
