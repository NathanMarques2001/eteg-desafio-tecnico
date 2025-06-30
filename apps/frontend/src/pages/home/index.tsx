import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import formImg from "../../assets/form-img.png";
import "./style.css";
import axios from "axios";
import cpfMask from "../../utils/cpf-mask";
import type Customer from "../../types/customer";
import type Color from "../../types/color";
import Navbar from "../../components/navbar";
import Popup from "../../components/popup";

export default function CustomerForm() {
  const [form, setForm] = useState<Customer>({
    name: "",
    email: "",
    cpf: "",
    id_color: "",
    observations: ""
  });

  const [colors, setColors] = useState<Color[]>([]);
  const [loadingColors, setLoadingColors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
    const [popup, setPopup] = useState<
    | { type: "error" | "success"; message: string }
    | null
  >(null);

  useEffect(() => {
    async function loadColors() {
      setLoadingColors(true);
      try {
        const response = await axios.get("http://localhost:3000/colors");
        console.log(response);
        setColors(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingColors(false);
      }
    }
    loadColors();
  }, []);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (name === "cpf") {
      setForm((prev) => {
        const masked = cpfMask(value);
        if (masked === prev.cpf) return prev; // evita re-render inútil
        return { ...prev, cpf: masked };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setPopup(null);

    const cpfSemMascara = form.cpf.replace(/\D/g, "");

    const payload = {
      ...form,
      cpf: cpfSemMascara,
      id_color: Number(form.id_color)
    };

    try {
      await axios.post("http://localhost:3000/customers", payload);
      setPopup({ type: "success", message: "Cliente cadastrado com sucesso!" });
      setForm({ name: "", email: "", cpf: "", id_color: "", observations: "" });
    } catch (err: any) {
      const msg =
        err.response?.data?.message
          ? Array.isArray(err.response.data.message)
            ? err.response.data.message.join(", ")
            : err.response.data.message
          : "Erro ao cadastrar cliente";

      setPopup({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
          {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      ) }
      <Navbar />
      <div id="home-container">
        <form onSubmit={handleSubmit} id="home-form">
          <div id="home-form-header">
            <div id="home-title-container">
              <h1 id="home-title">Cadastro de Cliente </h1>
              <div id="home-title-underline" />
            </div>
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              Nome<span className="home-form-required-field">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Insira seu nome completo"
              className="home-form-input"
            />
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              E-mail<span className="home-form-required-field">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="home-form-input"
            />
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              CPF<span className="home-form-required-field">*</span>
            </label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              maxLength={14}
              required
              placeholder="123.456.789-10"
              className="home-form-input"
            />
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              Cor<span className="home-form-required-field">*</span>
            </label>
            {loadingColors ? (
              <p>Carregando cores...</p>
            ) : (
              <select
                id="home-form-select"
                name="id_color"
                value={form.id_color}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma cor</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id.toString()}>
                    {color.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">Observações</label>
            <br />
            <textarea
              rows={4}
              name="observations"
              value={form.observations}
              onChange={handleChange}
              placeholder="Digite observações que achar necessárias"
              className="home-form-input"
            ></textarea>
          </div>

          <button id="home-form-button" type="submit" disabled={submitting}>
            {submitting ? "Enviando..." : "Cadastrar"}
          </button>
        </form>
        <img
          id="home-img"
          src={formImg}
          alt="imagem ilustrativa de pessoa preenchendo um formulário"
        />
      </div>
    </>
  );
}
