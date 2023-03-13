// externals
import { useState } from 'react';
import { ChromePicker } from 'react-color';

// dnd-kit
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import { rectIntersection, } from '@dnd-kit/core';
import { arrayMove, } from '@dnd-kit/sortable';

// dnd-kit helpers
import { DraggableItem } from './components/draggable-item';
import { DropZone } from './components/drop-zone';

// pretty things
import { Row, Col, Item } from './components/grid-components';
import { ColorPallette } from './components/color-pallette';
import { Trash } from './components/trash';
import { ColorSquare } from './components/color';

// a little utility for producing unique 
const id_gen = (() => {
  let id = 0;
  return () => id++;
})()


export interface ItemType { id: UniqueIdentifier, color: string }

const App = () => {
  const [pickerColor, setPickerColor] = useState('#09C5D0');
  const [favoriteColor, setFavoriteColor] = useState('#ddd');

  const [pickerId, setPickerId] = useState<UniqueIdentifier>(id_gen);
  const [favoriteId, setFavoriteId] = useState<UniqueIdentifier>(id_gen);

  const [palletteItems, setPalletteItems] = useState<ItemType[]>(() => ["red", "green", "blue"].map((color) => ({ id: id_gen(), color })));

  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [activeItemOrigin, setActiveItemOrigin] = useState<string | null>(null)

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveItem(null);
      setActiveItemOrigin(null)
      return;
    }

    if (over.id === "trash") {
      if (palletteItems.find(item => item.id === active.id)) {
        setPalletteItems(palletteItems.filter(item => item.id !== active.id));
      }
    } else if (over.id === "current") {
      getItem(active.id)?.color && setPickerColor(getItem(active.id)?.color);
    } else if (over.id === "favorite") {
      getItem(active.id)?.color && setFavoriteColor(getItem(active.id)?.color);
    }
    setActiveItem(null);
    setActiveItemOrigin(null)
  };

  const getItem = (id: UniqueIdentifier) => {

    if (id === favoriteId) return { id: favoriteId, color: favoriteColor }
    if (id === pickerId) return { id: pickerId, color: pickerColor }
    return palletteItems.find(x => x.id === id)!;
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) {
      if (activeItemOrigin === null) return;
      const indx = palletteItems.findIndex(x => x.id === active.id);
      if (indx === -1) return
      setPalletteItems(palletteItems.filter(x => x.id !== active.id))
      if (activeItemOrigin === "current") setPickerId(active.id)
      if (activeItemOrigin === "favorite") setFavoriteId(active.id)
      return;
    }

    if ((over.id === "favorite" || over.id === "current") && activeItemOrigin !== null) {
      // we're not dragging over the pallette, so we may need to remove the item from the pallette
      const active_indx = palletteItems.findIndex(x => x.id === active.id);
      if (active_indx === -1) return;
      setPalletteItems(palletteItems.filter(x => x.id !== active.id))

      return

    }

    const active_indx = palletteItems.findIndex(x => x.id === active.id);
    const over_indx = palletteItems.findIndex(x => x.id === over.id);

    if ((active_indx !== -1) && (over_indx !== -1)) {
      if (active_indx === over_indx) return;
      setPalletteItems(arrayMove(palletteItems, active_indx, over_indx))
    }
    else if (over.id === "pallette") {
      if (palletteItems.findIndex(x => x.id === active.id) === -1) {
        if (active.id === favoriteId) {
          setPalletteItems([...palletteItems, { id: favoriteId, color: favoriteColor }]);
          setFavoriteId(id_gen);
        }
        else if (active.id === pickerId) {
          setPalletteItems([...palletteItems, { id: pickerId, color: pickerColor }]);
          setPickerId(id_gen);
        }
      }
    }
  }

  return (<div>
    <DndContext
      onDragStart={({ active }) => {
        if (active.id === favoriteId) setActiveItemOrigin("favorite")
        if (active.id === pickerId) setActiveItemOrigin("current")
        setActiveItem(getItem(active.id))
      }}
      onDragOver={onDragOver}
      onDragCancel={() => {
        setActiveItem(null)
        setActiveItemOrigin(null)
      }}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >

      <div>
        <ul>
          <li>Use the Color picker to choose a color</li>
          <li>Drag the picker or favorite color to the pallette to add it to the pallette</li>
          <li>Drag a color from the pallette to the picker, favorite, or trash </li>
          <li>The Chosen color, Favorite color, and Trash elements are implemented using the @dnd-kit/core</li>
          <li>The pallette is implemented using the @dnd-kit/sortable presets</li>
        </ul>
      </div>
      <Row>

        <Col >
          <ChromePicker onChange={(color: any) => setPickerColor(color.hex)} color={pickerColor} />
        </Col>

        <Col >
          <Item >
            <p>Chosen Color</p>
            <DropZone id="current">
              <DraggableItem color={pickerColor} id={pickerId} />
            </DropZone>
          </Item>
          <Item >
            <p>Favorite Color</p>
            <DropZone id="favorite">
              <DraggableItem color={favoriteColor} id={favoriteId} />
            </DropZone>
          </Item>

          <Item><Trash active={activeItemOrigin === null} /></Item>
        </Col>

        <Col >
          <p>Color Pallette</p>
          <ColorPallette items={palletteItems} />
        </Col>

      </Row>

      {/* The Drag Overlay is always rendered but the children are
      conditionally rendered based on the active item. */}
      <DragOverlay>
        {activeItem ? <ColorSquare color={activeItem.color} /> : null}
      </DragOverlay>
    </DndContext>
  </div >
  )
}

export default App;
