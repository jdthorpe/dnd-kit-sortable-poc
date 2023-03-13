# POC with Dragging Items into and out of a Sortable List

## Things I learned

- If you don't get the item names right or have inconsistent item names
  between drag states then nothing works right.
- You need a `<DragOverLay>` component in most cases (b/c the CSS doesn't
  work or look right most of the time)
- You don's need the `useDraggable` css transforms if you use a drag overlay
  (and they are _ugly_ compared to using the `DragOverlay` component)
- The `useSortable` css transforms _are_ useful even when using a drag
  overlay because they implement the sorting CSS animations
- dragOver events need to be idempotent (since they are fired repeatedly)
- you _should not_ duplicate actions between `onDragEnd` and `onDragOver`
- you _should_ handle intermediate transformations (like re-arranging lists)
  in `onDragOver`.
- `onDragOver` is called when the 'over' state changes, so it can be used to
  detect drag-out events too (i.e. `if(!over){/* Nothing is being dragged over */}`)

## Start UP

Install the deps and start the dev server in the usual way:

```sh
yarn
yarn start
```
