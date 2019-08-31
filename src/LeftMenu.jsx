import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'
import Campaigns from './pages/Campaigns'

export default class LeftMenu extends Component {
  state = { activeItem: null }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.chagePageCallback(name)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name='Dashboard' active={activeItem === 'Dashboard'} onClick={this.handleItemClick}>
          <Label color='teal'>1</Label>
          Dashboard
        </Menu.Item>

        <Menu.Item name={Campaigns} active={activeItem === 'Campaigns'} onClick={this.handleItemClick}>
          <Label>51</Label>
          Campaigns
        </Menu.Item>

        <Menu.Item name='Updates' active={activeItem === 'Updates'} onClick={this.handleItemClick}>
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
      </Menu>
    )
  }
}