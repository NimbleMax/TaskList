import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError(`Make sure passwords match`);
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/auth/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      console.log(data);
    } else {
      setCookie(`UserId`, data.id);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form className="d-flex gap-3 flex-column">
          <h2>{isLogin ? `Please log in` : `Please sign up`}</h2>
          <input
            type="email"
            placeholder="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            className="btn btn-link"
            onClick={() => viewLogin(false)}
            disabled={!isLogin ? true : false}
          >
            Sign up
          </button>
          <button
            className="btn btn-link"
            onClick={() => viewLogin(true)}
            disabled={isLogin ? true : false}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
