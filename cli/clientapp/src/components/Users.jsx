import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { getUser, deleteTask } from '../redux/userSlice';
import { Link } from 'react-router-dom';

function Users(){
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users)

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('http://localhost:3001/');
                console.log(res.data[0].name)
                dispatch(getUser(res.data))
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(res => {
            dispatch(deleteTask({id}))
            console.log(res.data)
        }).catch(err => console.log(err))
    }
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success btn-sm'>
                    Add +
                </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.description}</td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-success' style={{marginRight:'10px'}}>Update</Link>
                                        <button onClick={() => handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;