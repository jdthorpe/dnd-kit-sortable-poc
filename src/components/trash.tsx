import { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";

const Box = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${props => props.color};
`;


export const Trash: FC<{ active: boolean }> = ({ active }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
  });

  return (
    <Box
      ref={setNodeRef}
      color={(isOver && active) ? "red" : "grey"}
    > Trash</Box >
  );
};

