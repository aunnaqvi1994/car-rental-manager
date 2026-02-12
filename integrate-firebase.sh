#!/bin/bash
# Simple script to add Firebase integration to app.js

# 1. Add Firebase config at the top
ed -s app.js << 'ED_COMMANDS'
1i
// Firebase Integration
const USE_FIREBASE = true;
const FIREBASE_URL = "https://car-rental-manager-8e3e9-default-rtdb.asia-southeast1.firebasedatabase.app/";
let firebaseDB = null;

// Initialize Firebase
if (USE_FIREBASE && typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp({ databaseURL: FIREBASE_URL });
        firebaseDB = firebase.database();
        console.log('🔥 Firebase initialized');
    } catch(e) {
        console.warn('Firebase init failed:', e);
    }
}

.
w
q
ED_COMMANDS

echo "Firebase config added to app.js"
