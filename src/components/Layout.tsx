import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="container max-w-[1320px] w-full px-[14px] mx-auto">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
