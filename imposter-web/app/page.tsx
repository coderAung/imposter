"use client"

import { useState } from "react";

export default function Home() {
  const [greet, setGreet] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <button onClick={() => setGreet(!greet)} className="bg-red-900">Hello</button>
      <div>
        {greet && "Hello"}
      </div>
    </div>
  );
}
