import { useEffect } from 'react';

const DESTINATION = 'https://proxaim.com/check';

/** This tool has moved into the Proxaim wrapper's audit flow. Redirect
    immediately rather than serving the old standalone generator. */
function App() {
  useEffect(() => {
    window.location.replace(DESTINATION);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      padding: 24,
    }}>
      <div>
        <p style={{ fontSize: 18, marginBottom: 12 }}>
          This tool has moved.
        </p>
        <p style={{ marginBottom: 20, color: '#555' }}>
          Redirecting you to the free AI-readiness check on Proxaim...
        </p>
        <a href={DESTINATION} style={{ color: '#1D9E75', fontWeight: 600 }}>
          Click here if you are not redirected
        </a>
      </div>
    </div>
  );
}

export default App;
