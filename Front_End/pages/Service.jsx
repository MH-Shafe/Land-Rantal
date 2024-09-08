import React from 'react';

const Service = () => {
  return (
    <section className="bg-gray-100 py-6" id="service">
      <div className="container mx-auto max-w-[1100px]">
        <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Farming Assistance Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <i className="fas fa-seedling text-4xl text-green-500 mb-4"></i>
            <div className="text-xl font-semibold mb-2">Farming Assistance</div>
            <div className="text-gray-700">
              <h5 className="text-lg font-semibold mb-2">Comprehensive Farming Support</h5>
              <p>
                Our farming assistance program provides comprehensive support for farmers, covering essential aspects of modern farming practices.
                <br />
                Duration: Tailored to fit your farming needs.
                <br />
                <b>Key Services:</b>
                <br />
                Crop Management, Soil Health Analysis, Pest Control, Sustainable Farming Practices, Harvest Planning, and more.
              </p>
            </div>
          </div>

          {/* Land Rental Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <i className="fas fa-map-marked-alt text-4xl text-green-500 mb-4"></i>
            <div className="text-xl font-semibold mb-2">Land Rental</div>
            <p className="text-gray-700">
              🌾 Explore Opportunities in Agriculture! 🚜 <br />
              🌱 Rent Land for Your Farming Projects <br /> 🌳 Wide Variety of Available Lands <br /> 📈 Flexible Rental Plans <br />
              🔒 Secure Transactions <br /> 🤝 Supportive Community <br />
              🌐 Connect with Us: <br /> <br />
              📞 01765454435 <br />
              📧 info@farmconnect.com <br />
              🌐 www.farmconnect.com <br /> <br />
              Cultivate Success with FarmConnect! 🌱
            </p>
          </div>

          {/* Agricultural Tech Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <i className="fas fa-cogs text-4xl text-green-500 mb-4"></i>
            <div className="text-xl font-semibold mb-2">Agricultural Technology</div>
            <p className="text-gray-700">
              🚀 Boost Your Farm's Efficiency with Technology! 🌐<br />
              🌱 Smart Irrigation Systems <br />📡 Precision Farming Solutions <br />🤖 Automated Crop Monitoring <br />
              🔧 Tech-driven Harvesting <br />💡 Innovation for Agricultural Success<br />
              🌐 Transform Your Farming Practices<br /><br /> Contact us: <br />
              📞 017624543545<br />
              📧 techsupport@farmconnect.com<br />
              🌐 www.farmconnecttech.com<br /><br />
              Embrace the Future of Farming! 🚜
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
