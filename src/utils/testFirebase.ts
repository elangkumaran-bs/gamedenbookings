import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const testFirebaseConnection = async () => {
  try {
    console.log('🧪 Testing Firebase connection...');
    
    // Test 1: Try to get a collection reference
    const testRef = collection(db, 'test');
    console.log('✅ Collection reference created');
    
    // Test 2: Try to read from Firestore
    console.log('📖 Attempting to read from Firestore...');
    const snapshot = await getDocs(testRef);
    console.log(`✅ Read successful! Found ${snapshot.size} documents`);
    
    // Test 3: Try to write to Firestore
    console.log('✍️ Attempting to write to Firestore...');
    const docRef = await addDoc(testRef, {
      message: 'Test document',
      timestamp: new Date(),
      testId: Math.random()
    });
    console.log('✅ Write successful! Document ID:', docRef.id);
    
    return { success: true, message: 'Firebase connection is working!' };
  } catch (error: any) {
    console.error('❌ Firebase test failed:', error);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    
    // Check for common errors
    if (error?.code === 'permission-denied') {
      return { 
        success: false, 
        message: 'Permission denied. Please enable Firestore in Firebase Console with test mode rules.'
      };
    }
    
    return { 
      success: false, 
      message: `Firebase error: ${error?.message || 'Unknown error'}`
    };
  }
};
