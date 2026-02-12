// Simple Firebase wrapper - keeps localStorage as fallback
const FirebaseSync = {
    db: null,

    init() {
        try {
            const config = {
                databaseURL: "https://car-rental-manager-8e3e9-default-rtdb.asia-southeast1.firebasedatabase.app/"
            };
            firebase.initializeApp(config);
            this.db = firebase.database();
            console.log('🔥 Firebase connected!');
            return true;
        } catch (e) {
            console.warn('Firebase not available, using localStorage');
            return false;
        }
    },

    async loadAll() {
        if (!this.db) return null;
        try {
            const snapshot = await this.db.ref('/').once('value');
            return snapshot.val() || {};
        } catch (e) {
            console.error('Firebase load error:', e);
            return null;
        }
    },

    async save(collection, dataArray) {
        if (!this.db) return;
        try {
            const obj = {};
            dataArray.forEach(item => { obj[item.id] = item; });
            await this.db.ref(`/${collection}`).set(obj);
        } catch (e) {
            console.error('Firebase save error:', e);
        }
    }
};
