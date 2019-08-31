import React from 'react'
import Campaigns from './Campaigns'
import styled from 'styled-components';


function MainContent(props) {
  
  const PageContainer = styled.div`
  background-color: yellow;
  margin-left: 250px;
`;

  const PageName = props.page;

  return (
    <PageContainer>
      <h1>{props.page}</h1>
      <PageName />
      {/* <Campaigns /> */}
    </PageContainer> 
    
  ) 
}


export default MainContent