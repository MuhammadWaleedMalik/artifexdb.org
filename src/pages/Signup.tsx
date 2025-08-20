import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useRegister from '../hooks/useRegister';
import { motion } from 'framer-motion';

const SignUp = () => {
  const { register, isloading } = useRegister();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setFormError('');
    setError('');

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      const response = await register(email, password);
      if (response) {
        alert('Signed up successfully!');
        navigate('/');
      } else {
        setFormError('Email already exists or an internal error occurred. Try again later.');
      }
    } catch (err:any) {
      setFormError(err.message || 'Failed to create an account');
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-10 rounded-2xl border border-[#7A9908] shadow-lg"
      >
        <h2 className="text-center text-3xl font-bold text-[#7A9908] mb-6">Sign Up</h2>

        {(formError || error) && (
          <div className="bg-red-500/50 text-[#7A9908] px-4 py-3 rounded-lg mb-4">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-[#7A9908] rounded-lg bg-transparent text-[#7A9908] placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7A9908]"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-[#7A9908] rounded-lg bg-transparent text-[#7A9908] placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7A9908]"
            required
          />

          <button
            type="submit"
            disabled={isloading}
            className="w-full p-3 bg-[#7A9908] text-white font-semibold rounded-lg hover:bg-[#5d7706] transition-all duration-300"
          >
            {isloading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                Creating Account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-sm text-black text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#7A9908] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
