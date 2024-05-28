import { DataGrid } from '@mui/x-data-grid';
import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';
import { useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'key', headerName: 'key', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'email', headerName: 'Email', width: 170 },
  { field: 'password', headerName: 'Password', width: 170 }
];



export default function Users() {
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    const userRef = ref(database, 'userData');
    get(userRef).then((snapshot) =>{
      if (snapshot.exists) { 
        let records = []
        snapshot.forEach(childSnapshot=>{
          let keyName = childSnapshot.key;
          let data = childSnapshot.val();
          records.push({"key":keyName,"data":data})
        })
        setUserData(records)
      }
      else{
        alert("no data available");
      }
    }).catch((err)=>{
      console.error(err);
    })
  }, []);


  

  const rows = userData.map((data,index)=>({
    ...data, 
    id: index,
    key: data.key, 
    firstName: data.data.firstName, 
    lastName: data.data.lastName,
    email:data.data.email,
    password:data.data.password
  }));


  return (
    <div style={{ height: '100%', width: '100%' }}>    
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
