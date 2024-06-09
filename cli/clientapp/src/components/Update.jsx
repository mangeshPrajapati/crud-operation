import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import axios from 'axios'
import { addTask } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../redux/userSlice';


function Update(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users.users)
  const {id} = useParams()
  const user = users.find(u => u.id === id)
  console.log(user)

  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/update/'+id, {
      name,
      description
    }).then(res => {
      dispatch(updateTask({id, name, description}))
      navigate('/')
    }).catch(err => {
      console.log(err)
    })
  }
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
          <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleUpdate}>
              <h2>Update Task</h2>
              <div className='mb-2'>
                <label htmlFor=''>Task Name</label>
                <input type='text' placeholder='Enter Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='mb-2'>
                <label htmlFor=''>Description</label>
                <input type='text' placeholder='Enter Description' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}></input>
              </div>
              <button className='btn btn-success'>Update</button>
            </form>
          </div>
        </div>
    )
}

export default Update;