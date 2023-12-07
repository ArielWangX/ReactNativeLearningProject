import { useState } from "react";
import Game from "./src/components/Game";

export default function App() {
  const [score, setScore] = useState(0);
  
  return (
    <Game randomNumberCount={6} scoreRecord={[score, setScore]}/>
  );
}
