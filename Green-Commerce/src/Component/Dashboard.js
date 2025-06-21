import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  LineChart
} from 'recharts';
import RewardEarned from "../Component/RewardEarned";

import badge1 from "../assets/badge1.png";
import badge2 from "../assets/badge22.png";
import badge3 from "../assets/badge3.png";
import badge4 from "../assets/badge4.png";

export default function Dashboard() {
  const plasticData = [
    { name: 'Product 1', percentage: 20 },
    { name: 'Product 2', percentage: 60 },
    { name: 'Product 3', percentage: 25 },
    { name: 'Product 4', percentage: 100 },
    { name: 'Product 5', percentage: 50 },
    { name: 'Product 6', percentage: 60 },
    { name: 'Product 7', percentage: 80 },
  ];
  const data = [
    { month: 'Jan', value: 50 },
    { month: 'Feb', value: 60 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 65 },
    { month: 'Jun', value: 70 },
    { month: 'Sep', value: 85 },
    { month: 'Dec', value: 95 },
  ];

  const categories = [
    { label: 'Home', pct: 72 },
    { label: 'Lifestyle', pct: 45 },
    { label: 'Personal Care', pct: 60 },
  ];

  const badges = [
    { name: 'Eco Rookie', icon: badge1 },
    { name: 'Green Advocate', icon: badge2 },
    { name: 'Sustainability Star', icon: badge3 },
    { name: 'Planet Guardian', icon: badge4 },
  ];

  // which badge is “current”
  const currentBadgeIndex = 2;

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 32,
    margin: '10px',
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: '#111',
    marginBottom: 8,
    marginLeft: '40px',
  };

  const textGray = { color: '#4b5563' };

  const Dial = ({ pct, label }) => {
    const radius = 36;
    const stroke = 8;
    const r = radius - stroke / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (pct / 100) * c;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width={radius * 2} height={radius * 2}>
          <circle
            cx={radius}
            cy={radius}
            r={r}
            stroke="#dcfce7"
            fill="none"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={r}
            stroke="#22c55e"
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#111"
          >
            {pct}%
          </text>
        </svg>
        <div style={{ marginTop: 8, color: '#374151' }}>{label}</div>
      </div>
    );
  };

  return (
    <div
      style={{
        padding: 0,
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* 1. Gauge + AreaChart */}
      <div style={cardStyle}>
        <style>{`
          @keyframes gaugeDraw {
            from { stroke-dashoffset: 1; }
            to   { stroke-dashoffset: 0; }
          }
          .gauge-fill {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            animation: gaugeDraw 1s ease-out forwards;
          }
        `}</style>

        {/* Gauge */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={titleStyle}>Customer Sustainability</div>
          <svg width="200" height="110" viewBox="0 0 200 110" style={{ margin: '0 auto' }}>
            <defs>
              <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#bbf7d0" />
                <stop offset="65%" stopColor="#bbf7d0" />
                <stop offset="65%" stopColor="#dcfce7" />
                <stop offset="100%" stopColor="#dcfce7" />
              </linearGradient>
            </defs>
            <path
              d="M10,100 A90,90 0 0 1 190,100"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            <path
              className="gauge-fill"
              pathLength="1"
              d="M10,100 A90,90 0 0 1 158,32"
              fill="none"
              stroke="url(#gauge-gradient)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <line
              x1="100"
              y1="100"
              x2="158"
              y2="42"
              stroke="#111"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="#111" />
          </svg>
          <div style={{ marginTop: -8 }}>
            <div style={{ fontSize: 32, fontWeight: 'bold' }}>5.2t</div>
            <div style={textGray}>Total CO₂ Saved</div>
          </div>
        </div>

        {/* AreaChart */}
        <div style={{ flex: 1, height: 200 }}>
          <div style={titleStyle}>Monthly Eco-Purchase Trends</div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                stroke="#374151"
                padding={{ left: 10, right: 10 }}
              />
              <Tooltip
                contentStyle={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#chart-gradient)"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 6, fill: '#22c55e' }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Rewards */}
        <RewardEarned />
      </div>

      {/* 2 & 3. Category and Badge Tracker side by side */}
      <div style={{ display: 'flex', marginTop: '-35px' }}>
        {/* Category Dials */}
        <div style={{ ...cardStyle, width: '40%', alignItems: 'center', marginRight: '-5px' }}>
          <div style={titleStyle}>Category Dials</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {categories.map((c) => (
              <Dial key={c.label} pct={c.pct} label={c.label} />
            ))}
          </div>
        </div>

        {/* Badge Tracker */}
        <div style={{ ...cardStyle, alignItems: 'center', width: '60%' }}>
          <div style={titleStyle}>Badge tracker</div>
          <style>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}</style>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: badges
                .map((_, i) => (i < badges.length - 1 ? '48px 100px' : '48px'))
                .join(' '),
              gridTemplateRows: '48px auto',
              alignItems: 'center',
              rowGap: 8,
              marginTop: 18,
              marginRight: 100,
             
            }}
          >
            {badges.map(({ name, icon }, i) => {
              const col = i * 2 + 1;
              const isActive = i === currentBadgeIndex;
           

              {/* const isConnectorActive = i === currentBadgeIndex - 1; */}
              return (
                <React.Fragment key={name}>
                  <div
                    style={{
                      gridRow: 1,
                      gridColumn: col,
                      width: 55,
                      height: 55,
                      border: '3px solid #22c55e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isActive ? '#dcfce7' : '#fff',
                      animation: isActive ? 'pulse 2s ease-in-out infinite' : undefined,
                      position: 'relative'
                    }}
                  >
                    <img src={icon} alt={name} style={{ width: 35, height: 35 }} />
                  </div>
                  <div
                    style={{
                      gridRow: 2,
                      gridColumn: col,
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#374151',
                    }}
                  >
                    {name}
                  </div>
                  {i < badges.length - 1 && (
                    <div
                      style={{
                        gridRow: 1,
                        gridColumn: col + 1,
                        width: '150px',
                        height: 4,
                        // before current badge → green; after → yellow
                        backgroundColor: i < currentBadgeIndex
                          ? '#228C22'
                          : '#7DD3FC',
                        borderRadius: 2,
                        justifySelf: 'start',
                        transform: 'translateX(-24px)',
                        marginLeft: '35px'
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* % Plastic Reduced */}
      <div style={{ ...cardStyle, marginTop: -25 }}>
        <div style={titleStyle}>% Plastic Reduced Per Item</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={plasticData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              stroke="#374151"
              padding={{ left: 20, right: 20 }}
            />
            <Tooltip
              contentStyle={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 6, fill: '#22c55e' }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard */}
      <div
        style={{
          marginTop: '-25px',
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
          Top Eco-Contributors
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'Emma', score: '120 pts' },
            { name: 'Liam', score: '110 pts' },
            { name: 'Olivia', score: '105 pts' },
          ].map((u, idx) => {
            const accentColors = ['#FBBF24', '#9CA3AF', '#D97706'];
            return (
              <div
                key={u.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor:
                    idx === 0 ? '#FFFBEB' : idx === 1 ? '#F3F4F6' : '#FDF2F8',
                  borderLeft: `4px solid ${accentColors[idx]}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: accentColors[idx],
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 16, color: '#111' }}>
                    {idx + 1}. {u.name}
                  </span>
                </div>
                <span style={{ fontWeight: 600, color: '#111' }}>{u.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
