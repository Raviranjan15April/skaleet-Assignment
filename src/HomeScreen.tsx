import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import { useTransactions } from './TransactionContext';

const HomeScreen = ({ navigation }) => {
  const { transactions, balance, beneficiary } = useTransactions();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  const renderItemForBeneficiary = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>First Name: {item.firstName}</Text>
      <Text style={styles.itemText}>Last Name: {item.lastName}</Text>
      <Text style={styles.itemText}>IBAN: {item.iban}</Text>  
    </View>
  );




  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('Transaction')}
      />
      <View style={{marginTop: 10}}>
      <Button
        title="Add Beneficiary"
        onPress={() => navigation.navigate('Beneficiary')}
      />
      </View>
      
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <FlatList
        data={beneficiary}
        // keyExtractor={item => item.id.toString()}
        renderItem={renderItemForBeneficiary}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default HomeScreen;
