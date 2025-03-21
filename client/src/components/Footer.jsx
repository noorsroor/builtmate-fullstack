import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo2.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLocationOutline, IoMailOutline, IoCallOutline } from "react-icons/io5";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#292929] text-[#E9E2D2] py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-white text-2xl font-semibold flex items-center">
              <img src={logo} className="h-10 mr-2" alt="Builtmate Logo" />
              {t("footer.brand")}
            </h2>
            <p className="text-sm mt-3">{t("footer.description")}</p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-[#E9E2D2] hover:text-[#E3A626]"><FaFacebookF size={20} /></a>
              <a href="#" className="text-[#E9E2D2] hover:text-[#E3A626]"><FaTwitter size={20} /></a>
              <a href="#" className="text-[#E9E2D2] hover:text-[#E3A626]"><FaInstagram size={20} /></a>
              <a href="#" className="text-[#E9E2D2] hover:text-[#E3A626]"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold border-b-2 border-[#E3A626] pb-1 inline-block">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li><Link to="/" className="hover:text-[#E3A626]">› {t("footer.home")}</Link></li>
              <li><Link to="/about" className="hover:text-[#E3A626]">› {t("footer.about")}</Link></li>
              <li><Link to="/professionals" className="hover:text-[#E3A626]">› {t("footer.professionals")}</Link></li>
              <li><Link to="/contact" className="hover:text-[#E3A626]">› {t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-white text-lg font-semibold border-b-2 border-[#E3A626] pb-1 inline-block">
              {t("footer.explore")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li><Link to="/ideas" className="hover:text-[#E3A626]">› {t("footer.ideas")}</Link></li>
              <li><Link to="/stores" className="hover:text-[#E3A626]">› {t("footer.stores")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold border-b-2 border-[#E3A626] pb-1 inline-block">
              {t("footer.contact")}
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center space-x-2">
                <IoLocationOutline className="text-[#E3A626]" />
                <span>{t("footer.location")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <IoMailOutline className="text-[#E3A626]" />
                <span>{t("footer.email")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <IoCallOutline className="text-[#E3A626]" />
                <span>{t("footer.phone")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#E3A626] text-center text-sm mt-6 pt-4">
          © 2025 {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
