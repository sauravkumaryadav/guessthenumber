import React , {useState} from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text,TouchableWithoutFeedback,View } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
const StartGameScreen =(props)=>{
    const [enteredValue , setEnteredValue] = useState('');
    const [confirmed , setConfirmed] =useState(false);
    const[selectedNumber , setSelectedNumber] = useState();

    const numberInputHandler =(inputText)=>{
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    const touchableHandler =()=>{
        Keyboard.dismiss();
    }
    const resetInputHandler =()=>{
        setEnteredValue('');
        setConfirmed(false);
    }
    const submitInputHandler =()=>{
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99){
            Alert.alert('Invalid number!','Number must be between 1 to 99',
            [{text:'okay',style:'destructive',onPress:resetInputHandler}
        ]);
            return;

        }
      setConfirmed(true);
      setSelectedNumber(chosenNumber);
      setEnteredValue('');
      Keyboard.dismiss();
    }

    let confirmedOutput;
    if(confirmed){
        confirmedOutput=<Card style={styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={props.onStartGame.bind(this,selectedNumber)} >START GAME</MainButton>
        </Card>
    }
    return(
        <TouchableWithoutFeedback onPress={touchableHandler}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="numeric" maxLength={2}
                onChangeText={numberInputHandler} value={enteredValue} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                    <Button title="Reset" onPress={resetInputHandler} color={Colors.secondary}/></View>
                    <View style={styles.button}>
                    <Button title="Confirm" onPress={submitInputHandler} color={Colors.primary} /></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    title:{
      fontSize:20,
      marginVertical:10,
      fontFamily:'open-sans-bold'
    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:15
    },
    button:{
        width:70  
    },
    input:{
        width:50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center'
    }
});

export default StartGameScreen;