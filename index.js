const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

const headlines = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Discover {name}: The Hidden Gem of {location}",
  "{name} - Setting the Standard for Excellence in {location}",
  "Customers Can't Stop Talking About {name} in {location}",
  "Explore Why Locals Love {name} in {location}",
];

function generateHeadline(name, location) {
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  return template.replace(/{name}/g, name).replace(/{location}/g, location);
}

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: "Missing name or location" });
  }

  const data = {
    rating: (Math.random() * 1 + 3.5).toFixed(1), 
    reviews: Math.floor(Math.random() * 500 + 50), 
    headline: generateHeadline(name, location),
  };

  res.json(data);
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: "Missing name or location" });
  }

  const headline = generateHeadline(name, location);
  res.json({ headline });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

