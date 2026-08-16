// Home page for AgroVision

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* AgroVision logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="AgroVision Logo"
                className="w-12 h-12 rounded-full object-cover"
              />

              <h1 className="text-2xl font-bold text-green-700 tracking-tight">
                AgroVision
              </h1>
            </div>
          </div>
          {/* Navigation links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition hover:text-green-600"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-gray-600 transition hover:text-green-600"
            >
              About
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition hover:text-green-600"
            >
              How It Works
            </a>
          </div>

          {/* Login and signup buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* Hero content */}
          <div>
            {/* Small heading */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              🌾 AI-Powered Smart Agriculture
            </div>

            {/* Main heading */}
            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
              Grow Smarter.
              <span className="block text-green-600">Harvest Better.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              AgroVision uses machine learning and agricultural data to help
              farmers make smarter decisions, predict crop yields, and improve
              farm productivity.
            </p>

            {/* Hero buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
              >
                Start Predicting →
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:border-green-500 hover:text-green-600"
              >
                Learn More
              </a>
            </div>

            {/* Platform statistics */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-gray-200 pt-8">
              <div>
                <p className="text-2xl font-bold text-gray-900">AI</p>

                <p className="text-sm text-gray-500">Powered Predictions</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">19K+</p>

                <p className="text-sm text-gray-500">Agricultural Records</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">96.5%</p>

                <p className="text-sm text-gray-500">Model R² Score</p>
              </div>
            </div>
          </div>

          {/* Hero prediction preview */}
          <div className="relative">
            {/* Main prediction card */}
            <div className="overflow-hidden rounded-3xl bg-green-700 p-8 shadow-2xl">
              <div className="rounded-2xl bg-white p-6">
                {/* Prediction header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Crop Yield Prediction
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      Rice
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                    🌾
                  </div>
                </div>

                {/* Prediction value */}
                <div className="mt-8 rounded-xl bg-green-50 p-5">
                  <p className="text-sm text-gray-500">Predicted Yield</p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-bold text-green-700">
                      2.35
                    </span>

                    <span className="mb-1 text-sm text-gray-500">units</span>
                  </div>
                </div>

                {/* Prediction chart */}
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
                    <span>Historical</span>
                    <span>Prediction</span>
                  </div>

                  <div className="flex h-32 items-end gap-3">
                    <div className="h-12 flex-1 rounded-t-md bg-green-200"></div>

                    <div className="h-20 flex-1 rounded-t-md bg-green-300"></div>

                    <div className="h-16 flex-1 rounded-t-md bg-green-400"></div>

                    <div className="h-24 flex-1 rounded-t-md bg-green-500"></div>

                    <div className="h-28 flex-1 rounded-t-md bg-green-600"></div>

                    <div className="h-32 flex-1 rounded-t-md bg-green-700"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accuracy card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  📈
                </div>

                <div>
                  <p className="text-xs text-gray-500">Model Performance</p>

                  <p className="font-bold text-green-600">R² 96.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-green-600">POWERFUL FEATURES</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need for smarter farming
            </h2>

            <p className="mt-4 text-gray-600">
              AgroVision combines agricultural data with machine learning to
              provide useful insights for better farming decisions.
            </p>
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Crop prediction */}
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                🤖
              </div>

              <h3 className="mt-5 text-xl font-bold">AI Crop Prediction</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Predict expected crop yield using agricultural, environmental,
                and historical data.
              </p>
            </div>

            {/* Data insights */}
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                📊
              </div>

              <h3 className="mt-5 text-xl font-bold">Data Insights</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Explore agricultural data and understand how factors such as
                rainfall, temperature, and crop type affect yield.
              </p>
            </div>

            {/* Farm management */}
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                🌱
              </div>

              <h3 className="mt-5 text-xl font-bold">Farm Management</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Keep your farms organized and access important agricultural
                information from one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How AgroVision works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section heading */}
          <div className="text-center">
            <p className="font-semibold text-green-600">HOW IT WORKS</p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Make better decisions in three steps
            </h2>
          </div>

          {/* Steps */}
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold">Enter Farm Data</h3>

              <p className="mt-3 text-gray-600">
                Provide information about your crop, location, area, rainfall,
                fertilizer, pesticide, and temperature.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold">AI Analyzes Data</h3>

              <p className="mt-3 text-gray-600">
                Our machine learning model analyzes the provided agricultural
                data and identifies patterns from historical data.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold">Get Your Prediction</h3>

              <p className="mt-3 text-gray-600">
                Receive an estimated crop yield to help you make more informed
                agricultural decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / CTA section */}
      <section id="about" className="bg-green-700 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to make your farming smarter?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-green-100">
            Join AgroVision and use data-driven insights to understand your
            crops and improve your farming decisions.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-green-700 shadow-lg transition hover:bg-green-50"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-8 text-gray-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          {/* Footer logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>

            <span className="font-semibold text-white">AgroVision</span>
          </div>

          {/* Footer description */}
          <p className="text-sm">
            AI-powered agriculture for a smarter future.
          </p>

          {/* Copyright */}
          <p className="text-sm">© 2026 AgroVision</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
