import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import SearchBox from './components/SearchBox';
import { DOMParser } from 'xmldom';
import styled from 'styled-components/native';
import StationList from './StationList';

const App = () => {
    const [station, setStation] = useState('');
    const [result, setResult] = useState([]);
    const width = Dimensions.get('window').width;

    const _handleTextChange = text => {
        setStation(text);
    };

    const _addStation = async(e) =>{
          try{
            var xhr = new XMLHttpRequest();
            const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
            const url = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList'; /*URL*/
            var queryParams = `${url}?serviceKey=${API_KEY}&keyword=${station}`;
            xhr.open('GET', queryParams);
            xhr.onreadystatechange = function () {
              if (this.readyState == 4) {
                console.log(this.responseText);
                let xmlDoc = new DOMParser().parseFromString(this.responseText, 'text/xml');
                let i = 0;

                while(1){
                  var tmpnode = new Object();
                  
                  tmpnode.id = xmlDoc.getElementsByTagName("stationId")[i].textContent;

                  tmpnode.name = xmlDoc.getElementsByTagName("stationName")[i].textContent;

                  tmpnode.x = xmlDoc.getElementsByTagName("x")[i].textContent;
            
                  tmpnode.y = xmlDoc.getElementsByTagName("y")[i].textContent;
                  
                  if(tmpnode.id == undefined) break;

                  result.push(tmpnode);
                  console.log(result);

                  setResult(result);
                  i++;
                  console.log(result);
                }
              }
            }
          xhr.send('');
          }
          catch(err){
            alert(err);
          }
      };

    const _onBlur = () => {
        setStation('');
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bus api</Text>
            <SearchBox 
            placeholder="정류장 이름을 입력하세요"
            value={station}
            onChangeText={_handleTextChange}
            onSubmitEditing={_addStation}
            onBlur={_onBlur}
            />
            <List width={width}>
            {result.map(item => {
              return(
                <View>
              <StationList item={item}/>
              </View>
              )
            })}
            </List>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 25,
        margin: 10,
    },
});

const List = styled.ScrollView`
flex: 1;
width: ${({width})=> width - 40}px;
`;

export default App;