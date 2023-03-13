import { FC } from 'react';
import { ColorSquare } from './color';
import { useDraggable } from '@dnd-kit/core';

interface Props {
  id: string | number;
  color: string;
}

export const DraggableItem: FC<Props> = ({ id, color }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
  } = useDraggable({
    id,
  });

  const style = {
    color: 'white',
    border: '1px dashed black',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ColorSquare color={color}>{id}</ColorSquare>
    </li>
  );
}
