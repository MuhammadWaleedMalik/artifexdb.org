import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 25,
      tokens: 50, // Added tokens
      description: 'Essential features for individuals',
      buttonText: 'Get Started',
      buttonLink: '/basic',
    },
    {
      name: 'Pro',
      price: 50,
      tokens: 100, // Added tokens
      description: 'Advanced features for professionals',
      buttonText: 'Get Started',
      buttonLink: '/pro',
    },
    {
      name: 'Enterprise',
      price: 100,
      tokens: 200, // Added tokens
      description: 'Premium features for businesses',
      buttonText: 'Get Started',
      buttonLink: '/enterprise',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Pricing Plans</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Choose the perfect plan for your needs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className="bg-secondary rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            <p className="text-4xl font-extrabold text-white my-4">${plan.price}</p>
            <p className="text-lg text-white font-semibold mb-2">{plan.tokens} Tokens</p> {/* Display tokens */}
            <p className="text-text-secondary mb-6">{plan.description}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
