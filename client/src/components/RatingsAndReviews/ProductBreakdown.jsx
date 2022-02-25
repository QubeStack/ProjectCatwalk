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
  height: 3px;
  width: 250px;
  border-radius: 1px;
  position: relative;
  display: block;
  margin-bottom: 3px;
  &:after {
    content: "\\25BC";
    color: "black";
    position: absolute;
    height: 5px;
    top: -8px;
    left: 47%;
  }`;

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log("characteristics:", this.props.meta)
  }

  render() {
    const characteristics = this.props.meta.characteristics;
    return (
      <Center className="productBreakdown">
        {characteristics.Size ? (
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
        ) : null}

        {characteristics.Width ? (
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
        ) : null}

        {characteristics.Comfort ? (
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
        ) : null}

        {characteristics.Quality ? (
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
        ) : null}

        {characteristics.Length ? (
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
        ) : null}

        {characteristics.Fit ? (
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
        ) : null}

      </Center>
    );
  }
}

export default ProductBreakdown;
