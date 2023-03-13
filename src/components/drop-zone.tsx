import { FC, ReactNode } from 'react';
import { useDroppable, UniqueIdentifier } from '@dnd-kit/core';

export const DropZone: FC<{ children: ReactNode, id: UniqueIdentifier }> = ({ children, id }) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  const style = {
    listStyleType: 'none',
    border: '1px solid red',
    backgroundColor: isOver ? 'grey' : 'inherit',
  };

  return (
    <li ref={setNodeRef} style={style}>
      {children}
    </li>
  );
}