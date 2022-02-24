import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: grid;
  grid-template-rows: 70% 15% 15%;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  margin-left: 20%;
  margin-right: 20%;
  padding-bottom: 10px;
`;

const Title = styled.h1`
  font-family: verdana;
  font-style: italic;
  color: black;
  text-shadow: 2px 0 #1f513f;
  grid-row-start: 1;
  grid-row-end: span 2;
  grid-column-start: 1;
  grid-column-end: span 10;
  border-bottom: solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source:
    linear-gradient(
      to right,
      white 0%,
      #1f513f 50%,
      white 100%
    );
  z-index:1;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVBZVpBs5_Wbwx8-9f8J3MT8RTjidpQ7hNkw&usqp=CAU");
  background-repeat: no-repeat;
  background-position-x: 12%;
  background-size: 110px 100px;
`;

const Categories = styled.div`
  font-family: verdana;
  grid-row-start:2;
  grid-row-end: span 3;
  grid-column-start: 1;
  grid-column-end: span 10;
  margin-bottom: 5%;
  display: inline-grid;
  grid-template-rows: 100%
  margin-left: -20%;
  max-width: 100%;
`;

const CatButton = styled.button`
  grid-row-start: 1;
  grid-row-end: 1;
  border-style: solid;
  border-color: #1f513f;
  background-color: white;
  font-family: verdana;
  border-radius: 12px;
  border-width: 2px;
  padding: 10px;
  margin: 10px;
  width: auto;
  height: auto;
  &: hover {
    background-color: #1f513f;
    cursor: pointer;
    border-color: #f4f2ed;
    color: #f4f2ed;
  };
  &: active {
    background-color: white;
    color: black;
    border-color: #1f513f;
    -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
          box-shadow: inset 0px 0px 15px #c1c1c1;
  };
`;

// &: focus {
//   background-color: white;
//   color: black;
//   border-color: #1f513f;
//   -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
//    -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
//         box-shadow: inset 0px 0px 15px #c1c1c1;
// }

function Header() {
  return (
    <HeaderDiv>
      <Title>Project Catwalk</Title>
      <Categories>
        <CatButton>
          Shirts
        </CatButton>
        <CatButton>
          Pants
        </CatButton>
        <CatButton>
          Shoes
        </CatButton>
        <CatButton>
          Jackets
        </CatButton>
        <CatButton>
          Sunglasses
        </CatButton>
        <CatButton>
          Chainmail
        </CatButton>
        <CatButton>
          Infinity Stones
        </CatButton>
        <CatButton>
          Belts
        </CatButton>
        <CatButton>
          Dresses
        </CatButton>
        <CatButton>
          Hats
        </CatButton>
      </Categories>
    </HeaderDiv>
  );
}
export default Header;
