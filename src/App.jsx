import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const breachedPasswords = [
    "123456",
    "password",
    "qwerty",
    "admin",
    "welcome",
    "password123",
    "abc123",
    "letmein",
    "iloveyou",
    "000000",
  ];

  const getStrength = (pwd) => {
    let score = 0;

    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 10;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

    return Math.min(score, 100);
  };

  const calculateEntropy = (pwd) => {
    if (!pwd) return 0;

    let charset = 0;

    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) charset += 32;

    return Math.round(
      pwd.length * Math.log2(charset || 1)
    );
  };

  const getCrackTime = (score) => {
    if (score < 25) return "2 seconds";
    if (score < 50) return "10 minutes";
    if (score < 75) return "3 days";
    if (score < 90) return "15 years";
    return "500+ years";
  };

  const weakRoasts = [
    "💀 A goldfish could crack this.",
    "😂 Hackers are already inside.",
    "🚪 This password leaves the door open.",
    "📖 Found in every hacker's textbook.",
    "☕ A sleepy hacker can crack this.",
    "🐢 Even a turtle can brute-force this.",
    "🎯 You've made the hacker's job easy.",
    "🫠 Security has left the chat.",
    "📢 This password announced itself publicly.",
    "🍪 Basically a free cookie for hackers."
  ];

  const mediumRoasts = [
    "😏 Not terrible, not great.",
    "🤔 You're trying, and it shows.",
    "⚠️ Still vulnerable to determined attackers.",
    "🔧 Needs a little more work.",
    "📈 Better than average.",
    "🕵️ Would slow down a beginner hacker.",
    "🎲 You're gambling with security.",
    "🧱 Missing a few bricks in the wall.",
    "🚧 Almost secure.",
    "💡 Good start."
  ];

  const strongRoasts = [
    "🔥 Nice. This would annoy hackers.",
    "🛡️ Strong password detected.",
    "🚀 Security level upgraded.",
    "👑 Hackers are looking elsewhere.",
    "🔒 This one's solid.",
    "⚔️ Ready for battle.",
    "🏰 That's a fortress.",
    "💪 Excellent password hygiene.",
    "🎖️ Approved by the cybersecurity council.",
    "🦾 Strong enough to make brute-force cry."
  ];

  const getRoast = (score) => {
    if (score < 40) {
      return weakRoasts[Math.floor(Math.random() * weakRoasts.length)];
    }

    if (score < 75) {
      return mediumRoasts[Math.floor(Math.random() * mediumRoasts.length)];
    }

    return strongRoasts[Math.floor(Math.random() * strongRoasts.length)];
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let result = "";

    for (let i = 0; i < 16; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(result);
  };

  const strength = getStrength(password);

  const getBarColor = () => {
    if (strength < 40) return "#ef4444";
    if (strength < 75) return "#f59e0b";
    return "#22c55e";
  };

  const isBreached = breachedPasswords.includes(
    password.toLowerCase()
  );

  return (
    <div className="container">
      <h1>🔥 Roast My Password</h1>

      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        className="generate-btn"
        onClick={generatePassword}
      >
        Generate Strong Password
      </button>

      {password && (
        <>
          <div className="requirements">
            <h3>Password Checklist</h3>

            <p>{password.length >= 12 ? "✅" : "❌"} 12+ Characters</p>

            <p>{/[A-Z]/.test(password) ? "✅" : "❌"} Uppercase Letter</p>

            <p>{/[a-z]/.test(password) ? "✅" : "❌"} Lowercase Letter</p>

            <p>{/[0-9]/.test(password) ? "✅" : "❌"} Number</p>

            <p>
              {/[^A-Za-z0-9]/.test(password)
                ? "✅"
                : "❌"}{" "}
              Special Character
            </p>
          </div>

          <div className="meter">
            <div
              className="fill"
              style={{
                width: `${strength}%`,
                background: getBarColor(),
              }}
            />
          </div>

          <h3>Strength: {strength}/100</h3>

          <div className="dashboard">
            <div className="card">
              <h4>Security Score</h4>
              <span>{strength}</span>
            </div>

            <div className="card">
              <h4>Crack Time</h4>
              <span>{getCrackTime(strength)}</span>
            </div>

            <div className="card">
              <h4>Entropy</h4>
              <span>{calculateEntropy(password)} bits</span>
            </div>
          </div>

          {isBreached && (
            <div className="breach-warning">
              🚨 WARNING
              <br />
              This password appears in a known breached-password list.
            </div>
          )}

          <div className="roast-card">
            {getRoast(strength)}
          </div>

          <div className="terminal">
            <p>{">"} Initializing attack...</p>

            {strength < 50 ? (
              <>
                <p>{">"} Trying password...</p>
                <p>{">"} Trying password123...</p>
                <p>{">"} Trying admin123...</p>
                <p className="danger">
                  ACCESS GRANTED
                </p>
              </>
            ) : (
              <>
                <p>{">"} Attempt Failed</p>
                <p>{">"} Attempt Failed</p>
                <p>{">"} Attempt Failed</p>
                <p className="safe">
                  ACCESS DENIED
                </p>
              </>
            )}
          </div>

          <button
            className="copy-btn"
            onClick={() => {
              navigator.clipboard.writeText(password);
              alert("Password Copied!");
            }}
          >
            📋 Copy Password
          </button>
        </>
      )}
    </div>
  );
}

export default App;