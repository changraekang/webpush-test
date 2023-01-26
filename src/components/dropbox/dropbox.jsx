import styled from "styled-components";
import {
    grey1,
    grey5,
  } from "../../constants/color"; 

const EmailList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 42px;
  background-color: ${grey1};
  font-size: 14px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  border: 1px solid ${grey5};
  text-align: center;
  z-index: 5;
`;

const EmailOptions = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid ${grey5};
  border-bottom: ${(props) => (props.last ? "none" : `1px solid ${grey5}`)};
`;

export default function Dropbox ({ arrList, handleClick, width, last }) {
  return (
  <EmailList style={{"width": `${width}`}}>
      {arrList.map((item, index) => (
      <EmailOptions key={index}>
        <button onClick={handleClick} value={item}>
        {item}
        </button>
      </EmailOptions>
      ))}
      <EmailOptions last>
      {/* <button value="write" onClick={handleClick}>
        직접입력
      </button> */}
      {last}
      </EmailOptions>
  </EmailList>
)
}


