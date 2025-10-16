# Weather Dashboard Styling

## Introduction

In this exercise you will create a weather dashboard using CSS to style different weather conditions, forecast cards, and alert messages. You will practice using selectors to target elements by ID, class, and tag name to create a visually appealing weather interface.

![Weather Dashboard](./weather-dashboard.png)

## Learning Goals

After completing this exercise you will be able to:

- Use CSS selectors (ID, class, tag name) to style weather components
- Apply different styles based on weather conditions (sunny, rainy, cloudy, etc.)
- Style card-based layouts
- Work with color schemes to represent different states
- Create alert/warning boxes
- Use descendant selectors to style nested elements
- Understand how to use classes to represent different states

## Step 1: Setup Your Project

1. Copy the starter code to a new folder (e.g., `weather-dashboard`)
2. Open the project in VSCode
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server

## Step 2: Create the HTML Structure

Open `index.html` and replace the content inside the `<body>` tag with the following (you **must keep the `<script>` tag**):

```html
<div id="weather-app">
  <h1>🌤️ Weather Dashboard</h1>
  
  <div id="current-weather">
    <h2>Current Weather in Vienna</h2>
    <div class="temperature">22°C</div>
    <div class="condition sunny">Sunny</div>
    <p class="details">Humidity: 65% | Wind: 12 km/h</p>
  </div>

  <div class="alert warning">
    <strong>Weather Alert:</strong> High UV index expected today. 
    Please wear sunscreen if going outside.
  </div>

  <h2>5-Day Forecast</h2>
  
  <div class="forecast-container">
    <div class="forecast-day sunny">
      <h3>Monday</h3>
      <div class="weather-icon">☀️</div>
      <div class="temp high">25°C</div>
      <div class="temp low">15°C</div>
    </div>

    <div class="forecast-day rainy">
      <h3>Tuesday</h3>
      <div class="weather-icon">🌧️</div>
      <div class="temp high">18°C</div>
      <div class="temp low">12°C</div>
    </div>

    <div class="forecast-day cloudy">
      <h3>Wednesday</h3>
      <div class="weather-icon">☁️</div>
      <div class="temp high">20°C</div>
      <div class="temp low">14°C</div>
    </div>

    <div class="forecast-day partly-cloudy">
      <h3>Thursday</h3>
      <div class="weather-icon">⛅</div>
      <div class="temp high">23°C</div>
      <div class="temp low">16°C</div>
    </div>

    <div class="forecast-day stormy">
      <h3>Friday</h3>
      <div class="weather-icon">⛈️</div>
      <div class="temp high">17°C</div>
      <div class="temp low">11°C</div>
    </div>
  </div>

  <h2>Weather Statistics</h2>
  
  <div class="stats-container">
    <div class="stat-card">
      <div class="stat-label">Average Temperature</div>
      <div class="stat-value hot">21°C</div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Rainfall This Week</div>
      <div class="stat-value">12mm</div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Wind Speed</div>
      <div class="stat-value">15 km/h</div>
    </div>
  </div>
</div>
```

## Step 3: Create the CSS File

1. Create a new file `src/styles.css`
2. Import it in your `src/index.ts`:

```typescript
import "./styles.css";
```

## Step 4: Basic Page Styling

Add the following CSS rules to `styles.css` one by one. Keep `npm start` running. It will automatically reload the page when you save the file.

### Style the body

```css
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #87ceeb, #e0f6ff);
  margin: 0;
  padding: 20px;
  min-height: 100vh;
}
```

This creates a nice sky-blue gradient background for our weather app.

**Experiment:** Try changing the gradient colors. Use `#1e3a8a` to `#3b82f6` for a darker blue theme, or `#fef3c7` to `#fbbf24` for a sunset theme.

### Style the main container

```css
#weather-app {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

**Note:** We use the **ID selector** `#weather-app` because there's only one main container. The `box-shadow` creates a subtle 3D effect.

### Style the main heading

