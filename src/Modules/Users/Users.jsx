import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/Apis/Users/getAllusers';
import UserTable from './Users-Components/UsersTable';
import Loading from '../../Components/Shared/Loader/Loading';


function Users() {
  const dispatch = useDispatch();
  const { allUsers, usersError, usersLoading, totalusers } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllUsers({ page, pageSize: limit }));
  }, [dispatch, page, limit]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = allUsers?.filter((user) =>
    user?.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-main text-2xl">All Users</h2>
        <input
          className="border rounded-2xl outline-none text-main w-1/2 p-2"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {usersLoading ? (
        <div className="flex justify-center items-center">
            <Loading/>
        </div>
      ) : usersError ? (
        <p className="text-red-500">Error: {usersError}</p>
      ) : (
        <UserTable
          users={filteredUsers ||[]}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalUsers={totalusers || 0}
        />
      )}
    </div>
  );
}

export default Users;
