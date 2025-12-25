import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (user: any, token: string) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', token);
    } catch (e) {
        console.error('Failed to store user', e);
    }
};

export const getStoredUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
