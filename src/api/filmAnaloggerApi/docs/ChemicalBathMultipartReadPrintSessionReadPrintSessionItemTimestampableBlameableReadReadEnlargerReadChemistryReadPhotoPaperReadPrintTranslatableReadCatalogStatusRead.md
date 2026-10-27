# ChemicalBathMultipartReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**chemistry** | [**ChemistryMultipartReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead**](ChemistryMultipartReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead.md) |  | [default to undefined]
**dilutionOverride** | **string** |  | [optional] [default to undefined]
**durationSeconds** | **number** |  | [optional] [default to undefined]
**effectiveDilution** | **string** | The dilution actually used for this bath: the explicit override if set, otherwise the catalogued Chemistry\&#39;s official dilution (falling back to its first dilution if none is flagged official). | [optional] [readonly] [default to undefined]

## Example

```typescript
import { ChemicalBathMultipartReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead } from './api';

const instance: ChemicalBathMultipartReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead = {
    chemistry,
    dilutionOverride,
    durationSeconds,
    effectiveDilution,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
