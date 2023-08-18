import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, updateDoc, doc } from 'firebase/firestore';

import { db, colRef, auth } from '../firebase/config';
import { useRef } from 'react';

export const Create = () => {

  const navigate = useNavigate();
  const {state} = useLocation();

  const titleRef = useRef();
  const descRef = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const desc = descRef.current.value;
    try {
      const userName = auth?.currentUser?.displayName;
      
      if(state?.id)
      {
        await updateDoc(doc(db, "notes", state.id), {
          title,
          description: desc,
          author: userName
        });
        titleRef.current.defaultValue="";
        descRef.current.defaultValue="";
      }
      else
      {
        await addDoc(colRef, {
          title,
          description: desc,
          author: userName
        })
        e.target.reset();
      }
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className='max-w-screen-xl mx-auto mt-12'>
      <form onSubmit={handleSubmit} className="max-w-xl flex flex-col shadow-2xl shadow-sky-500 mx-auto p-10">

        <input ref={titleRef} defaultValue={state?.title} className="rounded-lg ring-4 ring-sky-400 focus:ring-4 focus:ring-green-400 outline-0 p-4 mb-5" type="text" name="title" title='title' placeholder="Enter Title"/>

        <textarea ref={descRef} defaultValue={state?.description} className="h-52 rounded-lg ring-4 ring-sky-400 focus:ring-4 focus:ring-green-400 outline-0 p-4 my-5" name="description" title="description" placeholder="Enter Description" maxLength="600"></textarea>

        <div className="mx-auto">
          <button className="bg-sky-400 text-lg text-white hover:ring-4 hover:ring-sky-500 rounded-lg py-2 px-4 mt-5" type="submit">Submit</button>
        </div>

      </form>
    </section>
  )
}
