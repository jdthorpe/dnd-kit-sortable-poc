import { FC } from "react";
import styled from "styled-components";
import type { ItemType } from "../App";

import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from "@dnd-kit/core";

import { Item } from './grid-components';
import { SortableItem } from './sortable-item';

const List = styled.ul`
  min-width: 200px;
  padding: 20px 10px;
  border: 1px solid black;
  border-radius: 5px;
  list-style-type: none;
`

interface Props {
  items: ItemType[]
  width?: string;
}

export const ColorPallette: FC<Props> = ({ items, width }) => {

  const { setNodeRef } = useDroppable({ id: "pallette", })

  return <SortableContext
    items={items.map((item) => item.id)}
    strategy={rectSortingStrategy}>
    <List ref={setNodeRef}>
      {items.map(({ id, color }) => <Item key={id}>
        <SortableItem color={color} id={id} />
      </Item>)}
    </List>
  </SortableContext>
}