import React from "react";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export function NavBar() {
  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }
  return (
    <ul>
      <li>Home</li>
      <li onClick={onLogout}>Logout</li>

    </ul>
  )
}