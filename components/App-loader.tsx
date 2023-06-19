import React from "react";

export default function AppLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 rounded-full border-t-transparent border-primary animate-spin"></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
}
