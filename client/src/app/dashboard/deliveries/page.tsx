"use client"
import React, { useState, useEffect } from "react"
import { Clock, Package, X } from 'lucide-react'
import dynamic from "next/dynamic"
import routes from "@/lib/api/routes"
import "leaflet/dist/leaflet.css"
import { PulsingDot, FadeInSection } from '@/components/ui/custom-components'
import { motion, AnimatePresence } from 'framer-motion'


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
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]) // Default center
  const [userLocation, setUserLocation] = useState<string>(
    "Fetching location..."
  )
  const [activeOrders, setActiveOrders] = useState<any[]>([])
  const [pastOrders, setPastOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState<
    any | null
  >(null)

  // Fetch user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapCenter([latitude, longitude])
          setUserLocation(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          )
        },
        (error) => {
          console.error("Error fetching location:", error)
          setUserLocation("Unable to fetch location")
        }
      )
    } else {
      setUserLocation("Geolocation not supported by this browser.")
    }
  }, [])

  // Fetch active and past orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeOrdersData = await routes.orders.getAll()
        const activeOrders = activeOrdersData.filter(
          (order) => order.orderStatus === "pending"
        )
        setActiveOrders(activeOrders)

        const pastOrdersData = activeOrdersData.filter(
          (order) => order.orderStatus === "delivered"
        )
        setPastOrders(pastOrdersData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  // Fetch the delivery person's location when an order is clicked
  useEffect(() => {
    if (selectedOrder && selectedOrder.deliveryPersonId) {
      const fetchDeliveryPersonLocation = async () => {
        try {
          const deliveryPerson = await selectedOrder.deliveryPersonId
          setDeliveryPersonLocation(deliveryPerson.currentLocation)
        } catch (error) {
          console.error("Error fetching delivery person location:", error)
        }
      }
      fetchDeliveryPersonLocation()
    }
  }, [selectedOrder])
  // Handle order click
  const handleOrderClick = (orderId: string) => {
    const order = activeOrders.find((order) => order._id === orderId)
    setSelectedOrder(order)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* Active Orders Section */}
          <FadeInSection>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-purple-300">Active Orders</h2>
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 bg-zinc-700/50 rounded-lg cursor-pointer transition-all duration-300 hover:bg-zinc-600/50"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Package className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">#{order._id.substring(0, 8)}</h3>
                        <p className="text-sm text-zinc-400">{order.items.join(", ")}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-2">
                      <p className="font-medium text-purple-300">
                        {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
                      </p>
                      <PulsingDot />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Past Orders */}
            <FadeInSection>
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Past Orders</h3>
                <div className="space-y-3">
                  {pastOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                    >
                      <div>
                        <h4 className="font-medium text-lg">#{order._id.substring(0, 8)}</h4>
                        <p className="text-sm text-zinc-400">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-zinc-400">{order.items.join(", ")}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-purple-400" size={20} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Order Details Modal with Map */}
          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-zinc-800/90 p-6 rounded-2xl max-w-2xl w-full shadow-2xl border border-zinc-600"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-purple-300">Order Details</h2>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-4 mb-6">
                    <p className="font-medium text-lg">Order ID: <span className="text-purple-300">#{selectedOrder._id}</span></p>
                    <p className="font-medium text-lg">Items: <span className="text-zinc-300">{selectedOrder.items.join(", ")}</span></p>
                    <p className="font-medium text-lg">Status: <span className="text-green-400">{selectedOrder.orderStatus}</span></p>
                    <p className="font-medium text-lg">
                      Estimated Delivery:{" "}
                      <span className="text-purple-300">
                        {new Date(selectedOrder.estimatedDeliveryTime).toLocaleTimeString()}
                      </span>
                    </p>
                  </div>

                  {/* Displaying map in modal */}
                  <div className="aspect-video rounded-xl overflow-hidden mt-6 border border-zinc-600 shadow-lg">
                    <MapContainer
                      center={mapCenter}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                      className="rounded-xl"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={mapCenter}>
                        <Popup>{userLocation}</Popup>
                      </Marker>
                      {deliveryPersonLocation && (
                        <Marker
                          position={[
                            deliveryPersonLocation.lat,
                            deliveryPersonLocation.lng,
                          ]}
                        >
                          <Popup>Delivery Personnel</Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

