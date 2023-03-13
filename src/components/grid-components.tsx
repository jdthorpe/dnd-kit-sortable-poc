import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  `

export const Col = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #000;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`

