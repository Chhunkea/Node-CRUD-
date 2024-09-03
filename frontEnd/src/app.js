import axios from 'axios';
import { useState, useEffect } from 'react';
import UserTable from './UserTable'


const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);

    // fetch from backend
    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/v1/users');
            setUsers(response.data.data.users);
        } catch (err) {
            console.log(err)
        }
    }
    

  return (
    <div>
      <UserTable users={users}/>
    </div>
  )
}

export default App;
