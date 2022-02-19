import React from 'react';
import styled from 'styled-components';

const Border = styled.div`
justify-content: center;
align-content: center;
border-style: solid;
border-color: transparent;
boder-size: 1px;
`;

const SpaceEven = styled.div`
display: flex;
justify-content: space-between;
`;

const Inline = styled.div`
display: flex;
border-style: solid;
border-color: white;
padding: 1px;
`;

const Text = styled.div`
display: flex;
justify-content: center;
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
    left: 50%;
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
          <SpaceEven>
            <Text>
              Too Small
            </Text>
            <Text>
              Perfect
            </Text>
            <Text>
              Too Big
            </Text>
          </SpaceEven>
        </Border>

        <Border>
          <Factor>
            Width
          </Factor>
          <Bar />
          <SpaceEven>
            <Text>
              Too Narrow
            </Text>
            <Text>
              Perfect
            </Text>
            <Text>
              Too Wide
            </Text>
          </SpaceEven>
        </Border>

        <Border>
          <Factor>
            Comfort
          </Factor>
          <Bar />
          <SpaceEven>
            <Text>
              Uncomfortable
            </Text>
            <Text>
              Ok
            </Text>
            <Text>
              Perfect
            </Text>
          </SpaceEven>
        </Border>

        <Border>
          <Factor>
            Quality
          </Factor>
          <Bar />
          <SpaceEven>
            <Text>
              Poor
            </Text>
            <Text>
              Ok
            </Text>
            <Text>
              Perfect
            </Text>
          </SpaceEven>
        </Border>

        <Border>
          <Factor>
            Length
          </Factor>
          <Bar />
          <SpaceEven>
            <Text>
              Runs Short
            </Text>
            <Text>
              Perfect
            </Text>
            <Text>
              Runs Long
            </Text>
          </SpaceEven>
        </Border>

        <Border>
          <Factor>
            Fit
          </Factor>
          <Bar />
          <SpaceEven>
            <Text>
              Runs Tight
            </Text>
            <Text>
              Perfect
            </Text>
            <Text>
              Runs Long
            </Text>
          </SpaceEven>
        </Border>

      </Center>
    );
  }
}

export default ProductBreakdown;
