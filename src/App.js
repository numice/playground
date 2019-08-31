import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Grid, Image } from 'semantic-ui-react'
import EmployeeList from './EmployeeList'
import LeftMenu from './LeftMenu'
import styled from 'styled-components';
import MainWrapper from './MainWrapper'
import Navbar from './Navbar'
import MainContent from './pages/MainContent'
import Campaigns from './pages/Campaigns'

const LeftMenuDiv = styled.div`
  position: fixed;
  top: 100px;
  left: 0px;
  /* width: 250px; */
`;

class App extends Component {


  state = {
    currentPage: Campaigns
  }

  changePage = (activePage) => {
    this.setState({currentPage: activePage})
  }

  render() {
    let currentPage = this.state.currentPage
    return(
      <>
        <Navbar />
        <LeftMenuDiv>
          <LeftMenu chagePageCallback={this.changePage}/>
        </LeftMenuDiv>

        <MainContent page={this.state.currentPage}>
          {/* <Grid>
            <Grid.Column width={4} color='red'>
              <h1>{currentPage}</h1>
            </Grid.Column>
            <Grid.Column width={9} color='black'>
            </Grid.Column>
            <Grid.Column width={3} color='green'>
            </Grid.Column>
          </Grid> */}
        </MainContent>
      </>
    )
  };
}


export default App;

{/* <Sidebar />
      <Container>
        <section id="header">
          Employee
        </section>
        <section id="main">
          <EmployeeList />
        </section> 
      </Container> */}