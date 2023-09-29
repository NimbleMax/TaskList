import React, { Fragment, useState } from "react";

const InputOrganisation = () => {
  const [OrganisationName, setOrganisationName] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { OrganisationName };
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/organisations`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
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
      <h1 className="text-center mt-5">Organisations</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={OrganisationName}
          onChange={(e) => setOrganisationName(e.target.value)}
        />
        <button className="btn btn-success w-50">Add organisation</button>
      </form>
    </Fragment>
  );
};

export default InputOrganisation;
