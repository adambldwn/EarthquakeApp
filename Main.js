import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import axios from 'axios';
import {Component_A} from './components';
import Modal from 'react-native-modal';

const Main = () => {
  const [list, setList] = useState([]);
  const [equ, setEqu] = useState([]);
  const [flag, setFlag] = useState(false);

  const fetchData = async () => {
    const {data} = await axios.get(
      'https://api.orhanaydogdu.com.tr/deprem/live.php',
    );
    setList(data.result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelected = (val) => {
    setEqu(val);
    setFlag(true);
  };

  const renderedList = (data) => {
    return (
      <Component_A onSelect={() => onSelected(data.item)} item={data.item} />
    );
  };

  
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={list}
        renderItem={renderedList}
        keyExtractor={(_, index) => index.toString()}
      />

      <Modal
        style={{justifyContent:'center'}}
        
        isVisible={flag}
        swipeDirection='left'
        onSwipeComplete={()=>setFlag(false)}
        >
        <View style={{alingItems:'center', backgroundColor:'white'}}>
          <Text>{equ.title}</Text>
          <Text>Derinlik : {equ.depth}</Text>
          <Text>Tarih : {equ.date}</Text>
          <Text>Siddet : {equ.mag}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Main;