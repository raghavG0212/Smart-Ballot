import React from "react";

const AboutPage = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        About Smart Ballot
      </h1>

      <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
      <p className="mb-4">
        At Smart Ballot, our mission is to revolutionize the democratic process
        by making voting more accessible, secure, and transparent. We believe in
        empowering every voter and ensuring their voice is heard in an efficient
        and modern way.
      </p>

      <h2 className="text-xl font-semibold mb-2">What We Do</h2>
      <p className="mb-4">
        Smart Ballot provides an innovative online voting system that allows
        users to vote in elections with ease and confidence. Our platform
        enables administrators to manage elections, add candidates, and view
        results in real-time, all through a secure and intuitive interface.
      </p>

      <h2 className="text-xl font-semibold mb-2">Our Values</h2>
      <p className="mb-4">
        <strong>Transparency:</strong> We maintain full transparency in our
        processes and technology, ensuring the integrity of every vote.
        <br />
        <strong>Security:</strong> Your data and votes are our top priority,
        with robust safeguards in place to prevent tampering and fraud.
        <br />
        <strong>Accessibility:</strong> We aim to make voting easy and
        accessible for everyone, no matter where they are.
      </p>

      <h2 className="text-xl font-semibold mb-2">Our Team</h2>
      <p className="mb-4">
        The Smart Ballot team is made up of professionals from the fields of
        technology, law, and public policy. Together, we work to create secure,
        user-friendly voting solutions that meet the challenges of today's
        democratic processes.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p>
        For more information, reach out to us at [Contact Information]. We are
        here to help and answer any questions you may have.
        <br />
        Thank you for choosing Smart Ballot as your trusted platform for online
        voting.
      </p>
    </div>
  );
};

export default AboutPage;
