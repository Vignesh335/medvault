import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const Dashboard = ({ navigation }: any) => {
  // Dummy data for the "Lifetime" Vault
  const [records, setRecords] = useState([
    { id: '1', title: 'Annual Checkup', date: '2025-10-12', type: 'Report' },
    { id: '2', title: 'Blood Glucose Test', date: '2025-08-05', type: 'Lab' },
    { id: '3', title: 'Pfizer Booster', date: '2024-12-20', type: 'Vaccine' },
  ]);

  const renderItem = ({ item }: any) => (
    <View style={styles.recordCard}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{item.type[0]}</Text>
      </View>
      <View style={styles.recordInfo}>
        <Text style={styles.recordTitle}>{item.title}</Text>
        <Text style={styles.recordDate}>{item.date} • {item.type}</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Vault</Text>
        <Text style={styles.subtitle}>{records.length} total records secured</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddRecord')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E14' },
  header: { padding: 25, borderBottomWidth: 1, borderBottomColor: '#161B22' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00F2FF' },
  subtitle: { color: '#666', marginTop: 5 },
  list: { padding: 20 },
  recordCard: {
    backgroundColor: '#161B22',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#30363D',
  },
  iconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#00F2FF22', justifyContent: 'center', alignItems: 'center' },
  iconText: { color: '#00F2FF', fontWeight: 'bold' },
  recordInfo: { flex: 1, marginLeft: 15 },
  recordTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '600' },
  recordDate: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  arrow: { color: '#30363D', fontSize: 20 },
  fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#00F2FF', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { fontSize: 30, color: '#0A0E14', fontWeight: 'bold' }
});

export default Dashboard;