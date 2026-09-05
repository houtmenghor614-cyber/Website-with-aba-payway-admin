import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../../components/common/Button";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
        <Compass className="w-9 h-9" />
      </div>
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Page not found</h1>
      <p className="text-sm text-ink-500 mt-2">The page you requested does not exist.</p>
      <Link to="/admin" className="inline-block mt-6"><Button>Back to dashboard</Button></Link>
    </div>
  );
}
