import React from 'react';
import { Leaf, Zap, Users } from 'lucide-react';

export const Impact: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-green-500/20 rounded-lg">
          <Leaf className="text-green-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Environmental Impact</h2>
          <p className="text-zinc-400">Your contribution to a greener future</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <h4 className="text-sm text-zinc-400">Carbon Saved</h4>
          <p className="text-2xl font-bold">45.2kg</p>
          <p className="text-sm text-green-400">+2.3kg this week</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <h4 className="text-sm text-zinc-400">Green Trips</h4>
          <p className="text-2xl font-bold">23</p>
          <p className="text-sm text-green-400">+5 this week</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <h4 className="text-sm text-zinc-400">Trees Equivalent</h4>
          <p className="text-2xl font-bold">3.2</p>
          <p className="text-sm text-green-400">Monthly impact</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Impact History</h3>
        <div className="h-64 bg-zinc-800 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Impact Graph"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Green Achievements</h3>
        <div className="space-y-4">
          {[
            {
              title: "Eco Warrior",
              description: "Completed 20 green trips",
              progress: 80,
              icon: Leaf,
            },
            {
              title: "Carbon Crusher",
              description: "Saved 50kg of CO2",
              progress: 60,
              icon: Zap,
            },
            {
              title: "Community Leader",
              description: "Inspired 5 friends to join",
              progress: 40,
              icon: Users,
            },
          ].map((achievement) => (
            <div key={achievement.title} className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <achievement.icon className="text-green-400" size={20} />
                  <h4 className="font-medium">{achievement.title}</h4>
                </div>
                <span className="text-sm text-zinc-400">{achievement.progress}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-zinc-400 mt-2">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);