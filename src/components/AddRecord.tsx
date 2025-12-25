import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ScrollView, Alert, KeyboardAvoidingView, Platform,
    PermissionsAndroid
} from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

const AddRecord = ({ navigation }: any) => {
    const [form, setForm] = useState({
        title: '',
        category: '', // e.g., Lab Test, Surgery, Consultation
        doctor: '',
        hospital: '',
        location: '',
        date: new Date().toLocaleDateString(),
        symptoms: '',
        diagnosis: '',
        prescription: '',
        bp: '', // Blood Pressure
        weight: '',
        followUpDate: '',
        notes: ''
    });

    const [files, setFiles] = useState<DocumentPickerResponse[]>([]);

    const handleFilePick = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);

            if (
                granted['android.permission.READ_MEDIA_IMAGES'] !== PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
            ) {
                Alert.alert("Permission Denied", "Access required to upload reports.");
                return;
            }
        }

        try {
            const pickedFiles = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: true,
            });
            setFiles([...files, ...pickedFiles]);
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) console.error(err);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const saveToVault = () => {
        if (!form.title || !form.category) {
            Alert.alert("Missing Information", "Title and Category are required.");
            return;
        }
        Alert.alert("Record Secured", "Medical activity and attachments are now locked.");
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>New Vault Entry</Text>

                {/* --- SECTION 1: IDENTITY --- */}
                <Text style={styles.sectionLabel}>PRIMARY DETAILS</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Activity Title (e.g., MRI Scan)"
                    placeholderTextColor="#555"
                    onChangeText={(val) => setForm({ ...form, title: val })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Category (e.g., Surgery, Lab, Checkup)"
                    placeholderTextColor="#555"
                    onChangeText={(val) => setForm({ ...form, category: val })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date (DD/MM/YYYY)"
                    placeholderTextColor="#555"
                    value={form.date}
                    onChangeText={(val) => setForm({ ...form, date: val })}
                />

                {/* --- SECTION 2: PROVIDER --- */}
                <Text style={styles.sectionLabel}>MEDICAL PROVIDER</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Doctor Name"
                    placeholderTextColor="#555"
                    onChangeText={(val) => setForm({ ...form, doctor: val })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hospital / Clinic Name"
                    placeholderTextColor="#555"
                    onChangeText={(val) => setForm({ ...form, hospital: val })}
                />

                {/* --- SECTION 3: VITALS (Optional) --- */}
                <Text style={styles.sectionLabel}>VITALS & MEASUREMENTS</Text>
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginRight: 10 }]}
                        placeholder="BP (120/80)"
                        placeholderTextColor="#555"
                        onChangeText={(val) => setForm({ ...form, bp: val })}
                    />
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Weight (kg)"
                        placeholderTextColor="#555"
                        onChangeText={(val) => setForm({ ...form, weight: val })}
                    />
                </View>

                {/* --- SECTION 4: CLINICAL --- */}
                <Text style={styles.sectionLabel}>CLINICAL SUMMARY</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Symptoms & Diagnosis"
                    placeholderTextColor="#555"
                    multiline
                    onChangeText={(val) => setForm({ ...form, diagnosis: val })}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Prescriptions & Dosage"
                    placeholderTextColor="#555"
                    multiline
                    onChangeText={(val) => setForm({ ...form, prescription: val })}
                />

                {/* --- SECTION 5: FILES --- */}
                <Text style={styles.sectionLabel}>ATTACHMENTS ({files.length})</Text>
                <TouchableOpacity style={styles.uploadArea} onPress={handleFilePick}>
                    <Text style={styles.uploadText}>+ Add Lab Results / PDFs</Text>
                </TouchableOpacity>

                {files.map((file, idx) => (
                    <View key={idx} style={styles.fileRow}>
                        <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                        <TouchableOpacity onPress={() => removeFile(idx)}>
                            <Text style={styles.deleteText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* --- SECTION 6: FUTURE --- */}
                <Text style={styles.sectionLabel}>FOLLOW UP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Follow-up Date"
                    placeholderTextColor="#555"
                    onChangeText={(val) => setForm({ ...form, followUpDate: val })}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={saveToVault}>
                    <Text style={styles.saveBtnText}>LOCK IN VAULT</Text>
                </TouchableOpacity>

                <View style={{ height: 60 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0A0E14' },
    scrollContainer: { padding: 20, paddingTop: 40 },
    header: { fontSize: 26, fontWeight: 'bold', color: '#00F2FF', marginBottom: 20 },
    sectionLabel: { color: '#00F2FF88', fontSize: 11, fontWeight: 'bold', letterSpacing: 1.5, marginTop: 25, marginBottom: 10 },
    input: {
        backgroundColor: '#161B22',
        color: '#FFF',
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#30363D'
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    textArea: { height: 70, textAlignVertical: 'top' },
    uploadArea: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#00F2FF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#00F2FF05'
    },
    uploadText: { color: '#00F2FF', fontWeight: '600' },
    fileRow: {
        flexDirection: 'row',
        backgroundColor: '#1C2128',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fileName: { color: '#94A3B8', flex: 1, fontSize: 13 },
    deleteText: { color: '#FF4B4B', fontSize: 12, fontWeight: 'bold', marginLeft: 10 },
    saveBtn: {
        backgroundColor: '#00F2FF',
        padding: 18,
        borderRadius: 12,
        marginTop: 40,
        alignItems: 'center',
    },
    saveBtnText: { color: '#0A0E14', fontWeight: 'bold', fontSize: 16 }
});

export default AddRecord;