"use client";
import Link from 'next/link'; // Ensure you're importing Link from next/link
import Image from 'next/image';

export default function Footer() {
    return (
      <footer className="bg-orange-500 text-white px-4 py-6 mt-5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:space-x-8 text-base text-white text-center md:text-left">
          <a href="https://entuedu-my.sharepoint.com/:w:/r/personal/nurs0066_e_ntu_edu_sg/Documents/SC2006%20Documentation/Lab%201%20Deliverables/SC2006%20Sofware%20Requirements%20Specification.docx?d=wb75d9895b65b446f874f9158623b95d5&csf=1&web=1&e=ieXWUN" target="_blank" rel="noopener noreferrer" className="hover:text-white mb-2 md:mb-0">About Us</a>
          <a href="#" className="hover:text-white mb-2 md:mb-0">License</a>
          <a href="https://github.com/softwarelab3/2006-SCMA-U2" target="_blank" rel="noopener noreferrer" className="hover:text-white mb-2 md:mb-0">Github</a>
          {/* Add the link to your contact-us page here */}
          <Link href="/contact-us" className="hover:text-white">Contact Us</Link>
        </div>
      </div>
      <hr className="my-4 border-gray-700" />
      <div className="text-center text-white text-base">
        © 2025 Smart HDB Finder
      </div>
    </footer>
  );
}