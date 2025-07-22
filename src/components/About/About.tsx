import React from 'react';
import { ArrowRight, Building2, Users2, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Expert management of commercial and residential properties across the UK',
    },
    {
      icon: Users2,
      title: 'Family Owned',
      description: 'Owned and controlled by the Freshwater family with decades of experience',
    },
    {
      icon: Award,
      title: 'Trusted Partners',
      description: 'Working with established investment groups including Daejan Holdings and Centremanor Group',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focused',
      description: 'Continuously expanding our portfolio while maintaining exceptional standards',
    },
  ];

  return (
    <>
      {/* WHO WE ARE Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              WHO WE ARE
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Highdorn Group is a property management group that manages both commercial and 
                residential properties in the UK. Highdorn is owned and controlled by the Freshwater family.
              </p>
              <p>
                Our portfolio of high quality commercial property is focused on office-led campuses 
                in Central London, retail across the UK and London urban logistics.
              </p>
            </div>
            <div className="mt-8">
              <button className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 font-semibold hover:bg-teal-700 transition-colors duration-200">
                About Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR PURPOSE Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern office building"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-teal-400 rounded-full opacity-30"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
                OUR
                <br />
                PURPOSE
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Almost all the properties Highdorn manages are owned by two property investment groups - 
                  Daejan Holdings and Centremanor Group that are also owned and controlled by the Freshwater family.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Colloquially these groups together are known as the Freshwater Group 
                  although this is not a legal entity.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-teal-600">
                  <ArrowRight className="w-5 h-5" />
                  <span className="font-semibold">Commercial Properties</span>
                </div>
                <div className="flex items-center gap-3 text-teal-600">
                  <ArrowRight className="w-5 h-5" />
                  <span className="font-semibold">Residential Management</span>
                </div>
                <div className="flex items-center gap-3 text-teal-600">
                  <ArrowRight className="w-5 h-5" />
                  <span className="font-semibold">Investment Services</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES Section */}
      <section className="py-24 bg-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              OUR SERVICES
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Highdorn employs most of the people in the Freshwater Group and supplies their services to 
              other groups and companies within the Freshwater Group.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="w-16 h-16 bg-teal-100 flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-teal-700" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Financial Reports</h3>
                <div className="flex items-center justify-center gap-2 text-teal-200 hover:text-white cursor-pointer transition-colors">
                  <span>Annual Reports and Accounts</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Investment Information</h3>
                <div className="flex items-center justify-center gap-2 text-teal-200 hover:text-white cursor-pointer transition-colors">
                  <span>Pension Schemes</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Corporate Information</h3>
                <div className="flex items-center justify-center gap-2 text-teal-200 hover:text-white cursor-pointer transition-colors">
                  <span>Management Team</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;