import React from "react";

const TermsPage = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center md:text-left">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 text-center md:text-left">
          By using this website, you agree to comply with our Terms & Conditions. 
          Please read them carefully as they govern your access and use of our platform.
        </p>

        {/* Use of Website */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            Use of Website
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            The content on this website is intended for informational purposes only. Users are responsible for verifying
            college details, course offerings, and fees before making any decisions.
          </p>
        </section>

        {/* Limitations */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            Limitations
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            While we strive for accuracy, we do not guarantee the completeness, reliability, or availability of the
            information displayed on this platform. Use it at your own discretion.
          </p>
        </section>

        {/* Updates and Changes */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            Updates and Changes
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We reserve the right to update or modify these terms at any time. Any changes will be effective immediately
            upon posting. Users are encouraged to review this page periodically.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            User Responsibilities
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Users must respect copyright, privacy, and intellectual property rights of the content on this platform. 
            Any misuse, reproduction, or redistribution without permission is strictly prohibited.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We shall not be liable for any direct, indirect, or incidental damages resulting from the use of this
            website. Users acknowledge that all information is provided “as is” without warranties.
          </p>
        </section>

        {/* Footer Note */}
        <section className="mt-10 text-gray-500 text-xs md:text-sm border-t pt-4">
          <p>
            By continuing to use this platform, you agree to these Terms & Conditions. 
            For any concerns or clarifications, please contact us directly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
