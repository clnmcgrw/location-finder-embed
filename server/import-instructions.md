# Migrating an xls/csv of location info to a HubDB table

### Simple Migrate

- import as-is, requires no conversion (ie, setting up a location field type based on lat/long strings)
- through the ui, or Hubspot's api endpoint for csv import

### Complex Migrate (*)

- transform existing data to fit hubdb field types - ie string lat/lngs to a location field
- custom scripting