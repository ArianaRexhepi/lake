import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LakeModelList() {
  const [lakes, setLakes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:5267/api/lakeslist');
      setLakes(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this lake?');
    if (confirmed) {
      await axios.delete(`http://localhost:5267/api/lakeslist/${id}`).then(()=> {
        setLakes(lakes.filter(lake => lake.id !== id));
      });
    }
  };

  return (
    <><h1>Lakes</h1><div className="card shadow mb-4">
          <div className="card-header py-3">
              <div className="float-right">
              <Link to="/createlakes"><button className='btn btn-primary' >Create new</button></Link>
              </div>
          </div>

          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Description</th> 
                      <th>Veprime</th>
                  </tr>
              </thead>
              <tbody>
                  {lakes.map(lake => (
                      <tr key={lake.id}>
                          <td>{lake.id}</td>
                          <td>{lake.name}</td>
                          <td> 
                            <img src={lake.image} alt='' style={{width:"200px", height:"250px", objectFit:"cover"}}/>
                          </td>
                          <td>{lake.description}</td>
                          <td>
                          <Link to={`/editlakes/${lake.id}`}><button className='btn btn-primary'>Edit</button></Link>
                              <button className='btn btn-danger' onClick={() => handleDelete(lake.id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div></>
  );
}

export default LakeModelList;
