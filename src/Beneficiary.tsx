import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useTransactions } from './TransactionContext';
// import Dropdown from './Dropdown';

const Beneficiary = ({ navigation }) => {
    const [iban, setIban ] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { beneficiary, addBeneficiaryList } = useTransactions();

    const handleIbanChange = (ibanValue) => {
        const removeSpaceFromIban = ibanValue.replaceAll(" ", "");
        const removeSpecailCharacterFromIban = removeSpaceFromIban.replace(/[^a-zA-Z0-9\s]/g, '');
       
        setIban(removeSpecailCharacterFromIban.toUpperCase());

        // if (ibanValue === '' || isNaN(ibanValue)) {
        //     setError('Please enter a valid number');
        // } else {
        //     setError('');
        // }
    }

    const handleAddBeneficiary = () =>{
        console.log("==== handleAddBeneficiary =");
        if(firstName.length == 0 || lastName.length == 0 || iban.length == 0 ){
            console.log("==== inside the condition =");
            setError('Please enter firstName, lastName & IBan before clicking Add Beneficiary');
            return;
        }
        
        let userAlreadyAdded = false;
        beneficiary.forEach((user) => {
            if(user.firstName === firstName && user.lastName === lastName){
                userAlreadyAdded = true;
            }
        });        

        console.log("==== userAlreadyAdded =",userAlreadyAdded);
        if(userAlreadyAdded){
            console.log("==== inside the userAlreadyAdded condition =");
            setError('User already Added Please Add unique beneficiary !')
        } else{
            addBeneficiaryList(firstName, lastName, iban );
            console.log("==== added beneficiary =");
            navigation.goBack();
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#686868"}}>
            <TextInput
            style={styles.textInputStyle}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Enter First Name"
            />

            <TextInput
            style={styles.textInputStyle}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Enter Last Name"
            />

            {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Dropdown label={'Select IBAN'} />
            </View> */}

           


            <TextInput
            style={styles.textInputStyle}
            onChangeText={handleIbanChange}
            value={iban}
            // keyboardType="numeric"
            placeholder="Enter IBAN"
            />

            <Button title="Add Beneficiary" onPress={handleAddBeneficiary} />


        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    )

}

const styles = StyleSheet.create({
    textInputStyle: {
        height: 40,
          borderColor: 'blue',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 10
    }
})

export default Beneficiary;