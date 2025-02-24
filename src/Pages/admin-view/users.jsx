import { useSelector } from "react-redux";

function AdminUsers() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <h1>user</h1>
      {/* <table class="table-auto">
        <thead>
          <tr>
            <th>Users</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
}

export default AdminUsers;
