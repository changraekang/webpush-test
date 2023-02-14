import styled from "styled-components";
import {
    grey1,
    grey5,
    primary4,
  } from "../../constants/color"; 

const EmailList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${grey1};
  font-size: 14px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  border: 1px solid ${grey5};
  text-align: center;
  z-index: 5;

  `;

const EmailOptions = styled.li`
  border-bottom: ${(props) => (props.last ? "none" : `1px solid ${grey5}`)};
  
  &:hover {
    background: #EEE6F7;
  }
`;

const ItemBtn = styled.button`
  width: 100%;
  padding: 12px 0;

  &:hover {
    color: ${primary4};
    font-weight : 700;
  }
`


export function EmailDropbox ({ arrList, handleClick, width, ver, hor, last }) {
  return (
    <EmailList style={{"width": `${width}`, top: `${ver}`, right: `${hor}`}}>
        {arrList.map((item, index) => (
        <EmailOptions key={index}>
          <ItemBtn onClick={handleClick} value={item}>
          {item}
          </ItemBtn>
        </EmailOptions>
        ))}
        <EmailOptions last>
          { last }
        </EmailOptions>
    </EmailList>
)
}

export  function CategoryDropbox ({ arrList, handleClick, width, ver, hor, last }) {
  return (
    <EmailList style={{"width": `${width}`, top: `${ver}`, left: `${hor}`}}>
        {arrList.map(({name, code}) => (
        <EmailOptions key={code}>
          <ItemBtn id={code} onClick={handleClick} value={name}>
          {name}
          </ItemBtn>
        </EmailOptions>
        ))}
        <EmailOptions last>
          { last }
        </EmailOptions>
    </EmailList>
)
}



