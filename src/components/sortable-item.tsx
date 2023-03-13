import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColorSquare } from './color';

interface Props {
  id: string | number;
  color: string;
}

export const SortableItem: FC<Props> = ({ id, color }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px dashed red',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ColorSquare color={color} >{id}</ColorSquare>
    </li>
  );
}
