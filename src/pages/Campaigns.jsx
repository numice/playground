import React, { Component } from 'react'
import { Segment, Header, Modal, Button, Image, Form, Checkbox, Radio } from 'semantic-ui-react'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import moment from 'moment'
import axios from 'axios'


const ImageUploader = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  )
}

const statuses = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SCHEDULED: 'scheduled',
  ENDED: 'ended',
  ERROR: 'error'
}

class NameForm extends Component {
  
  state = {
    campaignName: '',
    status: statuses.PENDING,
    point: 0,
    startNow: true,
    startDate: null,
    endDate: null,
    runIndefinitely: true,
    focusedInput: null,
    open: false
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const state = this.state;

    const campaign = (({ campaignName, point, status, startNow, startDate, endDate }) => {
      if (startNow === true) {
        startDate = moment().format('YYYY-MM-DD');
      }
      startDate = startDate.format('YYYY-MM-DD')
      endDate = endDate.format('YYYY-MM-DD')
      return { campaignName, point, status, startDate, endDate };
    }) (state);
    console.log('this is POST to server')
    console.log(campaign);
    //insert POST here
    axios.post('/campaigns', (({ campaignName, point, status, startDate, endDate }) => ({campaignName, point, startDate, endDate})) (campaign));
    this.props.addCampaignCallback(campaign);
    this.close();
  };

  // add close that clears the data after submit and cancel that saves the previous data?

  close = () =>  this.setState({ 
    open: false,
    campaignName: '',
    status: statuses.PENDING,
    point: 0,
    startNow: true,
    startDate: null,
    endDate: null,
    runIndefinitely: true,
  });

  render() {
    const { campaignName, point } = this.state;
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
                    fluid 
                    label='Campaign Name'
                    placeholder='Free coffee'
                    name='campaignName'
                    type='text' required
                    value={campaignName}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid 
                    label='Points'
                    placeholder='Points required'
                    name='point'
                    type='number'
                    min='1'
                    max='1000000000'
                    value={point}
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                    <Radio
                      label='Start now'
                      name='startNow'
                      value={true}
                      checked={this.state.startNow === true}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Scheduled start'
                      name='startNow'
                      value={false}
                      checked={this.state.startNow === false}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_startDate_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([STARTDATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                  />
                  <Form.Field>
                    <Radio
                      label='Scheduled end date'
                      name='runIndefinitely'
                      value={false}
                      checked={this.state.runIndefinitely === false}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='No end date'
                      name='runIndefinitely'
                      value={true}
                      checked={this.state.runIndefinitely === true}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <ImageUploader />
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

class CampaignSegment extends Component {
  

  // fetchCampaigns() {
  //   let campaigns = [
  //     {
  //       campaignName: 'Meow',
  //       point: 'Mow'
  //     }
  //   ];

  //   this.setState({campaigns: campaigns})
  // }
  componentDidMount() {
    //axios.get()
  }

  render() {
    console.log(this.props.campaigns);
    let campaignList = this.props.campaigns.map(campaign => {
      return (
        <Segment key={campaign.campaignName}>
          {/* moment object */}
          {campaign.campaignName} {campaign.point} {campaign.startDate} {campaign.endDate} 
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
}





class Campaigns extends Component {
  state = {
    campaigns: []
  }
  async componentDidMount () {
    let response = await axios.get('/campaigns')
    this.setState({campaigns: response.data.campaigns})
    console.log('this is GET')
    console.log(response.data.campaigns)
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

