import NavBar from "./NavBar";

export default function Layout({ children }) {
  //children == app.js component , all component's action can show on children
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
