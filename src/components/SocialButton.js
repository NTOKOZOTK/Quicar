const socialIcons = {
  twitter: "🐦",
  facebook: "📘",
  google: "🔍",
}

function SocialButton({ provider }) {
  return <button className="social-btn">{socialIcons[provider]}</button>
}

export default SocialButton
