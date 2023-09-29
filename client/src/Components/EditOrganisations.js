import React, { Fragment, useState } from "react";

const EditOrganisation = ({ organisation }) => {
  const [OrganisationName, setOrganisationName] = useState(
    organisation.OrganisationName
  );

  //Edit organisation name
  const updateOrganisationName = async (e) => {
    e.preventDefault();
    try {
      const body = { OrganisationName };
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/organisations/${organisation.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${organisation.id}`}
        onClick={() => setOrganisationName(organisation.OrganisationName)}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${organisation.id}`}
        onChange={(e) => setOrganisationName(e.target.value)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit organisation</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onChange={(e) => setOrganisationName(e.target.value)}
              ></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control"
                type="text"
                value={OrganisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onChange={(e) => setOrganisationName(e.target.value)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={(e) => updateOrganisationName(e)}
              >
                Edit organisation
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditOrganisation;
