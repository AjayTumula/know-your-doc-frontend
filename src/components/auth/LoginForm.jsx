import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

export default function LoginForm() {
  const { login } = useAuth();
  const { notify } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      notify("Login successful", "success");
    } catch (err) {
      notify("Invalid credentials", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-96 space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <Input label="Email" value={email} onChange={setEmail} type="email" />
      <Input label="Password" value={password} onChange={setPassword} type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
