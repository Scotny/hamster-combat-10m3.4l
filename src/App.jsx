import { useEffect, useState } from "react";
import "./App.css";
import icon from "./assets/icon";

function App() {
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [perTap, setPerTap] = useState(1);
  const [exchangeData, setExchangeData] = useState([
    { addpt: "2", priceaddpt: "50" },
    { addpt: "3", priceaddpt: "100" },
    { addpt: "5", priceaddpt: "200" },
  ]);

  function handleExchange(index) {
    const item = exchangeData[index];

    if (coins >= parseInt(item.priceaddpt)) {
      setCoins(coins - parseInt(item.priceaddpt));
      setPerTap(parseInt(item.addpt)); // set perTap to new value

      // Remove this item from exchangeData
      const updatedData = [...exchangeData];
      updatedData.splice(index, 1);
      setExchangeData(updatedData);
    }
  }

  function click() {
    if (energy <= 0) return;

    setCoins(coins + perTap);
    setEnergy(energy - 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy < 1000) {
          return prevEnergy + 1;
        } else {
          return prevEnergy;
        }
      });
    }, 1000); // every 1000ms = 1 second

    return () => clearInterval(interval); // clean up interval on unmount
  }, []);

  function handleMenuClick(e) {
    const button = e.currentTarget;
    const menu = button.parentElement;
    const exchangeDiv = menu.querySelector(".exchange_div");
    const hamster = document.querySelector(".hamster");
    const energy = document.querySelector(".energy");

    if (button.classList.contains("active")) {
      button.classList.remove("active");
      exchangeDiv.classList.remove("show");
      hamster.style.visibility = "visible";
      energy.style.visibility = "visible";
      return;
    }

    menu
      .querySelectorAll("button")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    exchangeDiv.classList.remove("show");
    hamster.style.visibility = "visible";
    energy.style.visibility = "visible";

    if (button.id === "exchange") {
      exchangeDiv.classList.add("show");
      hamster.style.visibility = "hidden";
      energy.style.visibility = "hidden";
    }
  }

  function handleStatClick(e) {
    const stat = e.currentTarget;
    const ept = stat.querySelector(".ept");

    // Toggle visibility of ept
    ept.classList.toggle("show");
  }

  return (
    <div className="container">
      <h2>Hamster Kombat</h2>

      <div className="stats">
        <div className="stat" onClick={handleStatClick}>
          <div className="ept"></div>
          <p style={{ color: "#F79841" }} className="stat_name">
            Earn per tap
          </p>
          <p className="stat_value">
            <img src={icon.coin} alt="" /> +{perTap}
          </p>
        </div>
        <div className="stat">
          <p style={{ color: "#6F72E2" }} className="stat_name">
            Coins to level up
          </p>
          <p className="stat_value">10 M</p>
        </div>
        <div className="stat">
          <p style={{ color: "#84CB69" }} className="stat_name">
            Profit per hour
          </p>
          <p className="stat_value">
            <img src={icon.coin} alt="" /> +12
          </p>
        </div>
      </div>

      <h1>
        <img src={icon.coin} alt="" /> {coins}
      </h1>

      <img onClick={click} className="hamster" src={icon.hamster} alt="" />
      <div className="energy">
        <p>
          <img src={icon.energy} alt="" /> {energy}/1000
        </p>
        <button className="boost">Boost</button>
      </div>

      <div className="menu">
        <button id="exchange" onClick={handleMenuClick}>
          <img src={icon.menu.exchange} alt="" />
          <p>Exchange</p>
        </button>
        <button id="mine" onClick={handleMenuClick}>
          <img src={icon.menu.mine} alt="" />
          <p>Mine</p>
        </button>
        <button id="friends" onClick={handleMenuClick}>
          <img src={icon.menu.friends} alt="" />
          <p>Friends</p>
        </button>
        <button id="earn" onClick={handleMenuClick}>
          <img src={icon.menu.earn} alt="" />
          <p>Earn</p>
        </button>
        <button id="airdrop" onClick={handleMenuClick}>
          <img src={icon.menu.airdrop} alt="" />
          <p>Airdrop</p>
        </button>

        <div className="exchange_div">
          {exchangeData.map((item, index) => (
            <div
              key={index}
              className="exchange_div_item"
              onClick={() => handleExchange(index)}
            >
              <p>Add Points per tap: {item.addpt}</p>
              <p>Price: {item.priceaddpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
