import { ROUTES } from "@/routes";
import logo from "@/assets/images/frontend_assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footerWrapper bg-[#d3d3d318] relative lg:pt-[100px] pt-5 lg:pb-[100px] pb-4">
        <div className="container mx-auto px-[14px] max-w-[1320px]">
          <div className="flex items-center lg:justify-between justify-center flex-wrap lg:gap-0 gap-10">
            <div className="flex-1">
              <div className="footerLogo mb-4">
                <Link to={ROUTES.base}>
                  <img src={logo} alt="Reload Page" className="w-[180px]" />
                </Link>
              </div>
              <div className="text_wrap max-w-[500px] w-full">
                <p className="text-black font-[400] text-[14px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium quibusdam ut a sapiente molestias porro quidem
                  corporis voluptatem iusto quae molestiae adipisci aperiam eius
                  ullam ea, consequatur libero laboriosam facere? Consequatur
                  eligendi nam autem quas reprehenderit aliquam iusto beatae
                  libero.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between flex-wrap max-w-[500px] w-full lg:gap-0 gap-10">
              <div>
                <h5 className="text-black lg:text-[25px] text-[15px] uppercase mb-3">
                  company
                </h5>
                <ul>
                  <li className="mb-2">
                    <Link
                      className="text-black font-[400] capitalize hover:opacity-[.6]"
                      to={ROUTES.base}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-black font-[400] capitalize hover:opacity-[.6]"
                      to={ROUTES.base}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-black font-[400] capitalize hover:opacity-[.6]"
                      to={ROUTES.base}
                    >
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black font-[400] capitalize hover:opacity-[.6]"
                      to={ROUTES.base}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-black lg:text-[25px] text-[15px] uppercase mb-3">
                  Get in touch
                </h5>
                <ul>
                  <li className="mb-2">
                    <Link
                      className="text-black font-[400] capitalize hover:opacity-[.6]"
                      to={ROUTES.base}
                    >
                      +1-212-456-7890
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link className="text-black font-[400] hover:opacity-[.6]" to={ROUTES.base}>
                      contact@foreveryou.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
