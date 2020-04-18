import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width/4,
        width: Dimensions.get('window').width/4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    botaoOperacao: {
        color: '#fff',
        backgroundColor: '#fa8231',
    },
    botaoDobro: {
        width: (Dimensions.get('window').width/4)*2,
    },
    botaoTriplo: {
        width: (Dimensions.get('window').width/4)*3,
    }
})

export default props => {
    const stylesBoatao = [styles.button]

    if(props.operacao) stylesBoatao.push(styles.botaoOperacao)
    if(props.dobro) stylesBoatao.push(styles.botaoDobro)
    if(props.triplo) stylesBoatao.push(styles.botaoTriplo)

    return (
        <TouchableHighlight onPress = { () => props.onClick(props.label)} >
            <Text style = {stylesBoatao} >{props.label}</Text>
        </TouchableHighlight>
    )
}