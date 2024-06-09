import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import axios from 'axios'
import { addTask } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Create(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/create', {
      name,
      description
    }).then(res => {
      dispatch(addTask(res.data))
      navigate('/')
    }).catch(err => {
      console.log(err)
    })
  }
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
          <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
              <h2>Add Task</h2>
              <div className='mb-2'>
                <label htmlFor=''>Task Name</label>
                <input type='text' placeholder='Enter Name' className='form-control' onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='mb-2'>
                <label htmlFor=''>Description</label>
                <input type='text' placeholder='Enter Description' className='form-control' onChange={(e) => setDescription(e.target.value)}></input>
              </div>
              <button className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
    )
}

export default Create;