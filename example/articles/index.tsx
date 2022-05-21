import * as React from 'react';
import { useEffect } from 'react';
import useIDB from '../core/hooks/useIDB';

export default function Articles() {
  const {
    db,
    models: { Articles },
  } = useIDB();

  useEffect(() => {
    getData();
  }, [Articles, db]);

  const getData = async () => {
    console.log('GETTING', Articles, db);
    if (!Articles) return;
    console.log('GETTING', Articles);
    const data = await Articles.getAll();
    console.log(data);
  };

  const add = async () => {
    console.log({ db, Articles });
    if (!db) return;
    await Articles.add({
      title: 'Toy Story',
      date: new Date(),
      article:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia dolorem alias corporis nesciunt adipisci. Rerum natus aliquam, odit magnam quaerat temporibus et quis ullam? Debitis odio facere eaque dicta neque?',
    });
    getData();
  };

  return (
    <div>
      <button onClick={add}>add</button>
    </div>
  );
}