```css
h1 {
  text-align: center;
  color: #1e40af;
  font-size: 2.5rem;
  margin-bottom: 30px;
}
```

### Style section headings

```css
h2 {
  color: #1e40af;
  font-size: 1.8rem;
  margin-top: 40px;
  margin-bottom: 20px;
  border-bottom: 3px solid #3b82f6;
  padding-bottom: 10px;
}
```

## Step 5: Style the Current Weather Section

Now let's style the current weather display using an **ID selector**:

```css
#current-weather {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 30px;
}

#current-weather h2 {
  margin-top: 0;
  color: white;
  border-bottom: none;
}
```

**Question:** Why do we use `#current-weather h2` instead of just `h2`? (Answer: This targets only `h2` elements inside `#current-weather`, so they can have different styles than other `h2` elements.)

### Style the temperature display

```css
.temperature {
  font-size: 4rem;
  font-weight: bold;
  margin: 20px 0;
}
```

### Style weather conditions

```css
.condition {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 25px;
  display: inline-block;
  margin: 10px 0;
}
```

**What is `display: inline-block`?** By default, elements like `<div>` are **block-level** (they take up the full width and start on a new line), while elements like `<span>` are **inline** (they flow with text and only take up as much width as needed). The `inline-block` value combines both behaviors: the element flows inline with text but can have width, height, padding, and margin like a block element. This is perfect for creating button-like elements or badges that should be centered but not take up the full width.

### Style the details text

```css
.details {
  font-size: 1.1rem;
  margin-top: 15px;
  opacity: 0.9;
}
```

**Note:** `opacity: 0.9` makes the text slightly transparent, creating a subtle visual hierarchy.

## Step 6: Style Different Weather Conditions

Now we'll use **class selectors** to style different weather conditions. This is perfect for classes because multiple elements can have the same weather condition:

```css
.sunny {
  background: #fbbf24;
  color: #78350f;
}

.rainy {
  background: #3b82f6;
  color: white;
}

.cloudy {
  background: #9ca3af;
  color: #1f2937;
}

.partly-cloudy {
  background: #60a5fa;
  color: white;
}

.stormy {
  background: #4b5563;
  color: white;
}
```

**Try it:** Add `class="snowy"` to one of the forecast days and create a CSS rule for `.snowy` with a light blue/white color scheme.

## Step 7: Style Alert Boxes

Weather alerts need to stand out! Let's style them:

```css
.alert {
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 5px solid;
}

.alert.warning {
  background: #fef3c7;
  border-left-color: #f59e0b;
  color: #78350f;
}
```

**Note:** `.alert.warning` (no space) means an element must have **both** classes. This is different from `.alert .warning` (with space) which would mean "elements with class `warning` inside elements with class `alert`".

**Try it:** Create a `.alert.severe` rule with a red color scheme (background: `#fee2e2`, border: `#dc2626`, color: `#7f1d1d`). Then change the HTML to use `class="alert severe"` and see the difference.

## Step 8: Style the Forecast Container

Let's arrange the forecast cards side by side:

```css
.forecast-container {
  margin-bottom: 30px;
  overflow: hidden;
}
```

**Note:** `overflow: hidden` is a technique to contain floated elements inside their parent container.

### Style individual forecast cards

```css
.forecast-day {
  width: 18%;
  float: left;
  margin-right: 2.5%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.forecast-day:last-child {
  margin-right: 0;
}

.forecast-day h3 {
  margin-top: 0;
  font-size: 1.2rem;
}
```

**What is `float: left`?** Float is a CSS property that pushes an element to the left (or right) and allows other content to wrap around it. When we float all cards left, they line up in a row. We use `width: 18%` so 5 cards fit nicely with spacing between them.

**What is `box-sizing: border-box`?** By default, padding and borders add to an element's width. With `box-sizing: border-box`, the padding and border are included in the width, making sizing more predictable.

**What is `:last-child`?** This is a **pseudo-class** that targets the last element among its siblings. We use it to remove the right margin from the last card so it doesn't create extra space.

### Style the weather icons

