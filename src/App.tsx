import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import SchemaGenerator from './SchemaGenerator';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const isClient = params.get('status') === 'client';

  // Check if the user is a client or has closed the popup in the last 24 hours
  const shouldHidePermanently = () => {
    if (isClient) return true; 
    
    const closedAt = localStorage.getItem('popup_closed_at');
    if (closedAt) {
      const closedTime = parseInt(closedAt, 10);
      const now = Date.now();
      const twentyFourHoursMs = 24 * 60 * 60 * 1000;
      return (now - closedTime < twentyFourHoursMs);
    }
    return false;
  };

  useEffect(() => {
    // If they shouldn't see it, don't even add the event listener
    if (shouldHidePermanently()) return;

    const handleExitIntent = (e: MouseEvent) => {
      // Specifically trigger when mouse leaves the top of the viewport (heading for tabs/close)
      if (e.clientY <= 0) {
        setShowPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleExitIntent);

    return () => {
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, []);

  const closePopup = () => {
    localStorage.setItem('popup_closed_at', Date.now().toString());
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* EXIT INTENT POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
              aria-label="Close"
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
                Wait! Is Your Schema Enough?
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Code is only half the battle. If AI agents can't "read" your site, you won't be found. Run a free AIO audit in 60 seconds.
              </p>
              <a
                href="https://foundbyai-audit.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Run Free AI Audit
                <ArrowRight className="ml-2" size={20} />
              </a>
              <button 
                onClick={closePopup}
                className="mt-4 text-sm text-gray-400 hover:underline"
              >
                No thanks, I'll take my chances
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Local Schema Generator Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop guessing if Google sees you. Use our AIO-optimized generator to ensure your local business is "Machine Readable."
          </p>
        </header>

        <SchemaGenerator />

        {/* FAQ & Support Sections (Simplified for brevity, keep your existing text here) */}
        <section className="mt-12 mb-8">
           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center shadow-xl">
            {isClient ? (
              <>
                <h2 className="text-4xl font-bold text-white mb-3">Need an Expert Review?</h2>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                  Your toolkit is powerful, but a "Tune-Up" ensures total AI visibility.
                </p>
                <a href="https://go.becomefoundbyai.com/tune-up-upgrade" className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg text-lg">
                  Get a Schema Tune-Up <ArrowRight className="ml-2" size={24} />
                </a>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-white mb-3">Does AI Actually See Your Business?</h2>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                  Run a free AI audit to see your visibility score across ChatGPT, Gemini, and Perplexity.
                </p>
                <a href="https://foundbyai-audit.streamlit.app/" className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg text-lg">
                  Run Free Audit Now <ArrowRight className="ml-2" size={24} />
                </a>
              </>
            )}
          </div>
        </section>

        <footer className="text-center py-6 text-gray-600">
          <p>© {new Date().getFullYear()} Become Found By AI — AIO & AI Visibility Specialists</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
