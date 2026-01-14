import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const shouldShowPopup = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'client') {
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
    let isMouseLeft = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if ((e as any).clientY <= 0) {
        isMouseLeft = true;
        setShowPopup(true);
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    timeoutId = setTimeout(() => {
      if (!isMouseLeft && shouldShowPopup()) {
        setShowPopup(true);
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Local Schema Generator Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            I'm Found By AI, your AIO expert. This free local schema generator tool helps you check and improve your local business schema markup right now.
          </p>
          <a
            href="https://go.becomefoundbyai.com/get-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Expert Help with Your Schema
            <ArrowRight className="ml-2" size={20} />
          </a>
        </header>

        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Is a Local Schema Generator?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A local schema generator is a tool that helps your business show up better on Google. It makes special code that tells Google about your business. This code helps people find you when they search for local businesses like yours. Our local schema generator tool checks if your website has the right code and shows you how to make it better.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-2 shadow-xl">
            <div className="bg-white rounded-xl overflow-hidden">
              <iframe
                src="https://foundbyai-audit.streamlit.app/?embed=true"
                width="100%"
                height="850px"
                style={{ border: 'none' }}
                title="Local Schema Generator Tool"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use the Local Schema Generator Tool
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Step 1: Enter Your Website in the Local Schema Generator
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Type your website address in the box above. The local schema generator tool will look at your website and check your schema markup. This takes just a few seconds.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Step 2: Review Your Local Schema Generator Results
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The local schema generator will show you a score. This score tells you how good your local business schema is. A high score means Google can understand your business better. A low score means you need to fix some things.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Step 3: Fix Issues Found by the Local Schema Generator
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Look at what the local schema generator tells you to fix. It will show you what is missing or wrong. You can fix these things yourself or get help from our team. We make it easy to improve your local schema.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Step 4: Use the Local Schema Generator Again
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  After you fix the problems, come back and use the local schema generator tool again. Check if your score got better. Keep using this tool until you get a great score.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Use Our Local Schema Generator Tool?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Free Local Schema Generator
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our local schema generator is completely free to use. You can check your website as many times as you want. No credit card needed.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Easy to Use Local Schema Generator
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You don't need to be a tech expert. Our local schema generator tool is simple. Just put in your website and get results fast.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Accurate Local Schema Generator
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The local schema generator checks all the important parts of your schema. It finds problems that hurt your Google ranking.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Get Help with Your Local Schema Generator Results
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  If you need help fixing what the local schema generator finds, we can do it for you. Get expert support when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About the Local Schema Generator
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is a local schema generator?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A local schema generator is a tool that checks your website's special code. This code helps Google understand your local business. Our local schema generator shows you what to fix to rank better on Google.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Is the local schema generator tool free?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! Our local schema generator is 100% free. You can use it as many times as you want. We want to help all local businesses improve their online presence.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How does the local schema generator help my business?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The local schema generator finds problems with your schema markup. When you fix these problems, Google understands your business better. This helps more customers find you when they search for local services.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What if my local schema generator score is low?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Don't worry! A low score just means you have room to improve. The local schema generator shows you exactly what to fix. You can fix it yourself or we can help you. Many businesses start with low scores and improve quickly.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How often should I use the local schema generator?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the local schema generator whenever you change your website. Also check it every few months to make sure your schema is still good. The local schema generator helps you stay on top of your local SEO.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can you help me fix what the local schema generator finds?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! If the local schema generator shows problems you can't fix yourself, we can help. Our team of experts can fix your schema for you. Click the button below to get our toolkit and expert support.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Will the local schema generator work for any business?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! The local schema generator works for all kinds of local businesses. Restaurants, shops, doctors, lawyers, and any business that serves local customers can use this tool. The local schema generator checks the schema that matters most for local search.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Need Help Improving Your Local Schema?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              I'm here to help you get a perfect score on the local schema generator. Let me fix your schema or teach you how to do it yourself.
            </p>
            <a
              href="https://go.becomefoundbyai.com/get-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-600 px-10 py-5 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Get Your Free Toolkit Now
              <ArrowRight className="ml-2" size={24} />
            </a>
          </div>
        </section>

        <footer className="text-center py-8 text-gray-600">
          <p className="text-lg">
            © 2024 Found By AI - Your AIO Expert for Local Schema and More
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
