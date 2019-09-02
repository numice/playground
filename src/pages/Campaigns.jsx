import React, { Component } from 'react'
import { Segment, Header, Modal, Button, Image, Form, Checkbox } from 'semantic-ui-react'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


class NameForm extends Component {
  
  state = {
    campaignName: '',
    points: 0,
    startDate: null,
    endDate: null,
    focusedInput: null,
    open: false
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const state = this.state;
    const campaign = (({ campaignName, points, startDate, endDate }) => ({ campaignName, points, startDate, endDate })) (state);
    console.log(campaign)
    this.props.addCampaignCallback(campaign)
    this.close()
  };

  close = () =>  this.setState({ 
    open: false,
    campaignName: '',
    points: ''
  });

  render() {
    const { campaignName, points } = this.state;
    const { open, closeOnEscape, closeOnDimmerClick } = this.state


    return (
      <div>
        <Button onClick={this.closeConfigShow(false, true)}>
          Create new
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
                    placeholder='Campaign Name'
                    name='campaignName'
                    value={campaignName}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    placeholder='Points required'
                    name='points'
                    value={points}
                    onChange={this.handleChange}
                  />
                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_startDate_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([STARTDATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                  />
                  <div>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={this.close}>Cancel</Button>
                  </div>
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
  //       campaignName: 'Meow',
  //       points: 'Mow'
  //     }
  //   ];

  //   this.setState({campaigns: campaigns})
  // }


  console.log(props.campaigns);
  let campaignList = props.campaigns.map(campaign => {
    return (
      <Segment key={campaign.campaignName}>
        {/* moment object */}
        {campaign.campaignName} {campaign.points} {campaign.startDate.format("YYYY-MM-DD")} 
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
    console.log(this.state.campaigns)
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

