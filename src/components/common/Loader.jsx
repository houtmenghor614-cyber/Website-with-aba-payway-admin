import React from "react";
import Spinner from "./Spinner";

export default function Loader({ text = "Loading...", full = false }) {
  return (
    <div className={full ? "min-h-[40vh] flex flex-col items-center justify-center gap-3" : "py-12 flex flex-col items-center justify-center gap-3"}>
      <Spinner size="lg" />
      <p className="text-sm text-ink-400">{text}</p>
    </div>
  );
}
