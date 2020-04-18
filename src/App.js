/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Button from './components/Button'
import Display from './components/Display'

const stateInicial ={
  displayValue: '0',
  limparDisplay: false,
  operacao: null,
  valores: [0, 0],
  valorCorrente: 0,

}

export default class App extends Component {
  state = { ...stateInicial }

  addDigito = n => {
    console.debug(typeof this.state.displayValue)
    if (n === '.' && !limparDisplay && this.state.displayValue.includes('.')){
      return 
    }
    const limparDisplay = this.state.displayValue === '0' 
      || this.state.limparDisplay
    const valorCorrente = limparDisplay ? '' : this.state.displayValue
    const displayValue = valorCorrente + n
    this.setState({ displayValue, limparDisplay: false})

    if (n !== '.') {
      const novoValor = parseFloat(displayValue)
      const valores = [...this.state.valores]
      valores[this.state.valorCorrente] = novoValor
      this.setState({ valores })
    }
  }

  limparMemoria = () => {
    this.setState({ ...stateInicial })
  }

  setOperacao = operacao => {
    if(this.state.valorCorrente === 0){
      this.setState({ operacao, valorCorrente: 1, limparDisplay: true })
    } else{
      const igual = operacao === '='
      const valores = [...this.state.valores]
      try {
        valores [0] = eval(`${valores[0]} ${this.state.operacao} ${valores[1]}`) 
      } catch (e) {
        valores [0] = this.state.valores[0]
      }
      valores [1] = 0
      this.setState({
        displayValue: `${valores[0]}`,
        operacao: igual? null : operacao, 
        valorCorrente: igual ? 0 : 1,
        limparDisplay: !igual,
        valores, 
      })
    } 
  }

  render(){
    return(
      <View style = {styles.container} >
        <Display value = {this.state.displayValue} />
        <View style = {styles.buttons}>
          <Button label = 'AC' triplo onClick = { this.limparMemoria }  />
          <Button label = '/' operacao onClick = { this.setOperacao} />
          <Button label = '7' onClick = { this.addDigito } />
          <Button label = '8' onClick = { this.addDigito } />
          <Button label = '9' onClick = { this.addDigito } />
          <Button label = '*' operacao onClick = { this.setOperacao} />
          <Button label = '4' onClick = { this.addDigito } />
          <Button label = '5' onClick = { this.addDigito } />
          <Button label = '6' onClick = { this.addDigito } />
          <Button label = '-' operacao onClick = { this.setOperacao}  />
          <Button label = '1' onClick = { this.addDigito } />
          <Button label = '2' onClick = { this.addDigito } />
          <Button label = '3' onClick = { this.addDigito } />
          <Button label = '+' operacao onClick = { this.setOperacao}  />
          <Button label = '0' dobro onClick = { this.addDigito } />
          <Button label = '.' onClick = { this.addDigito } />
          <Button label = '=' operacao onClick = { this.setOperacao} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
