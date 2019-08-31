import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components';


const StyledMenu = styled(Menu)`
  &&& {
    background-color: red;
    color: red;
  }
  
`

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <StyledMenu>
        <StyledMenu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <StyledMenu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <StyledMenu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
      </StyledMenu>
    )
  }
}