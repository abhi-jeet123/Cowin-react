import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import styled from 'styled-components';

import SlotsView from './slotView';
import bgImg from '../static/covid-bg.jpeg';

const RowWrapper=styled('div')`
    text-align:center;
    margin: 136px 34px;


`
const DropdownWrapper=styled(Dropdown)`
    width: 80%;

`

const Heading = styled('div')`
	font-size: x-large;
    font-weight: bold;
    color: darkblue;
`
const Row=styled('div')`
    display:  flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin:5px;
    padding: 7px;
    
    @media(max-width: 767px) {
      flex-direction: column;
    }

`
const Col=styled('div')`
    display:  flex;
    flex-direction: column;
    margin:5px;
    padding: 7px;
    width: 27%;

    @media(max-width: 767px) {
      flex-direction: row;
      justify-content: space-evenly;
      width: auto;
    }
`
const ButtonWrapper = styled('button')`
    background-color: white;
    border-radius: 30px;
    width: 39%;
    display: flex;
    font-weight:bold;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
    font-size: 15px;
    background: darkblue;
    color: white;

    @media(max-width: 767px) {
      // width:30%;
    }
`

const Button1Wrapper = styled('button')`
    background-color: #4CAF50;
    border-radius: 30px;
    height: 33px;
    width: 10%;
    justify-content: center;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    background: blue;
    color: white;
    margin: 8px 32px;
    @media (max-width: 767px) {
        height: 46px;
        width: 16%;

    }

`


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statesList: [],
      districtList: [],
      selectedState: null,
      selectedDistrict: null,
      centres: []
    };
  }

  componentDidMount() {
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
    .then(res => res.json())
      .then(
        (data) => {
          console.log('<><><>',data)
          this.setState({
            statesList: data.states
          })
        },
      )

  }

  onSearch = () => {
    //console.log('<<<>>',e);
    const districtId=this.getDistrictId(this.state.selectedDistrict)
     fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=11-08-2021`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            centres: data.centers
          });
        }
      )

  }

  onClick = () => {
    this.setState({
        centres: [],
        selectedState: 'SELECT STATE',
        selectedDistrict: 'SELECT DISTRICT'

    });

  }

  getDistrictId(districtName){
    console.log('<>',districtName)
    for(let i=0;i<this.state.districtList.length;++i){
      if(this.state.districtList[i].district_name==districtName){
        return this.state.districtList[i].district_id;
      }
    }

  }


  getStateId(stateName){
    console.log('<>',stateName)
    for(let i=0;i<this.state.statesList.length;++i){
      if(this.state.statesList[i].state_name==stateName){
        return this.state.statesList[i].state_id;
      }
    }

  }

  stateChange = e => {
    console.log('<><>', e)
    const stateId=this.getStateId(e.value);
    console.log('<___>',stateId)
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+stateId) 
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            selectedDistrict: 'SELECT DISTRICT',
            selectedState: e.value,
            districtList: data.districts
          })
        }
      )

    }

  districtChange = e => {
    this.setState({selectedDistrict: e.value})
  }

  render() {
    const currentState = this.state.selectedState ? this.state.selectedState:  'SELECT STATE';
    const currentDistrict = this.state.selectedDistrict ? this.state.selectedDistrict:  'SELECT DISTRICT';
     
    let stateOptions=[]
    if(this.state.statesList.length>0){
      for(let i=0;i<this.state.statesList.length;++i){
        stateOptions.push(this.state.statesList[i].state_name);
      }
    }


    let districtOptions = []
    if (this.state.districtList.length > 0) {
      for(let i=0;i<this.state.districtList.length;++i){
        districtOptions.push(this.state.districtList[i].district_name);
      }

    }

    const hideLanding = this.state.centres.length > 0 ? true: false;

    return (
      <>
      {!hideLanding ? 
        <>
          <RowWrapper>
            <Heading>Check Your Nearest Vaccination Center And Slots Availability</Heading>
          </RowWrapper>
          <Row>  
            <Col> 
             <DropdownWrapper options={stateOptions} onChange={(e) => this.stateChange(e)} value={currentState} />
            </Col>
            <Col> 
             <DropdownWrapper options={districtOptions} onChange={(e) => this.districtChange(e)} value={currentDistrict} />
            </Col>
            <Col> 
             <ButtonWrapper onClick={() => this.onSearch()}>Go ➤</ButtonWrapper>
            </Col>
          </Row>
        </> : 
        <>
        <Button1Wrapper onClick={() => this.onClick()}>◀  Back</Button1Wrapper>
        <SlotsView centres={this.state.centres}/>
        </>
      }
      </>
    )    
  }
}
export default Landing;
