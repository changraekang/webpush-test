import React from 'react';
import styled from "styled-components";
import { ACTIVE_BUTTON_COLOR } from '../constants/color';
    
  
const TestButton = styled.button`
display: flex;
width: 155px;
justify-content: center;
align-items: center;
color: white;
font-size: 1.875rem;
background-color: ${ACTIVE_BUTTON_COLOR};
cursor: pointer;
-webkit-box-align: center;
-webkit-box-pack: center;
border-radius: 8px;
border: none;
`;
const Test = () => {
    return (
        <div>
          <h1>TEST</h1>
          <TestButton>test</TestButton> 
        </div>
    );
};

export default Test;

