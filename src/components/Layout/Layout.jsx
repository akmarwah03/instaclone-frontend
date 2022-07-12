import BottomNav from "../UI/BottomNav";

const Layout = (props) => {
  return (
    <>
      {props.children}
      <BottomNav />
    </>
  );
};

export default Layout;
