## Trade_hub: A High-Performance Cryptocurrency Exchange

**Description:**

Trade_hub is a cutting-edge cryptocurrency exchange platform designed to provide a seamless and efficient trading experience. Built on a robust backend architecture and a responsive Next.js frontend, Trade_hub offers real-time market data, low-latency order execution, and a user-friendly interface.

**Key Features:**

* **Real-time Market Data:** Access up-to-the-minute market prices, order books, and trade history.
* **Low-Latency Trading:** Execute trades with minimal delay for optimal performance.
* **Advanced Charting:** Utilize advanced charting tools to analyze market trends and make informed decisions.
* **Secure Wallet:** Protect your digital assets with a secure and reliable wallet solution.
* **Multiple Trading Pairs:** Trade a wide variety of cryptocurrency pairs.

**Technical Architecture:**

The Trade_hub platform employs a sophisticated architecture that leverages:

* **Next.js Frontend:** A modern JavaScript framework for building fast and scalable web applications.
* **WebSocket Connections:** Real-time communication between the frontend and backend for instant updates.
* **Backend Services:** A complex backend infrastructure consisting of:
    * **API Gateway:** Handles incoming requests and routes them to the appropriate services.
    * **Engine:** Processes trade orders, updates market data, and triggers events.
    * **Database:** Stores historical market data, trade records, and user information.
    * **Redis:** Used for caching, pub-sub messaging, and queueing.
    * **Time Series Database:** Stores time-series data for market charts and analysis.

This architecture ensures high performance, scalability, and reliability by distributing workloads across multiple components and utilizing efficient data storage and communication mechanisms.

**Installation and Usage:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/samrudh3125/Trade_Hub.git
   ```

2. **Install dependencies:**

   Could implement Turborepo but didn't do it. So must go to each folder and run
   ```bash
   npm install
   ```

4. **Start the development server:**
  Run all the folders along with the frontend
   ```bash
   npm run dev
   ```

   You can access the application at http://localhost:3000 by default.

**Known Issues:**

There are currently some unresolved issues related to the connection between the engine and other components. These issues are being actively investigated and addressed.

**Future Enhancements:**

* **Additional Features:** Must add the dashboard and the markets page.
* **Mobile App:** Can also make a mobile app.
* **Security Enhancements:** Implement advanced security measures to protect user funds and data.
