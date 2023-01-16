import { useEffect, useState } from "react";
import Board from "./Components/Board";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="h-screen">
      {!loading ? (
        <Board />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <img
            src="https://i.pinimg.com/originals/93/81/35/9381353de0573689f5c1d2ad7a3a3a2d.gif"
            className="flex justify-center items-center h-screen"
            alt="logo"
          />
        </div>
      )}
    </div>
  );
}

export default App;
