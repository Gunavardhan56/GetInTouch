import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  mockHelpers,
  mockRequests,
  mockTransactions,
  mockDisputes,
  mockImpact,
} from "../mock";

const Admin = () => {
  const totalUsers = 1 + mockHelpers.length;
  const activeRequests = mockRequests.filter(
    (r) => r.status === "pending"
  ).length;

  const totalRevenue = mockTransactions
    .filter((t) => t.amountCoins > 0)
    .reduce((sum, t) => sum + t.amountCoins, 0);

  const highUrgency = mockRequests.filter(
    (r) => r.urgency === "high" || r.urgency === "emergency"
  );

  const openDisputes = mockDisputes.filter((d) => d.status !== "resolved");

  const topHelpers = [...mockHelpers].sort(
    (a, b) => b.completedJobs - a.completedJobs
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
          <span className="text-xs text-slate-500">
            GetInTouch · control center
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Top metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-slate-500 mb-1">Total users</p>
              <p className="text-2xl font-bold text-slate-800">{totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-slate-500 mb-1">Active requests</p>
              <p className="text-2xl font-bold text-slate-800">
                {activeRequests}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-slate-500 mb-1">Revenue (coins)</p>
              <p className="text-2xl font-bold text-slate-800">
                {totalRevenue}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-slate-500 mb-1">Disputes open</p>
              <p className="text-2xl font-bold text-slate-800">
                {openDisputes.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Impact strip */}
        <Card className="bg-gradient-to-r from-blue-50 via-emerald-50 to-slate-50">
          <CardContent className="p-4 flex flex-wrap gap-6 text-sm text-slate-700">
            <span>
              Completed requests:{" "}
              <strong>{mockImpact.totalJobsCompleted}</strong>
            </span>
            <span>
              Earnings to community:{" "}
              <strong>₹{mockImpact.totalEarningsCommunity}</strong>
            </span>
            <span>
              Emergency transports:{" "}
              <strong>{mockImpact.emergencyCasesSupported}</strong>
            </span>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* High urgency alerts */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  High urgency alerts
                </h2>
              </div>
              {highUrgency.length === 0 && (
                <p className="text-xs text-slate-500">
                  No high or emergency requests right now.
                </p>
              )}
              {highUrgency.map((req) => (
                <div
                  key={req.id}
                  className="border rounded-md px-3 py-2 text-xs space-y-1 bg-red-50/40 border-red-100"
                >
                  <p className="font-semibold text-slate-800">
                    {req.type} · ₹{req.cost}
                  </p>
                  <p className="text-slate-600">
                    {req.location} · urgency:{" "}
                    {req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Disputes */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Dispute tickets
                </h2>
                <Button size="sm" variant="outline" className="text-xs">
                  View all
                </Button>
              </div>
              {openDisputes.length === 0 && (
                <p className="text-xs text-slate-500">
                  No open disputes. Good job!
                </p>
              )}
              {openDisputes.map((d) => (
                <div
                  key={d.id}
                  className="border rounded-md px-3 py-2 text-xs space-y-1"
                >
                  <p className="font-semibold text-slate-800">
                    {d.userName} ↔ {d.helperName}
                  </p>
                  <p className="text-slate-600 line-clamp-2">{d.reason}</p>
                  <p className="text-[11px] text-slate-500">
                    Status: {d.status} · Requested refund: ₹
                    {d.requestedRefundAmount}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top helpers leaderboard */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Top helpers leaderboard
            </h2>
            <div className="space-y-2 text-xs text-slate-700">
              {topHelpers.map((h, index) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between border rounded-md px-3 py-2"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      #{index + 1} {h.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {h.location} · {h.completedJobs} jobs ·{" "}
                      {(h.successRate * 100).toFixed(0)}% success
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-600">
                    ⭐ {h.rating.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;

