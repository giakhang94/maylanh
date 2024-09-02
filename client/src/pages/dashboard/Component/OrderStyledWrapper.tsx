import styled from "styled-components";

const Wrapper = styled.div<{ $color?: string }>`
  background-color: ${(props) => (props.color ? props.color : "#E0F2FE")};
  border-radius: 5px;
`;

export default Wrapper;
