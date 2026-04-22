const ClgAboutTab = ({ about }) => {
  if (!about || about.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No about information available.
      </div>
    );
  }

  const info = about.filter((item) => item.type === "INFO");
  const cards = about.filter((item) => item.type === "CARD");

  const API = import.meta.env.VITE_API_URL;

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">

      <div className="max-w-7xl mx-auto space-y-20">

        {/* INFO SECTION */}
        {info.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4"
          >

            {/* TITLE CARD */}
            <div className="bg-gray-50 rounded-lg px-5 py-3 inline-block">
              <h2 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h2>
            </div>

            {/* CONTENT CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

          </div>
        ))}

        {/* CARD SECTION */}
        {cards.length > 0 && (
          <div className="space-y-20">

            {cards.map((item, index) => {

              const reverse = index % 2 === 1;

              return (
                <div
                  key={item._id}
                  className={`flex flex-col md:flex-row items-stretch gap-10 min-h-[340px] ${
                    reverse ? "md:flex-row-reverse" : ""
                  }`}
                >

                  {/* IMAGE */}
                  {item.image && (
                    <div className="md:w-1/2 w-full">

                      <div className="h-full overflow-hidden rounded-xl shadow-md">

                        <img
                          src={`${API}/${item.image.path}`}
                          alt={item.title}
                          className="w-full h-[300px] md:h-full object-cover hover:scale-105 transition duration-500"
                        />

                      </div>

                    </div>
                  )}

                  {/* CONTENT SIDE */}
                  <div className="md:w-1/2 flex flex-col justify-start space-y-4 pt-2">

                    {/* TITLE CARD */}
                    <div className="bg-gray-50 rounded-lg px-5 py-3 inline-block shadow-sm">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    {/* DESCRIPTION CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
};

export default ClgAboutTab;