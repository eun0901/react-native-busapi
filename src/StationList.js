import React from 'react';
import styled from'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
flex-direction: column;
align-items: center;
background-color: ${({ theme }) => theme.itemBackground};
border-radius: 10px;
padding: 5px;
margin: 3px 0px;
`;

const Content_name = styled.Text`
flex: 1;
font-size: 20px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 15px;
`;
const StationList = ({ item }) => {
    return (
        <Container>
            <Content_name>{item.name}</Content_name>
            <Content_locate>위치: {item.x}, {item.y}</Content_locate>
        </Container>
    );
};

StationList.propTypes = {
    item: PropTypes.object.isRequired,
};

export default StationList;