import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator
} from 'react-native';
import { API_URL } from '../constants';
import { getStoredUser } from '../StoredData/User';

const Dashboard = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);

  const fetchRecords = async () => {
    getStoredUser().then(async user => {
      if (user) {
        try {
          const response = await fetch(`${API_URL}/documents/medvault/med_records?user_id=${user.id}`);
          const data = await response.json();

          if (response.ok) {
            setRecords(data.data || []);
          } else {
            console.error("Failed to fetch records:", data);
          }
        } catch (error) {
          console.error("Error fetching records:", error);
        } finally {
          setLoading(false);
        }
      }
      else {
        navigation.navigate('Login')
      }
    })
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => navigation.navigate('RecordDetails', { record: item })}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{item.type ? item.type[0] : 'R'}</Text>
      </View>
      <View style={styles.recordInfo}>
        <Text style={styles.recordTitle}>{item.title}</Text>
        <Text style={styles.recordDate}>{item.date} • {item.type}</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00F2FF" />
        <Text style={{ color: '#00F2FF', marginTop: 10 }}>Loading records...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Vault</Text>
        <Text style={styles.subtitle}>{records.length} total records secured</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item._id} // Use _id from backend
        renderItem={renderItem}
        contentContainerStyle={records.length === 0 ? styles.emptyListContainer : styles.list}
        ListEmptyComponent={<Text style={{ color: '#666' }}>No records found.</Text>}
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
  emptyListContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  fabText: { fontSize: 30, color: '#0A0E14', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Dashboard;