```css
.weather-icon {
  font-size: 3rem;
  margin: 15px 0;
}
```

### Style temperature displays in forecast cards

Here we use a **descendant selector** to target `.temp` elements only inside `.forecast-day`:

```css
.forecast-day .temp {
  font-size: 1.2rem;
  margin: 5px 0;
}

.forecast-day .temp.high {
  color: #dc2626;
  font-weight: bold;
}

.forecast-day .temp.low {
  color: #2563eb;
}
```

**Experiment:** Try changing the colors for high and low temperatures. What colors make sense for hot and cold?

## Step 9: Style Statistics Cards

```css
.stats-container {
  margin-bottom: 30px;
  overflow: hidden;
}

.stat-card {
  width: 30%;
  float: left;
  margin-right: 5%;
  background: #f3f4f6;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #e5e7eb;
  box-sizing: border-box;
}

.stat-card:last-child {
  margin-right: 0;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
}

.stat-value.hot {
  color: #dc2626;
}

.stat-value.cold {
  color: #2563eb;
}
```

**Note:** We use the same `float: left` technique here. With `width: 30%` and `margin-right: 5%`, three cards fit perfectly in a row (30% + 5% + 30% + 5% + 30% = 100%).

**Try it:** Add a `cold` class to one of the stat values in your HTML and see how it changes color.

## Step 10: Add Hover Effects

Make the forecast cards interactive:

```css
.forecast-day:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
```

**What happens?** When you hover over a forecast card, it lifts up slightly. The `transform` property moves it up 5 pixels, and the larger `box-shadow` creates a stronger shadow.

**Note:** `:hover` is a **pseudo-class** that applies styles when you move your mouse over an element.

**Experiment:** Try adding hover effects to `.stat-card` as well!

## Step 11: Add TypeScript Interaction (Optional Challenge)

If you want to make your dashboard interactive, add this to your `src/index.ts`:

```typescript
import "./styles.css";

// Select all forecast day cards
const forecastDays = document.querySelectorAll(".forecast-day");

forecastDays.forEach((day) => {
  const card = day as HTMLDivElement;
  
  card.addEventListener("click", () => {
    // Get the day name from the h3 inside this card
    const dayName = card.querySelector("h3");
    const condition = card.querySelector(".weather-icon");
    
    if (dayName && condition) {
      alert(`${dayName.textContent}: ${condition.textContent}`);
    }
  });
});

// Change current weather condition on button click
const currentWeather = document.querySelector("#current-weather");
const conditionElement = document.querySelector("#current-weather .condition");

if (currentWeather && conditionElement) {
  currentWeather.addEventListener("click", () => {
    // Cycle through different weather conditions
    const conditions = ["sunny", "rainy", "cloudy", "stormy"];
    const currentClass = conditionElement.className.split(" ").find(c => conditions.includes(c));
    const currentIndex = conditions.indexOf(currentClass || "sunny");
    const nextIndex = (currentIndex + 1) % conditions.length;
    const nextCondition = conditions[nextIndex];
    
    // Remove old condition class and add new one
    conditions.forEach(c => conditionElement.classList.remove(c));
    conditionElement.classList.add(nextCondition);
    conditionElement.textContent = nextCondition.charAt(0).toUpperCase() + nextCondition.slice(1);
  });
}
```

**What does this do?**
- Clicking a forecast card shows an alert with the day and weather
- Clicking the current weather cycles through different weather conditions (sunny → rainy → cloudy → stormy)

**Try it:** Click on the current weather section multiple times and watch the colors change!

## Tips for Success

1. **Save often** - Vite will auto-reload and show your changes immediately
2. **Use the browser inspector** - Right-click on any element and choose "Inspect" to see what styles are applied
3. **Experiment with colors** - Use [coolors.co](https://coolors.co/) to find nice color palettes
4. **Check on mobile** - Resize your browser window to see how it looks on different screen sizes
5. **Read error messages** - If something doesn't work, check the browser console for errors

Good luck and have fun creating your weather dashboard! 🌤️

