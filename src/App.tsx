import { useState, FormEvent } from "react";
import "./App.css";

import Logo from "./assets/logo.png";

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();

    let calc = alcoolInput / gasolinaInput;

    if (calc <= 0.7) {
      setInfo({
        title: "Compensa usar Álcool!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    } else {
      setInfo({
        title: "Compensa usar Gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    }
  }

  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img className="logo" src={Logo} alt="logo calculadora" />

        <h1 className="title">Escolha a melhor opção!</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="R$ 4,90"
            min="1"
            step="0.01"
            required
            value={alcoolInput === 0 ? "" : alcoolInput}
            onChange={(e) =>
              setAlcoolInput(e.target.value === "" ? 0 : Number(e.target.value))
            }
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="R$ 4,90"
            min="1"
            step="0.01"
            required
            value={gasolinaInput === 0 ? "" : gasolinaInput}
            onChange={(e) =>
              setGasolinaInput(
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
          />

          <input className="button" type="submit" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>
            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;