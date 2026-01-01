/**
 * Ad Content Module
 * Provides sample advertisement content to map onto 3D surfaces
 */

/**
 * Fisher-Yates shuffle algorithm
 * Shuffles array in place
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Ad content with associated emojis - structured as objects
export const adContent = [
  { text: "Buy Now - Limited Offer!", emoji: "🛍️" },
  { text: "Your Data = Our Product", emoji: "📊" },
  { text: "Consume More, Think Less", emoji: "🛒" },
  { text: "Targeted Just for You", emoji: "🎯" },
  { text: "Privacy Policy? No Problem", emoji: "📟" },
  { text: "Click Here for Happiness", emoji: "🎰" },
  { text: "You Need This Product", emoji: "💝" },
  { text: "Surveillance Capitalism", emoji: "📲" },
  { text: "Digital Identity for Sale", emoji: "👤" },
  { text: "Authentic Self™ Available", emoji: "✨" },
  { text: "Personal Data Harvesting", emoji: "📈" },
  { text: "Cookie Consent Bypass", emoji: "💽" },
  { text: "Algorithmic Manipulation", emoji: "⚙️" },
  { text: "Behavioral Modification", emoji: "🧠" },
  { text: "Attention Economy Services", emoji: "📺" },
  { text: "We Know What You Want", emoji: "🔮" },
  { text: "Instant Gratification Here", emoji: "🔋" },
  { text: "Track Everything, Sell All", emoji: "📍" },
  { text: "Monetize Your Emotions", emoji: "❤️" },
  { text: "Free* (*Terms Apply)", emoji: "🎁" },
  { text: "Personalized Exploitation", emoji: "👤" },
  { text: "Dopamine Directive", emoji: "📲" },
  { text: "Your Secrets = Our Profit", emoji: "🔐" },
  { text: "Addictive by Design", emoji: "🎮" },
  { text: "Manipulate to Purchase", emoji: "💸" },
  { text: "Ghost Profiles Included", emoji: "💽" },
  { text: "Biometric Data Mining", emoji: "🫀" },
  { text: "Psychological Targeting", emoji: "🧩" },
  { text: "Digital Twin Available", emoji: "👥" },
  { text: "Metadata = Gold Mine", emoji: "🎯" },
  { text: "Predictive Analytics", emoji: "🔮" },
  { text: "Sentiment Analysis Pro", emoji: "🎭" },
  { text: "Location Always Tracked", emoji: "🌍" },
  { text: "Micro-Transaction Heaven", emoji: "💰" },
  { text: "Permanent Subscription", emoji: "♾️" },
  { text: "Social Credit Score", emoji: "⭐" },
  { text: "Neural Pattern Match", emoji: "🧠" },
  { text: "Behavioral Surplus™", emoji: "💹" },
  { text: "Engagement Maximizer", emoji: "🎰" },
  { text: "Addiction Monetized", emoji: "💉" },
  { text: "Illegal Privacy", emoji: "🔓" },
  { text: "Surveillance as Service", emoji: "📹" },
  { text: "Human Futures Market", emoji: "📉" },
  { text: "Weaponized Persuasion", emoji: "🎪" },
  { text: "Digital Panopticon™", emoji: "🏛️" },
  // Corporate Jargon NLP
  { text: "Synergize Your Pain Points!", emoji: "💥" },
  { text: "Leverage Core Competencies®", emoji: "💼" },
  { text: "Behavioral Throughput Gains", emoji: "⚙️" },
  { text: "Deep Dive Into Value", emoji: "🏊" },
  { text: "Move the Needle Forward!", emoji: "📊" },
  { text: "Think Outside the Box™", emoji: "📦" },
  { text: "Consent Framework Upgrade", emoji: "🕹️" },
  { text: "Low-Hanging Fruit Available", emoji: "🍎" },
  { text: "Paradigm Shift® Available", emoji: "🌀" },
  { text: "Best Practices* for You", emoji: "✨" },
  { text: "Value-Added Solutions™", emoji: "➕" },
  { text: "Reciprocal Obligation Model", emoji: "♻️" },
  { text: "Ownership Integration!", emoji: "🏢" },
  { text: "Automated Decision Support", emoji: "🎛️" },
  { text: "Align to Our Vision™", emoji: "👁️" },
  { text: "Unpack the Opportunity!", emoji: "📦" },
  { text: "Drive Meaningful Impact®", emoji: "🌟" },
  { text: "Cognitive Load Management", emoji: "🎚️" },
  { text: "Strategic Alignment", emoji: "🧭" },
  { text: "Scale Your Portfolio!", emoji: "📈" },
  { text: "Choice Architecture System™", emoji: "🏗️" },
  { text: "Data-Driven Decisions", emoji: "📉" },
  { text: "Streamlined Compliance", emoji: "🧠" },
  { text: "Synergistic Simulacra®", emoji: "🔗" },
  { text: "Disrupt Your Limits™", emoji: "🏭" },
  { text: "Preference Optimization™", emoji: "🎛️" },
  { text: "Stakeholder Engagement®", emoji: "🏦" },
  { text: "Metrics That Matter Most", emoji: "💵" },
  { text: "Conversion Optimization!", emoji: "🔀" },
  { text: "Agile Methodology", emoji: "⚡" },
  { text: "Perpetual Access Model*", emoji: "🔑" },
  { text: "AI-Powered Insights", emoji: "🧠" },
  { text: "Distributed Ledger Trust", emoji: "⛓️" },
  { text: "Digital Asset Oversight™", emoji: "🏦" },
  { text: "Obedience Pipeline Solutions", emoji: "🏭" },
  { text: "Customer-Centric Success", emoji: "🎯" },
  { text: "Vertical Integration™", emoji: "🌐" },
  { text: "Frictionless Experience®", emoji: "🎬" },
  { text: "Total Engagement Platform!", emoji: "🌐" },
  { text: "Bleeding-Edge Extraction™", emoji: "🔪" },
  { text: "Exotic Arbitrage Inc.", emoji: "🎱" },
  { text: "Thought Leadership!", emoji: "🏦" },
  { text: "Behavioral Economics Suite™", emoji: "📚" },
  { text: "Mission-Critical Success", emoji: "🎰" },
  { text: "Closed Ecosystem Benefits®", emoji: "🏰" },
  { text: "Seamless Connectivity!", emoji: "🔗" },
  { text: "User Retention Framework™", emoji: "🔒" },
  { text: "Compliance Automation", emoji: "💳" },
  // Self-Improvement NLP
  { text: "Be Your Best Self™", emoji: "🏭" },
  { text: "Unlock Your Potential!", emoji: "🔓" },
  { text: "Live Your Truth", emoji: "📺" },
  { text: "Own Your Journey*", emoji: "📱" },
  { text: "Manifest Abundance!", emoji: "🪄" },
  { text: "Discover Your Worth®", emoji: "💳" },
  { text: "Hyperreal Estate", emoji: "🏡" },
  { text: "Invest In Your Future™", emoji: "💰" },
  { text: "Growth Mindset® Unlocked", emoji: "🧩" },
  { text: "Neoliberal Financialization", emoji: "💵" },
  { text: "Transform Your Life", emoji: "♻️" },
  { text: "Elevate Your Value™", emoji: "📈" },
  // Pharmaceutical & Supplement NLP
  { text: "Baseline Correction System", emoji: "⚖️" },
  { text: "Micronutrient Intervention", emoji: "🌿" },
  { text: "Chemistry Rebalancing®", emoji: "⚗️" },
  { text: "Prescription Lifestyle℞", emoji: "💊" },
  { text: "Deficiency Remediation", emoji: "🩺" },
  { text: "Chronic Treatment Plans*", emoji: "📋" },
  { text: "Enhanced Biomarkers†", emoji: "🔬" },
  { text: "Clinical Intervention", emoji: "🏥" },
  { text: "Pharmaceutical Grade Self", emoji: "💉" },
  { text: "Dosage Optimization℞", emoji: "🧪" },
  { text: "Preventative Capsules", emoji: "💊" },
  { text: "Proprietary Blend", emoji: "⚕️" },
];

// Color schemes for different ad types - enhanced for maximum text visibility
export const adColors = [
  { bg: "#ff4757", text: "#ffffff" }, // Red with white
  { bg: "#2f3542", text: "#00ff00" }, // Dark with bright green
  { bg: "#5352ed", text: "#ffff00" }, // Blue with bright yellow
  { bg: "#ff6b35", text: "#000000" }, // Orange with black
  { bg: "#00d2d3", text: "#ff0000" }, // Cyan with red
  { bg: "#ff9ff3", text: "#000000" }, // Pink with black
  { bg: "#54a0ff", text: "#ffff00" }, // Light Blue with yellow
  { bg: "#5f27cd", text: "#00ff00" }, // Purple with green
  { bg: "#ff3838", text: "#ffffff" }, // Bright Red with white
  { bg: "#1e272e", text: "#00ffff" }, // Darker Gray with cyan
  { bg: "#3742fa", text: "#ffff00" }, // Royal Blue with yellow
  { bg: "#ff9500", text: "#000000" }, // Amber with black
  { bg: "#2bcbba", text: "#ff0066" }, // Teal with hot pink
  { bg: "#ee5a6f", text: "#ffffff" }, // Rose with white
  { bg: "#0073e6", text: "#ffff00" }, // Classic Blue with yellow
  { bg: "#8b13d9", text: "#00ff00" }, // Violet with green
  { bg: "#c44569", text: "#ffffff" }, // Magenta with white
  { bg: "#40407a", text: "#00ffff" }, // Navy with cyan
  { bg: "#006266", text: "#ffff00" }, // Dark Teal with yellow
  { bg: "#f53b57", text: "#ffffff" }, // Coral with white
  { bg: "#3c40c6", text: "#00ff00" }, // Indigo with green
  { bg: "#05c46b", text: "#ffffff" }, // Green with white
  { bg: "#ffc048", text: "#000000" }, // Yellow with black
  { bg: "#ff5722", text: "#00ffff" }, // Deep Orange with cyan
];

// Shuffle both arrays once when module loads
shuffleArray(adContent);
shuffleArray(adColors);
