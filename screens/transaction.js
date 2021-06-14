import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import * as Permisssions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
import db from '../config';
import firebase from 'firebase';

export default class Transaction extends React.Component{
    constructor(){
        super();
        this.state={
            hasCamPermissions:null,
            scanned:false,
            scanBookID:"",
            scanStudentID:"",
            buttonState:"normal"
        }
    }
    getCamPermission=async(id)=>{
        const {status}=await Permisssions.askAsync(Permisssions.CAMERA);
        this.setState({
            hasCamPermissions:status==="granted",
            buttonState:id,
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
     const {buttonState}=this.state
     if(buttonState==="bookid"){
         this.setState({
             scanned:true,
             scanBookID:data,
             buttonState:"normal"
         })
     }else if(buttonState==="studentid"){
         this.setState({
             scanned:true,
             scanStudentID:data,
             buttonState:"normal"
         })
     }
    }
    handleTransaction=()=>{
        db.collection("books").doc(this.state.scanBookID).get()
        .then(doc=>{
            console.log(doc.data())
        })
    }
    render(){
        const hasCamPermissions=this.state.hasCamPermissions;
        const buttonState=this.state.buttonState;
        const scanned=this.state.scanned;
        if(buttonState!=="normal" && hasCamPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
            )
        }else if(buttonState==="normal"){
        /*return(
            <View style={styles.container}>
                <Text style={styles.displayText}> 
                {hasCamPermissions===true?this.state.scanData:"Request Camera Permisssions"} </Text>
                <TouchableOpacity style={styles.scanButton} onPress={this.getCamPermission}>
                    <Text style={styles.buttonText}> Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )*/
        return(
            <View style={styles.container}>
                <Image source={require("../assets/booklogo.jpg")} style={{width:200, height:200}}></Image>
                <Text style={{textAlign:'center', fontSize:32}}> WILY </Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputBox} placeholder="Book ID" value={this.state.scanBookID} onChangeText={text=>{this.setState({scanBookID:text})}}/>
                    <TouchableOpacity style={styles.scanButton} onPress={()=>{
                        this.getCamPermission("bookid")
                    }}>
                        <Text style={styles.buttonText}> Scan </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputBox} placeholder="Student ID" value={this.state.scanStudentID} onChangeText={text=>{this.setState({scanStudentID:text})}}/>
                    <TouchableOpacity style={styles.scanButton} onPress={()=>{
                        this.getCamPermission("studentid")
                    }}>
                        <Text style={styles.buttonText}> Scan </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={async()=>this.handleTransaction()}>
                    <Text style={styles.sbuttonText}> Submit</Text>
                </TouchableOpacity>
            </View>
        )
        }
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      displayText: {
        fontSize: 15,
        textDecorationLine: 'underline',
      },
      buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
      },
      inputView: {
        flexDirection: 'row',
        margin: 20,
      },
      inputBox: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20,
      },
      scanButton: {
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0,
      },
      submitButton:{
          backgroundColor:"lightgreen",
          width:100,
          height:50,
      },
    sbuttonText:{
        padding:10,
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
        color:"white"
    }
})