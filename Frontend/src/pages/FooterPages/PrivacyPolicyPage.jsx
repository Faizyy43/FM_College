import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center md:text-left">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 text-center md:text-left">
          Your privacy matters to us. This policy explains how we collect, use, and protect your information
          while using our platform.
        </p>

        {/* Sections */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            Information We Collect
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We may collect information such as your name, email address, browser type, and usage data
            to improve our services and provide a personalized experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Collected information helps us improve website functionality, deliver updates,
            and offer a better user experience. We never sell your data to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2 border-l-2 border-indigo-500 pl-3">
            Cookies
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Cookies are used to optimize website performance, analyze traffic, and enhance personalization.
            You can manage cookie preferences in your browser settings.
          </p>
        </section>

        <section className="mt-10 text-gray-500 text-xs md:text-sm border-t pt-4">
          <p>
            By using our platform, you consent to this Privacy Policy. Updates may occur occasionally,
            and changes will be posted here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
