import React from 'react';
import styled from 'styled-components';
import CrossLogo from '../static/red-cross.png';

const CardWrapper = styled('div')`
	
    border: 1px solid #c7c2c2;
    background: #fff;
    margin: 5px;
    border-radius: 10px;
    padding: 10px 10px;
    @media(max-width: 530px) {
    	width:93%;
    }


`

const IconWrapper = styled('img')`
	height: 15px;
	width: 20px;
`
const RowWrapperUtil = styled('div')`
	display: flex;
	flex-direction: row;
`
const PriceWrapper = styled('div')`
	border: 1px solid #007bff;
    color: white;
    font-size: 10px;
    background: ${props => props.color};
    border-radius:5px;
    font-weight:bold;
    height:25px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 0 8px;
`
const ColWrapperUtil = styled('div')`
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
`

const Text2Wrap = styled('div')`
	font-size:15px;
	font-weight:bold;
	color:#000066;
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media(max-width: 530px) {
    	font-size:12px;
    }

`
const TextWrap = styled('div')`
	font-size:15px;
	font-weight:bold;
	color:#000066;
	@media(max-width: 768px) {
    	font-size:12px;
    }
	
`
const QtyWrapper = styled('div')`
	font-size: 14px;
	font-weight: 900;
	color: green;
`
const Qty1Wrapper = styled('div')`
	font-size: 14px;
	font-weight: 900;
	color: orange;
`


const ParaWrap = styled('div')`
	font-size:12px;
	color:grey;
`

const DoseWrap = styled('div')`
	margin-left:100px;
`
const Row = styled('div')`
	display:  flex;
	flex-direction: row;
	border : 1px solid white;
    margin-top:5px;
    justify-content: space-between;
    padding: 7px;
    `
const Col = styled('div')`
	display:  flex;
	flex-direction: column;
	border : 1px solid white;
	width:30%;
`
const RowWrapper = styled('div')`
	display:  flex;
	flex-direction: row;
	border : 1px solid white;
	justify-content: flex-end;
	font-weight:bold;
	color: grey;
`
const ColWrapper = styled('div')`
	display:  flex;
	flex-direction: row;
	border : 1px solid white;
`
const ButWrap = styled('div')`
	border : 1px solid white;
	background: #007bff;
	color:white;
	font-size: 15px;
	font-weight:bold;
	border-radius:5px;
	text-align:center;
	display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 7px;

    @media (max-width: 768px) {
    	width: 90px;
    	font-size:12px;
    	padding: 2px;
    }
`

function renderDoseQuantity(dose1Qty) {
	if (dose1Qty == 0)
		return <IconWrapper src={CrossLogo}/>
	if (dose1Qty >= 10)
		return <QtyWrapper>{dose1Qty}</QtyWrapper>
	return <Qty1Wrapper>{dose1Qty}</Qty1Wrapper>
}
function renderDose2Quantity(dose2Qty) {
	if (dose2Qty == 0)
		return <IconWrapper src={CrossLogo}/>
	if (dose2Qty >= 10)
		return <QtyWrapper>{dose2Qty}</QtyWrapper>
	return <Qty1Wrapper>{dose2Qty}</Qty1Wrapper>
}



const Card = ({centerName, centeAddress, ageGroup, vaccineName, vaccinePrice, dose1Qty,dose2Qty}) => {
	const vaccinePriceColor = vaccinePrice == 'Free' ? 'green': 'blue';

	return (
	<CardWrapper>
        <TextWrap>{centerName}</TextWrap>
        <Row>
			<Col>
			   <ParaWrap>{centeAddress}</ParaWrap> 
			</Col>
			<Col>
			   <RowWrapper>{vaccineName}</RowWrapper>
			   <RowWrapper>
			   		<PriceWrapper color={vaccinePriceColor}>
   						{vaccinePrice}
   					</PriceWrapper>
			   </RowWrapper>
			</Col>
        </Row>
        <Row>
           <ColWrapper>
                <ButWrap>{ageGroup}</ButWrap>
           </ColWrapper>
           <ColWrapper>
           		<RowWrapperUtil>
           			<ColWrapperUtil>
	                	<Text2Wrap>Dose 1</Text2Wrap>
	                </ColWrapperUtil>
	                <ColWrapperUtil>
	                	{renderDoseQuantity(dose1Qty)}
	                </ColWrapperUtil>
                </RowWrapperUtil>
           </ColWrapper>
           <ColWrapper>
           		<RowWrapperUtil>
           			<ColWrapperUtil>
	                	<Text2Wrap>Dose 2</Text2Wrap>
	                </ColWrapperUtil>
	                <ColWrapperUtil>
	                	{renderDose2Quantity(dose2Qty)}
	                </ColWrapperUtil>
                </RowWrapperUtil>
           </ColWrapper>

        </Row>


	</CardWrapper>
)
}

export default Card;