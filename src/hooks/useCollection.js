import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _order) => {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const order = useRef(_order).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (order) {
      ref = ref.orderBy(...order);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocs(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      },
    );

    return () => unsub;
  }, [collection, query, order]);

  return { docs, error };
};
