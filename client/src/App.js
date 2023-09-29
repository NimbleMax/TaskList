import React, { Fragment, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

// Components
import Auth from "./Components/Auth";
// import InputOrganisation from "./Components/InputOrganisation";
// import ListOrganisations from "./Components/ListOrganisations";
import ListHeader from "./Components/ListHeader";
import ListItem from "./Components/ListItem";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const authToken = cookies.AuthToken;
  const userId = cookies.UserId;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/tasks/${userId}`
      );
      const json = await response.json();
      console.log(json);
      setTasks(json);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  //sort tasks by date
  tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Fragment>
      <div className="app">
        {!authToken && <Auth />}
        {authToken && (
          <>
            <ListHeader listName={`✅ Organisation tasks`} getData={getData} />
            {tasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </>
        )}
      </div>
      {/* <div className="container">
        { <InputOrganisation />
        <ListOrganisations /> }
      </div>  */}
    </Fragment>
  );
};

export default App;
