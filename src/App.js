import "./App.css";
import axios from "axios";

function App() {
  return (
    <div>
      <button
        onClick={() => {
          const divBox = document.querySelector(".divBox");
          axios.get("server.ibingo.link").then((res) => {
            divBox.textContent = res.data;
          });
        }}
      >
        인사하겠습니다
      </button>
      <div className="divBox"></div>
    </div>
  );
}

export default App;
