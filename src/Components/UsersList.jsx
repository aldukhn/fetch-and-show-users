import React, { useEffect, useState } from "react";
import "./userslist.scss";
const UsersList = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [searchData, setsearchData] = useState("");
  const { results } = data;

  useEffect(() => {
    (async () => {
      const rawData = await fetch(
        "https://randomuser.me/api/?inc=name,picture&results=40"
      );
      const data = await rawData.json();
      setData(data);
      setUsers(data?.results || "");
    })();
  }, []);

  useEffect(() => {
    const newUsers = results?.filter((user) => {
      const fillName = `${user.name.title} ${user.name.first} ${user.name.last}`;
      if (fillName.toLowerCase().replaceAll(" ", "").includes(searchData)) {
        return true;
      }

      return false;
    });
    setUsers(newUsers || []);
  }, [searchData]);

  return (
    <div id="app">
      <h1>List of users</h1>
      <div className="container">
        <input
          id="filter"
          className="form-control mb-3 form-control-lg"
          placeholder="Type to filer..."
          onChange={(event) => {
            setsearchData(event.target.value.toLowerCase().replaceAll(" ", ""));
          }}
        />
        <div className="users row">
          {users.map((item, index) => {
            const finalName = `${item.name.title} ${item.name.first} ${item.name.last}`;
            return (
              <div className="col-2 user" key={`item-${index}`}>
                <img src={item.picture.thumbnail} alt={finalName} />
                <h3>{finalName}</h3>
              </div>
            );
          })}
          {undefined}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
