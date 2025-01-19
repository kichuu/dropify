"use client";

const AboutPage = () => {
  const steps = [
    {
      title: "Real-time Traffic Updates",
      icon: "📍",
      description: "Stay updated with live traffic data around you.",
    },
    {
      title: "Smart Routing",
      icon: "🛣️",
      description: "Get optimized routes to save time and fuel.",
    },
    {
      title: "Eco-friendly Options",
      icon: "🌱",
      description: "Reduce carbon footprint with smart commuting options.",
    },
  ];

  const techs = [
    {
      name: "Next.js",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQeIMI-KwOSXZIyaDYvxHmZsYV6JsWysJVZw&s",
    },
    {
      name: "Tailwind CSS",
      icon: "data:image/jpeg;base64,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",
    },
    {
      name: "Node.js",
      icon: "data:image/png;base64,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",
    },
    {
      name: "MongoDB",
      icon: "data:image/jpeg;base64,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",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-500/10 via-blue-600/10 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            About TrafficRelief
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Revolutionizing urban mobility with cutting-edge technology,
            real-time traffic updates, and eco-friendly commuting solutions.
          </p>

          <p className="text-lg text-zinc-400 max-w-3xl mx-auto mt-5">
            TrafficRelief is a dashboard designed to help manage and alleviate
            traffic congestion in urban areas by providing real-time data,
            optimized routing, and eco-friendly commuting options. With
            cutting-edge technology, it aims to improve daily commutes and
            reduce traffic-related environmental impacts.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Technologies We Use
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {techs.map((tech, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 object-contain"
                />
                <p className="text-zinc-400">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-zinc-800 text-center">
        <p className="text-zinc-400">
          © 2024 TrafficRelief. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
