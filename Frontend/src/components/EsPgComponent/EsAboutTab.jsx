const EsAboutTab = ({ establishment }) => {

  const about = establishment?.about;

  if (!about)
    return (
      <div className="py-16 text-center text-gray-400 text-sm">
        No about information available.
      </div>
    );

  return (
    <div className="py-16 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto space-y-14">

        {/* HEADER */}
        <div className="text-center">

          <h1 className="text-3xl font-semibold text-gray-900">
            {about.title}
          </h1>

          {about.subtitle && (
            <p className="mt-3 text-gray-500">
              {about.subtitle}
            </p>
          )}

        </div>


        {/* DESCRIPTION */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

          <p className="text-gray-600 leading-relaxed text-center">
            {about.description}
          </p>

        </div>


        {/* MISSION + VISION */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Mission */}
          <div className="rounded-2xl p-7 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm">

            <h2 className="text-lg font-semibold text-indigo-800 mb-3">
              Our Mission
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed">
              {about.mission}
            </p>

          </div>


          {/* Vision */}
          <div className="rounded-2xl p-7 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm">

            <h2 className="text-lg font-semibold text-purple-800 mb-3">
              Our Vision
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed">
              {about.vision}
            </p>

          </div>

        </div>


        {/* HIGHLIGHTS */}
        {about.highlights?.length > 0 && (

          <div>

            <div className="text-center mb-8">

              <h2 className="text-xl font-semibold text-gray-900">
                Why Choose Us
              </h2>

              <p className="text-gray-500 text-sm">
                What makes us stand out
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {about.highlights.map((item, index) => (

                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >

                  <div className="flex items-center gap-4">

                    {/* NUMBER BADGE */}
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-500 text-white text-sm rounded-md">
                      {index + 1}
                    </div>

                    <p className="text-gray-700 text-sm">
                      {item}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default EsAboutTab;