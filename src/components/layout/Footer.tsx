
import { CheckCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-brand-blue" />
              <span className="text-lg font-bold">VoteHub</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              The modern platform for online polling
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-6 mb-4">
              <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                Contact
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © {currentYear} VoteHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
