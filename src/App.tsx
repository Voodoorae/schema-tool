import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import SchemaGenerator from './SchemaGenerator';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const isClient = params.get('status') === 'client';

  const shouldShowPopup = () => {
    if (isClient) {
      return false;
    }

    const closedAt = localStorage.getItem('popup_closed_at');
    if (closedAt) {
      const closedTime = parseInt(closedAt, 10);
      const now = Date.now();
      const twentyFourHoursMs = 24 * 60 * 60 * 1000;
      if (now - closedTime < twentyFourHoursMs) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (!shouldShowPopup()) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const showPopupAndCleanup = () => {
      setShowPopup(true);
      if (timeoutId) clearTimeout(timeoutId);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if ((e as any).clientY <= 0) {
        showPopupAndCleanup();
      }
    };

    timeoutId = setTimeout(() => {
      if (shouldShowPopup()) {
        showPopupAndCleanup();
      }
    }, 60000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const closePopup = () => {
    localStorage.setItem('popup_closed_at', Date.now().toString());
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-fade-in">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <CheckCircle className="text-blue-600" size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Don't Be Alarmed!
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                We can help you fix your local schema score. Get expert help or do it yourself with our toolkit.
              </p>
              <a
                href="https://go.becomefoundbyai.com/get-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Your Toolkit Now
                <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Local Schema Generator Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm Found By AI, your AIO expert. This free local schema generator tool helps you check and improve your local business schema markup right now.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What Is a Local Schema Generator?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A local schema generator is a tool that helps your business show up better on Google. It makes special code that tells Google about your business. This code helps people find you when they search for local businesses like yours. Our local schema generator tool checks if your website has the right code and shows you how to make it better.
            </p>
          </div>
        </section>

        <SchemaGenerator />

        <section className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Use the Local Schema Generator Tool
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Step 1: Enter Your Business Details in the Local Schema Generator
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Fill in the form above with your business name, address, type, phone number, and website. The local schema generator needs this information to create the right code for your business.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Step 2: Generate Code with the Local Schema Generator
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Click the blue button to generate your custom JSON-LD schema. The local schema generator will create special code that tells Google all about your business.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Step 3: Copy & Paste with the Local Schema Generator
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Use the copy button to grab the code from the local schema generator. This puts it on your computer ready to use.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Step 4: Add to Your Website from the Local Schema Generator
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Paste this code into the header of your website. The local schema generator code helps Google understand your business better, so more customers can find you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our Local Schema Generator Tool?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Free Local Schema Generator
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our local schema generator is completely free to use. You can check your website as many times as you want. No credit card needed.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Easy to Use Local Schema Generator
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You don't need to be a tech expert. Our local schema generator tool is simple. Just put in your website and get results fast.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Accurate Local Schema Generator
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The local schema generator checks all the important parts of your schema. It finds problems that hurt your Google ranking.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Help with Your Local Schema Generator Results
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  If you need help fixing what the local schema generator finds, we can do it for you. Get expert support when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About the Local Schema Generator
            </h2>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  What is a local schema generator?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A local schema generator is a tool that checks your website's special code. This code helps Google understand your local business. Our local schema generator shows you what to fix to rank better on Google.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Is the local schema generator tool free?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! Our local schema generator is 100% free. You can use it as many times as you want. We want to help all local businesses improve their online presence.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  How does the local schema generator help my business?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The local schema generator finds problems with your schema markup. When you fix these problems, Google understands your business better. This helps more customers find you when they search for local services.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  What if my local schema generator score is low?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Don't worry! A low score just means you have room to improve. The local schema generator shows you exactly what to fix. You can fix it yourself or we can help you. Many businesses start with low scores and improve quickly.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  How often should I use the local schema generator?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the local schema generator whenever you change your website. Also check it every few months to make sure your schema is still good. The local schema generator helps you stay on top of your local SEO.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Can you help me fix what the local schema generator finds?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! If the local schema generator shows problems you can't fix yourself, we can help. Our team of experts can fix your schema for you. Click the button below to get our toolkit and expert support.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Will the local schema generator work for any business?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! The local schema generator works for all kinds of local businesses. Restaurants, shops, doctors, lawyers, and any business that serves local customers can use this tool. The local schema generator checks the schema that matters most for local search.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center shadow-xl">
            {isClient ? (
              <>
                <h2 className="text-4xl font-bold text-white mb-3">
                  Need an Expert Review?
                </h2>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                  You have the toolkit, but want an expert to double-check your work? Let us tune up your schema.
                </p>
                <a
                  href="https://go.becomefoundbyai.com/tune-up-upgrade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Get a Schema Tune-Up
                  <ArrowRight className="ml-2" size={24} />
                </a>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-white mb-3">
                  Need Help Improving Your Local Schema?
                </h2>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                  I'm here to help you get a perfect score on the local schema generator. Get expert help fixing your schema or do it yourself with our complete toolkit.
                </p>
                <a
                  href="https://go.becomefoundbyai.com/get-toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Get Your Toolkit Now
                  <ArrowRight className="ml-2" size={24} />
                </a>
              </>
            )}
          </div>
        </section>

        <footer className="text-center py-6 text-gray-600">
          <p className="text-lg">
            © {new Date().getFullYear()} Found By AI - Your AIO Expert for Local Schema and More
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
