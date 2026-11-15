# Upgrading to 8.0

8.0 supports Angular 21 and 22. Inputs, outputs and the `shark-table` selector are unchanged, so most applications only need to update the package.

## Requirements

- Angular 21 or 22
- RxJS 7.4 or later
- `zone.js` is no longer required. The table works in zoneless applications and in applications that use zone.js.

## Standalone components

`SharkTableComponent` is standalone. Import it where you use it:

```typescript
@Component({
  imports: [SharkTableComponent],
  // ...
})
```

`SharkTableModule` still exists, so NgModule applications keep working without changes.

Custom cell and child row components no longer need to be listed in `entryComponents` or `declarations`.

## Behavior changes

These are bug fixes, but you may notice them:

- **Your data array is no longer modified.** Earlier versions sorted the array you passed in, in place. If you relied on that, sort your own copy.
- **Sorting `NONE` restores the original order** instead of keeping the previous sort.
- **Empty values sort last**, and numeric strings sort numerically.
- **`localFilter: false` is respected** when column filters are set.
- **Paging stays in range.** Changing the page size or filter while on a late page moves to the last valid page instead of showing an empty page.
- **Arrays emitted by an Observable are paged, filtered and sorted locally**, like plain arrays.
- **`initialSort` is applied once**, when data first arrives, instead of on every data change.
- **`exportCurrentData()`** returns all filtered rows in the current sort order, not just the unsorted source data.
- **The default `tableId`** is a short counter (`st1`, `st2`, ...) instead of a random value. Set `tableId` if you depend on specific element ids.
- **Row links** open in a new tab on middle click and Ctrl/Cmd click, and clicks on buttons inside a row no longer navigate.
- `RowStyleFunction` and `CellStyleFunction` are now type aliases. Existing functions keep working.
