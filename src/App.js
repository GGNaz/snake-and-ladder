import { useEffect, useState } from "react";
import Board from "./Components/Board";

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    },2000)
  },[])

  return (
    <div>

      {/* <div class="flex flex-row gap-2">
  <div class="basis-4/6 h-screen"> */}
  {!loading ?  <Board/>:( 
    <div className="flex justify-center items-center h-screen">
  <img   src="https://i.pinimg.com/originals/93/81/35/9381353de0573689f5c1d2ad7a3a3a2d.gif" className="flex justify-center items-center h-screen" alt="logo" />

 </div>         
                )}
  {/* </div> */}
  {/* <div class="basis-2/6 border">01</div>
 </div> */}
    </div>  
  );
}

export default App;
