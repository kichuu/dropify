"use client"
import React, { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import dynamic from "next/dynamic"
import routes from "@/lib/api/routes"

// Dynamically import the necessary components from react-leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
})

export default function Deliveries() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09])
  const [activeOrders, setActiveOrders] = useState<any[]>([])
  const [pastOrders, setPastOrders] = useState<any[]>([])

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active orders
        const activeOrdersData = await routes.orders.getAll()
        let activeOrders = activeOrdersData.filter(
          (order) => order.orderStatus === "pending"
        )
        setActiveOrders(activeOrders)

        // Fetch past orders

        const pastOrdersData = activeOrdersData.filter(
          (order) => order.orderStatus === "delivered"
        )
        setPastOrders(pastOrdersData)
        console.log("pastOrdersData", pastOrdersData)
        // Fetch map center
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* Active Orders Section */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold mb-6">Active Orders</h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div
                  key={order._id} // Use _id as the key
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      {/* Optionally display an icon or image here */}
                    </div>
                    <div>
                      <h3 className="font-medium">{order.items.join(", ")}</h3>{" "}
                      {/* Display order items */}
                     
                      {/* Display userId */}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(
                        order.estimatedDeliveryTime
                      ).toLocaleTimeString()}{" "}
                      {/* Format ETA */}
                    </p>
                    <p className="text-sm text-zinc-400">{order.orderStatus}</p>{" "}
                    {/* Display order status */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-xl font-bold mb-4">Live Delivery Map</h3>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    className="rounded-lg"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={mapCenter}>
                      <Popup>{"Your Location"}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Past Orders */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-xl font-bold mb-4">Past Orders</h3>
              <div className="space-y-3">
                {pastOrders.map((order) => (
                  <div
                    key={order._id} // Use a unique identifier like _id
                    className="flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-lg transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{order.name}</h4>
                      <p className="text-sm text-zinc-400">
                        {new Date(order.date).toLocaleDateString()}{" "}
                        {/* Format the date */}
                      </p>
                      <ul className="text-sm text-zinc-300 mt-2">
                        {order.items.map(
                          (
                            item:
                              | string
                              | number
                              | bigint
                              | boolean
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactPortal
                                  | React.ReactElement<
                                      unknown,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined,
                            index: React.Key | null | undefined
                          ) => (
                            <li key={index} className="list-disc pl-5">
                              {item}
                            </li> // Mapping items
                          )
                        )}
                      </ul>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="text-yellow-400" size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
