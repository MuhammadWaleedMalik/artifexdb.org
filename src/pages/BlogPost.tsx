import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { colors } from '../data/colors/theme';

const BlogPost: React.FC = () => {
  const { id } = useParams();

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: 1,
    title: 'The Future of Digital Transformation',
    content: `
      <p>Digital transformation has become more than just a buzzword—it's a fundamental shift in how businesses operate and deliver value to customers. As we move further into 2025, organizations that embrace digital transformation are not just surviving; they're thriving in an increasingly competitive landscape.</p>
      
      <h2>What is Digital Transformation?</h2>
      <p>Digital transformation is the integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It's also a cultural change that requires organizations to continually challenge the status quo, experiment, and get comfortable with failure.</p>
      
      <h2>Key Areas of Focus</h2>
      <p>Successful digital transformation initiatives typically focus on several key areas:</p>
      <ul>
        <li><strong>Customer Experience:</strong> Using technology to create seamless, personalized experiences across all touchpoints.</li>
        <li><strong>Operational Processes:</strong> Automating and optimizing business processes to improve efficiency and reduce costs.</li>
        <li><strong>Business Models:</strong> Leveraging technology to create new revenue streams and business opportunities.</li>
        <li><strong>Data and Analytics:</strong> Using data-driven insights to make better business decisions.</li>
      </ul>
      
      <h2>The Role of Cloud Technology</h2>
      <p>Cloud computing has emerged as a cornerstone of digital transformation. It provides the scalability, flexibility, and cost-effectiveness that organizations need to innovate quickly and respond to changing market conditions. From infrastructure-as-a-service (IaaS) to software-as-a-service (SaaS), cloud solutions enable businesses to focus on their core competencies while leveraging best-in-class technology.</p>
      
      <h2>Challenges and Solutions</h2>
      <p>While the benefits of digital transformation are clear, the journey is not without challenges. Common obstacles include:</p>
      <ul>
        <li>Resistance to change from employees</li>
        <li>Legacy system integration complexities</li>
        <li>Security and compliance concerns</li>
        <li>Skills gaps and talent shortages</li>
      </ul>
      
      <p>Successful organizations address these challenges through comprehensive change management programs, strategic partnerships with technology providers, and continuous investment in employee training and development.</p>
      
      <h2>Looking Ahead</h2>
      <p>The future of digital transformation will be shaped by emerging technologies such as artificial intelligence, machine learning, Internet of Things (IoT), and blockchain. Organizations that start preparing for these technologies today will be best positioned to capitalize on the opportunities they present.</p>
      
      <p>At Exactera, we help businesses navigate their digital transformation journey with tailored solutions that address their unique challenges and objectives. Our team of experts combines deep technical knowledge with strategic business acumen to deliver results that drive real value.</p>
    `,
    author: 'John Smith',
    date: '2025-01-15',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    readTime: '5 min read',
    tags: ['Digital Transformation', 'Technology', 'Business Strategy', 'Cloud Computing']
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: colors.backgroundLight }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center font-medium hover:opacity-80 transition-opacity"
            style={{ color: colors.primaryColor1 }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {blogPost.category}
                  </span>
                  <span className="text-sm opacity-90">{blogPost.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {blogPost.title}
                </h1>
                <div className="flex items-center space-x-6 text-sm opacity-90">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Article Actions */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <BookOpen size={20} style={{ color: colors.textSecondary }} />
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {blogPost.readTime}
                </span>
              </div>
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.primaryColor1, color: colors.primaryColor1 }}
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              style={{ color: colors.textSecondary }}
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>
                Tags:
              </h4>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                    style={{ color: colors.textSecondary }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={24} style={{ color: colors.textSecondary }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: colors.textPrimary }}>
                    {blogPost.author}
                  </h4>
                  <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                    Senior Technology Consultant at Exactera
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    John has over 10 years of experience helping businesses navigate digital transformation. 
                    He specializes in cloud architecture and enterprise software solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6" style={{ color: colors.textPrimary }}>
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <Link
                key={item}
                to={`/blog/${item + 1}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <img
                  src={`https://images.pexels.com/photos/${item === 1 ? '60504' : '270348'}/pexels-photo-${item === 1 ? '60504' : '270348'}.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop`}
                  alt="Related article"
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="font-semibold mb-2 group-hover:opacity-80" style={{ color: colors.textPrimary }}>
                    {item === 1 ? 'Best Practices for Cloud Security' : 'Building Scalable Web Applications'}
                  </h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {item === 1 
                      ? 'Essential security measures every organization should implement...'
                      : 'Key principles and technologies for creating web applications...'
                    }
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;