import React, { useState } from "react";
import Form from "../../components/form/form";

export default function Login({ login }) {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Form
      type="Login"
      username={username}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
