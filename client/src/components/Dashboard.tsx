"use client"
import React from "react"
import {
  Timer,
  MapPin,
  Leaf,
  Package,
  Bike,
  Car,
  AlertCircle,
  TrendingUp,
  Wind,
  Thermometer,
  Cloud,
  Droplets,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardProps {
  estimatedReliefTime: string
  currentLocation: string
  weatherData: {
    temp: string // Temperature in Fahrenheit (e.g., "72°F")
    condition: string // Weather condition (e.g., "Partly Cloudy")
    humidity: string // Humidity percentage (e.g., "65%")
    windSpeed: string // Wind speed in mph (e.g., "8 mph")
  }
  carbonSaved: number
}

export const Dashboard: React.FC<DashboardProps> = ({
  estimatedReliefTime,
  weatherData,
  currentLocation,
  carbonSaved,
}) => {
  const router = useRouter()
  console.log(weatherData)
  const actions = [
    {
      icon: Package,
      label: "Order Food",
      color: "text-orange-400",
      info: "15-20 min delivery",
      route: "/dashboard/quick-actions/order-food",
    },
    {
      icon: Bike,
      label: "Book Transport",
      color: "text-green-400",
      info: "3 bikes nearby",
      route: "/dashboard/quick-actions/book-transport",
    },
    {
      icon: Car,
      label: "Car Service",
      color: "text-blue-400",
      info: "Valet available",
      route: "/dashboard/quick-actions/car-service",
    },
    {
      icon: AlertCircle,
      label: "Emergency",
      color: "text-red-400",
      info: "SOS ready",
      route: "/dashboard/quick-actions/emergency",
    },
  ]

  const trafficTrends = [
    { time: "15m", level: 80 },
    { time: "30m", level: 60 },
    { time: "45m", level: 40 },
    { time: "60m", level: 30 },
  ]

  return (
    <>
      {/* Real-time Alert */}
      <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-8">
        <div className="flex items-center space-x-3">
          <TrendingUp className="text-purple-400" size={24} />
          <p className="text-purple-200">
            Traffic is expected to improve by 40% in the next 30 minutes
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Estimated Relief Time</h3>
            <Timer className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">{estimatedReliefTime}</p>
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="flex justify-between items-center">
              {trafficTrends.map((trend, index) => (
                <div key={trend.time} className="flex flex-col items-center">
                  <div className="h-20 w-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-400 w-full transition-all duration-500"
                      style={{ height: `${trend.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 mt-2">
                    {trend.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Available Services</h3>
            <MapPin className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">3</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Food Delivery</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Transport</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Emergency Services</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Carbon Impact</h3>
            <Leaf className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">{carbonSaved} Kg</p>
          <div className="mt-4">
            <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: "35%" }}
              />
            </div>
            <p className="text-sm text-green-400">Keep the good work up</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Weather Impact</h3>
            <Cloud className="text-purple-400" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Thermometer size={16} className="text-orange-400" />
              <span>{weatherData.temp}</span>
            </div>
            <div className="flex items-center justify-between">
              <Wind size={16} className="text-blue-400" />
              <span>{weatherData.windSpeed}</span>
            </div>
            <div className="flex items-center justify-between">
              <Droplets size={16} className="text-cyan-400" />
              <span>{weatherData.humidity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {actions.map(({ icon: Icon, label, color, info, route }) => (
              <button
                key={label}
                onClick={() => router.push(route)}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group relative"
              >
                <Icon
                  className={`${color} group-hover:scale-110 transition-transform`}
                  size={24}
                />
                <span className="mt-2 text-sm">{label}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-800 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {info}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Live Traffic Map</h3>
          <div className="relative">
            <div className="aspect-video rounded-lg bg-zinc-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Traffic Map"
                className="w-full h-full object-cover rounded-lg opacity-75"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-zinc-400">Current Route</p>
                  <p className="font-medium">Downtown → Uptown</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400">ETA</p>
                  <p className="font-medium text-purple-400">35 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            {
              time: "2m ago",
              event: "Route optimization suggested",
              type: "info",
            },
            {
              time: "15m ago",
              event: "Weather alert: Light rain expected",
              type: "warning",
            },
            {
              time: "1h ago",
              event: "Completed eco-friendly trip",
              type: "success",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 rounded-lg bg-zinc-800/50"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === "info"
                    ? "bg-blue-400"
                    : activity.type === "warning"
                    ? "bg-yellow-400"
                    : "bg-green-400"
                }`}
              />
              <span className="text-sm text-zinc-400">{activity.time}</span>
              <span className="text-sm">{activity.event}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
