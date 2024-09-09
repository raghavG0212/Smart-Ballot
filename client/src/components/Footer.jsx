import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
} from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer
      container
      className="footer border-t-8 border-teal-500 dark:border-teal-600 bg-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="p-2 bg-gradient-to-r from-orange-500 via-white to-green-700 rounded-lg text-blue-900 italic font-semibold border-2 border-blue-950">
                <span className="mr-1 text-green-900">Voting</span>
                <span className="text-orange-600">System</span>
              </span>
              {/* <span>Voting System</span> */}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
            <div className="mt-2 sm:mt-0">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.eci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Election Commission Of India
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  // target="_blank"
                  rel="noopener noreferrer"
                >
                  Voting System
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-1">
            <Footer.Copyright
              href="#"
              by="Voting System"
              year={new Date().getFullYear()}
            />
          </div>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
