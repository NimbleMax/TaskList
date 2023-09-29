import React, { Fragment, useEffect, useState } from "react";
import EditOrganisation from "./EditOrganisations";

const ListOrganisations = () => {
  const [organisations, setOrganisations] = useState([]);

  // Get organisations
  const getOrganisations = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/organisations`
      );
      const jsonData = await response.json();
      setOrganisations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Delete organisations
  const deleteOrganisation = async (id) => {
    try {
      const deleteOrganisation = await fetch(
        `${process.env.REACT_APP_SERVERURL}/organisations/${id}`,
        {
          method: "DELETE",
        }
      );

      setOrganisations(
        organisations.filter((organisation) => organisation.id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOrganisations();
  }, []);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>?</td>
            <td>?</td>
          </tr> */}
          {organisations.map((organisation) => (
            <tr key={organisation.id}>
              <td>{organisation.OrganisationName}</td>
              <td>
                <EditOrganisation organisation={organisation} />
              </td>
              <td>
                <button
                  onClick={() => deleteOrganisation(organisation.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListOrganisations;
