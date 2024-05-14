import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Table() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uname, usetName] = useState("");
  const [uemail, usetEmail] = useState("");
  const [editId, setEditID] = useState(-1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = data.length + 1;
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        id: id,
        name: name,
        email: email,
      })
      .then((res) => {
        setData([...data, { id: id, name: name, email: email }]);
        setName("");
        setEmail("");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + id)
      .then((res) => {
        usetName(res.data.name), usetEmail(res.data.email);
      })
      .catch((err) => console.log(err));
    setEditID(id);
  };

  const handleDelete = (id) =>{
    axios
     .delete("https://jsonplaceholder.typicode.com/users/" + id)
     .then((res) => {
        setData(data.filter((user) => user.id!== id));
      })
     .catch((err) => console.log(err));
  }


  const handleUpdate = () => {
    axios
      .put("https://jsonplaceholder.typicode.com/users/" + editId, {
        id: editId,
        name: uname,
        email: uemail,
      })
      .then((res) => {
        setData(
          data.map((user) => {
            if (user.id === editId) {
              return {
                ...user,
                name: uname,
                email: uemail,
              };
            }
            return user;
          })
        );
        setEditID(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Contact List</h1>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) =>
            user.id === editId ? (
              <tr key={index}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="text"
                    value={uname}
                    onChange={(e) => usetName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={uemail}
                    onChange={(e) => usetEmail(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Update</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
