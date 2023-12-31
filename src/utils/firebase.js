// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { useEffect, useState, useCallback } from 'react';
import { getDatabase, onValue, ref, update, get, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signInWithPopup, signOut, connectAuthEmulator } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5GT_j9SFsI0LLmBsusCLT7jxISoNNi-Y",
    authDomain: "cs392-react-tutorial.firebaseapp.com",
    databaseURL: "https://cs392-react-tutorial-default-rtdb.firebaseio.com",
    projectId: "cs392-react-tutorial",
    storageBucket: "cs392-react-tutorial.appspot.com",
    messagingSenderId: "294252936351",
    appId: "1:294252936351:web:d396f347ca3563604d36aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

if (!globalThis.EMULATION && import.meta.env.MODE === 'development') {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectDatabaseEmulator(database, "127.0.0.1", 9000);

    signInWithCredential(auth, GoogleAuthProvider.credential(
        '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
    ));

    // set flag to avoid connecting twice, e.g., because of an editor hot-reload
    globalThis.EMULATION = true;
}

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
            setData(snapshot.val());
        }, (error) => {
            setError(error);
        })
    ), [path]);

    return [data, error];
};

export const getDbData = async (path) => {
    const snapshot = await get(ref(database, path));
    return snapshot.val();
}

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
            .then(() => setResult(makeResult()))
            .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};

export const writeToDb = (path, value) => {
    update(ref(database, path), value)
        .then(() => console.log("Successfully written to database"))
        .catch((error) => console.log(error));
}

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(getAuth(app), setUser)
    ), []);

    return [user];
};