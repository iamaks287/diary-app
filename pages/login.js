import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import Link from "next/link";
const login = () => {
  const { token, setToken, setUsername } = useAuth();

  // console.log(token)

  useEffect(() => {
    if (token) Router.replace("/");
  });

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function Login() {
    // console.log("login");
    axios
      .post("https://diary-app-ash.herokuapp.com/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        // console.log(res.data);
        const {user,accessToken}=res.data;
        setToken(accessToken);
        setUsername(user.name);
      })
      .catch(function (err) {
        console.log(err)
      });
  }

  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={login}>
          Login
        </button>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
};

export default Login;
