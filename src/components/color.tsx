import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { useDraggable, useDroppable, UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const ColorSquare = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 50px;
  height: 50px;
  color: white;
  background-color: ${props => props.color};
`

// interface Props {
//   id: string | number;
//   color: string;
// }

// export const DropZone: FC<{ children: ReactNode, id: UniqueIdentifier }> = ({ children, id }) => {
//   const { setNodeRef, isOver } = useDroppable({ id })

//   const style = {
//     listStyleType: 'none',
//     border: '1px solid red',
//     backgroundColor: isOver ? 'grey' : 'inherit',
//   };

//   return (
//     <li ref={setNodeRef} style={style}>
//       {children}
//     </li>
//   );
// }


// export const DraggableItem: FC<Props> = ({ id, color }) => {

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//   } = useDraggable({
//     id,
//   });

//   const style = {
//     color: 'white',
//     border: '1px dashed black',
//   };

//   return (
//     <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <ColorSquare color={color}>{id}</ColorSquare>
//     </li>
//   );
// }


// export const SortableItem: FC<Props> = ({ id, color }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     border: '1px dashed red',
//     opacity: isDragging ? 0.5 : 1,
//   };

//   return (
//     <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <ColorSquare color={color} >{id}</ColorSquare>
//     </li>
//   );
// }
