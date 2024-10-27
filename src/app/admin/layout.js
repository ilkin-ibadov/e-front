import SideMenuComponent from "../../components/SideMenuComponent";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <SideMenuComponent />
      {children}
    </div>
  );
};

export default layout;
