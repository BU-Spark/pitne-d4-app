import { doc, getDoc, getFirestore, collection, getDocs, addDoc} from "firebase/firestore";

type calData = {
    id: number;
    attributes: {
      title: string;
      body: string;
      date: string;
      location: string;
    };
  };
  const db = getFirestore();
  const myCollection = collection(db, 'events');
  const myDocumentData = {
    id: 1,
    attributes: {
        title: 'eventName',
        body: 'misc info',
        date: '06/4/2024',
        location: "DISTRICT 4"
    }
  };

  const newDocRef = async () => {
    await addDoc(myCollection, myDocumentData);
  };
 
  console.log('added new doc:');