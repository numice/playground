import React, { Component } from 'react'
import { Segment, Header, Modal, Button, Image, Form, Checkbox } from 'semantic-ui-react'



class NameForm extends Component {
  
  state = {
    first_name: '',
    last_name: '',
    open: false
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { first_name, last_name } = this.state;
    console.log(this.state)
    // this.setState(
    //   {
    //     submitted_first_name: first_name, 
    //     submitted_last_name: last_name
    //   });

    console.log(this.state);
    const campaign = [ first_name, last_name ];
    console.log(campaign)
    this.props.addCampaignCallback(campaign)
    this.close()
  };

  close = () =>  this.setState({ 
    open: false,
    first_name: '',
    last_name: ''
  });

  render() {
    const { first_name, last_name, submitted_first_name, submitted_last_name } = this.state;
    const { open, closeOnEscape, closeOnDimmerClick } = this.state


    return (
      <div>
        <Button onClick={this.closeConfigShow(false, true)}>
          Show Modal
        </Button>
        <Modal 

          // onClose={this.close} 
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
        >
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Default Profile Image</Header>
            </Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    placeholder='First Name'
                    name='first_name'
                    value={first_name}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    placeholder='Last Name'
                    name='last_name'
                    value={last_name}
                    onChange={this.handleChange}
                  />
                  <Form.Button type='submit' content='Submit' />
                  <Button onClick={this.close}>Cancel</Button>
              </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  };
}

function CampaignSegment(props) {
  

  // fetchCampaigns() {
  //   let campaigns = [
  //     {
  //       first_name: 'Meow',
  //       last_name: 'Mow'
  //     }
  //   ];

  //   this.setState({campaigns: campaigns})
  // }


  console.log(props.campaigns);
  let campaignList = props.campaigns.map(campaign => {
    return (
      <Segment key={campaign.first_name}>
        {campaign}
      </Segment>
    )
  });

  return (
    <Segment.Group>
      <Header as='h4' attached='top'>
        Campaigns
      </Header>
      <div>
        {campaignList}
      </div>
      
    </Segment.Group>
  )
}


class Campaigns extends Component {
  state = {
    campaigns: []
  }

  addCampaign = (campaign) => {
    const campaignList = this.state.campaigns
    campaignList.push(campaign)
    this.setState(campaignList)
    console.log(this.state)
  }

  render() {
    return (
      <>

        <NameForm addCampaignCallback={this.addCampaign}/>
          
        <CampaignSegment campaigns={this.state.campaigns} />
        <h4>

        </h4>
      </>
    )
  }
}

export default Campaigns

