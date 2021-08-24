import React from 'react';
import styled from 'styled-components';

import Card from './card';
import ModiLogo from '../static/modi-home-banner.png';
import Landing from './landing';

const HeaderWrapper = styled('div')`
  margin: 30px;
  font-size: 28px;
  font-weight: bold;
  color: brown;
`
const Row2Wrapper = styled('div')`
    display:  flex;
    flex-direction: row;
    border : 1px solid white;
    margin:5px;
    padding: 7px;


`
const Col2Wrapper = styled('div')`
    display:  flex;
    flex-direction: column;
    border : 1px solid white;
    margin:5px;
    padding: 7px;
    max-height: 510px;
    overflow: scroll;
`
const IconWrapper = styled('img')`
  width: 110%;
  @media (max-width: 768px) {
    display: none;
  }
`


const SlotsView = (props) => {
  const { centres: items } = props;
    let sessionsList = []
      for(let i=0;i<items.length;++i){
        for(let j=0;j<items[i].sessions.length;++j){
          let obj = {...items[i].sessions[j], ...items[i]}
          sessionsList.push(obj);
        }
      }

  return (
    <>
    <HeaderWrapper>COWIN SLOTS</HeaderWrapper>
        <Row2Wrapper>
            <Col2Wrapper>
              {sessionsList.map(obj => 
                <Card 
                  centerName={obj.name}
                  centeAddress={`${obj.address}, ${obj.district_name}, ${obj.state_name}, ${obj.pincode}`}
                  ageGroup={'18 & Above'}
                  vaccineName={obj.vaccine}
                  vaccinePrice={obj.fee_type}
                  dose1Qty={obj.available_capacity_dose1}
                  dose2Qty={obj.available_capacity_dose2}
                />
              )}
            </Col2Wrapper>
            <Col2Wrapper>
              <IconWrapper src={ModiLogo}/>
            </Col2Wrapper>
        </Row2Wrapper>
      </>

    )
} 

export default SlotsView;