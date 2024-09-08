import React from 'react';

const News = () => {
  const allNewsItems = [
    {
      id: 1,
      title: 'Revolutionizing Agriculture: AI-Powered Farming Solutions',
      content:
        'Embracing the future of agriculture with AI-powered technologies to enhance crop monitoring, yield prediction, and resource optimization.',
    },
    {
      id: 2,
      title: 'Sustainable Farming Practices for a Greener Tomorrow',
      content:
        'Exploring eco-friendly farming methods, including organic farming, permaculture, and agroforestry, to promote sustainability and environmental conservation.',
    },
    {
      id: 3,
      title: 'Smart Farming: IoT and Automation in Agriculture',
      content:
        'Discover how Internet of Things (IoT) and automation are reshaping modern agriculture, enabling smart irrigation, precision farming, and efficient resource utilization.',
    },
    {
      id: 4,
      title: 'Vertical Farming: Growing Up for Sustainable Agriculture',
      content:
        'Exploring the benefits of vertical farming, a space-efficient and sustainable approach to agriculture in urban environments.',
    },
    {
      id: 5,
      title: 'Blockchain in Agriculture: Transforming the Supply Chain',
      content:
        'How blockchain technology is being used to enhance transparency, traceability, and efficiency in the agricultural supply chain.',
    },
    {
      id: 6,
      title: 'Hydroponics: Soilless Farming for Efficient Crop Production',
      content:
        'Understanding hydroponics, a soilless farming technique that uses nutrient-rich water solutions to grow crops efficiently.',
    },
  ];

  const latestNewsItems = allNewsItems.slice(0, 3);

  return (
    <div className="bg-gray-100 py-6">
      <div className="container mx-auto max w-[1100px]">
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNewsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={`https://source.unsplash.com/800x600/?farming,agriculture${item.id}`}
                  alt={item.title}
                  className="w-full h-40 object-cover object-center rounded-t-md"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-500">{item.title}</h3>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">All News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNewsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={`https://source.unsplash.com/800x600/?farming,agriculture${item.id}`}
                  alt={item.title}
                  className="w-full h-40 object-cover object-center rounded-t-md"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-500">{item.title}</h3>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default News;
