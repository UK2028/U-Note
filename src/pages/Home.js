import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';

import { colRef } from '../firebase/config';
import { NoteCard } from '../components';

export const Home = () => {

  const [ notes, setNotes ] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(()=>{
    const getNotes = async () => {

      const notesDoc = await getDocs(colRef);

      setNotes(notesDoc.docs.map((doc)=>{
        const { author, title, description} = doc.data();
        return {
          author,
          title,
          description,
          id: doc.id
        }
      }));

    } 

    getNotes();
    
  },[refreshPage])

  return (
    <section className='max-w-screen-xl mx-auto mt-12'>
      <h1 className='text-center text-teal-500 text-3xl underline underline-offset-4 font-semibold'>All Posts</h1>
      {notes.map((note)=>{
        return <NoteCard key={note.id} note={note} refreshPage={refreshPage} setRefreshPage={setRefreshPage} />
      })}
    </section>
  )
}
