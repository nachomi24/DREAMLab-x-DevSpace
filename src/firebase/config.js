import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyCS6L416J9twvS1AbV9GzZ1_yAODeWLbMM",
    authDomain: "react-firebase-206da.firebaseapp.com",
    projectId: "react-firebase-206da",
    storageBucket: "react-firebase-206da.appspot.com",
    messagingSenderId: "707533557513",
    appId: "1:707533557513:web:3af875fbe37b49a4298dd8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}