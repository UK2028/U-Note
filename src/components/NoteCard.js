import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from "firebase/firestore";

import { db, auth } from '../firebase/config';


export const NoteCard = ({note, refreshPage, setRefreshPage}) => {

  const { title, description, author, id } = note;

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate('/create',{
      state: {
        ...note
      }
    })
  }

  const handleDelete = async () => {
    try {
      const documentRef = doc(db,"notes",id);
      await deleteDoc(documentRef);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error.message);
    }
  } 

  return (
    <div className="flex flex-col my-14 px-3 py-4 border-b border-slate-400 rounded-xl shadow-lg shadow-sky-500 ">
      <div className="text-2xl font-semibold border-b pb-2 mb-4">
        {title}
      </div>
      <div className="text-lg border-b pb-4  mb-4">
        {description}
      </div>
      <div className="flex justify-between">
        <div className="bg-sky-500 text-white text-lg px-2 py-1 rounded-lg">
          {author}
        </div>
        <div>
          { auth?.currentUser?.uid && auth?.currentUser?.uid === JSON.parse(localStorage.getItem("user"))?.uid ?
            (
              <>
              <button title="Edit" onClick={handleUpdate}><i className="bi bi-pencil-square mr-1 text-xl text-green-700 p-2 rounded-lg hover:text-white hover:bg-green-600"></i></button>
              <button title="Delete" onClick={handleDelete} ><i className="bi bi-trash3 text-xl text-red-600 p-2 rounded-lg hover:text-white hover:bg-red-600"></i></button>
              </>) : "" }
        </div>
      </div>
    </div>
  )
}
