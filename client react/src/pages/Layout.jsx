import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Teacher from "./Teacher";
import Student from "./Student";

const Layout = () => {
  const pwp = useLocation();
  const [path, setPath] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({ role: "teacher" });
  }, []);
  useEffect(() => {
    setPath(pwp);
  }, [path, pwp]);


  if (user.role == "teacher")
    return <Teacher />;
  if (user.role == "student")
    return <Student />;

  else return <div>Student</div>;
};

export default Layout;