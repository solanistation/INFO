import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import { FaXTwitter } from "react-icons/fa6";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="border-t border-solid dark:border-white border-black dark:text-white text-black py-6 px-24">
      <div className="container mx-auto flex sm:flex-row flex-col gap-4 items-center justify-between">
        <div className="sm:flex hidden items-center gap-1">
          <Slide direction="down" duration={500} cascade>
            <h1 className="font-medium text-center flex gap-0 items-center">
              © 2025 Solanisation. All rights reserved.
            </h1>
          </Slide>
        </div>
        <div className="sm:hidden flex flex-col gap-1 items-center">
          <Slide direction="down" duration={500} delay={100} cascade>
            <div className="flex items-center gap-1">
              <h1 className="font-medium text-center flex gap-1 items-center">
                © 2025 Solanisation. All rights reserved.
              </h1>
            </div>
          </Slide>
        </div>
        <div className="flex items-center space-x-4">
          <Slide direction="down" cascade delay={100} duration={500}>
            <a
              href="https://github.com/Alstudd/Solanisation"
              target="_blank"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/solanisationgpt"
              target="_blank"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaXTwitter />
            </a>
          </Slide>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
