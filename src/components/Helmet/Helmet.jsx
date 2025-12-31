import { useEffect } from "react";

const Helmet = ({ title, children }) => {
  useEffect(() => {
    document.title = `My Pizza - ${title}`;
  }, [title]);

  return <div className="w-100">{children}</div>;
};

export default Helmet;
