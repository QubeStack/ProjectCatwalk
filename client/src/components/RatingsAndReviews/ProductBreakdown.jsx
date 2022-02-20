import React from 'react';
import styled from 'styled-components';

const Border = styled.div`
* {
  font-family: verdana;
  justify-content: center;
  align-content: center;
  border-style: solid;
  border-color: transparent;
  border-size: 1px;
}
`;

// const SpaceEven = styled.div`
// display: flex;
// justify-content: space-between;
// `;

const Inline = styled.div`
display: flex;
position: relative;
`;

const Text1 = styled.div`
font-size: 10px;
margin-bottom: 8px;
`;

const Text2 = styled.div`
position: absolute;
left: 50%;
transform: translate(-50%,0);
font-size: 10px;
margin-bottom: 8px;
`;

const Text3 = styled.div`
margin-left: auto;
font-size: 10px;
margin-bottom: 8px;
`;

const Factor = styled.div`
display: flex;
justify-content: flex-start;
font-size: 14px;
font-weight: bold;
`;

const Center = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Bar = styled.span`
  background-color: #a6a6a6;
  height: 5px;
  width: 250px;
  border-radius: 5px;
  position: relative;
  display: block;
  margin-bottom: 3px;
  &:after {
    content: "\\25BC";
    color: ${props => props.empty ? "#a6a6a6" : "black"};
    position: absolute;
    height: 5px;
    top: -6px;
    left: 47%;
  }`;

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Center>
        <Border>
          <Factor>
            Size
          </Factor>
          <Bar />
          <Inline>
            <Text1>
              Too Small
            </Text1>
            <Text2>
              Perfect
            </Text2>
            <Text3>
              Too Big
            </Text3>
          </Inline>
        </Border>

        <Border>
          <Factor>
            Width
          </Factor>
          <Bar />
          <Inline>
            <Text1>
              Too Narrow
            </Text1>
            <Text2>
              Perfect
            </Text2>
            <Text3>
              Too Wide
            </Text3>
          </Inline>
        </Border>

        <Border>
          <Factor>
            Comfort
          </Factor>
          <Bar />
          <Inline>
            <Text1>
              Uncomfortable
            </Text1>
            <Text2>
              Ok
            </Text2>
            <Text3>
              Perfect
            </Text3>
          </Inline>
        </Border>

        <Border>
          <Factor>
            Quality
          </Factor>
          <Bar />
          <Inline>
            <Text1>
              Poor
            </Text1>
            <Text2>
              Ok
            </Text2>
            <Text3>
              Perfect
            </Text3>
          </Inline>
        </Border>

        <Border>
          <Factor>
            Length
          </Factor>
          <Bar />
          <Inline>
            <Text1>
              Runs Short
            </Text1>
            <Text2>
              Perfect
            </Text2>
            <Text3>
              Runs Long
            </Text3>
          </Inline>
        </Border>

        <Border>
          <Factor>
            Fit
          </Factor>
          <Bar />
          <Inline>
            <Text1>
              Runs Tight
            </Text1>
            <Text2>
              Perfect
            </Text2>
            <Text3>
              Runs Long
            </Text3>
          </Inline>
        </Border>

      </Center>
    );
  }
}

export default ProductBreakdown;
