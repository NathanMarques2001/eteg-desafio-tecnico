import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { customerSchema, type CustomerSchema } from "../../types/schemas/customer";
import formImg from "../../assets/form-img.png";
import cpfMask from "../../utils/cpf-mask";
import Navbar from "../../components/navbar";
import Popup from "../../components/popup";
import Loading from "../../components/loading";
import "./style.css";
import type Color from "../../types/color";

export default function CustomerForm() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loadingColors, setLoadingColors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      id_color: 0,
      observations: ""
    }
  });

  const cpfValue = watch("cpf");

  useEffect(() => {
    async function loadColors() {
      setLoadingColors(true);
      try {
        const response = await axios.get("http://localhost:3000/colors");
        setColors(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingColors(false);
      }
    }
    loadColors();
  }, []);

  useEffect(() => {
    const unmasked = cpfValue.replace(/\D/g, "");
    const masked = cpfMask(unmasked);
    if (masked !== cpfValue) {
      setValue("cpf", masked);
    }
  }, [cpfValue, setValue]);

  const onSubmit = async (data: CustomerSchema) => {
    setSubmitting(true);
    setPopup(null);

    const payload = {
      ...data,
      cpf: data.cpf.replace(/\D/g, "")
    };

    try {
      await axios.post("http://localhost:3000/customers", payload);
      setPopup({ type: "success", message: "Cliente cadastrado com sucesso!" });
      reset();
    } catch (err: any) {
      const msg = err.response?.data?.message
        ? Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message
        : "Erro ao cadastrar cliente";

      setPopup({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {popup && <Popup type={popup.type} message={popup.message} onClose={() => setPopup(null)} />}
      <Navbar />
      <div id="home-container">
        <form onSubmit={handleSubmit(onSubmit)} id="home-form">
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
              placeholder="Insira seu nome completo"
              className="home-form-input"
              {...register("name")}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              E-mail<span className="home-form-required-field">*</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="home-form-input"
              {...register("email")}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              CPF<span className="home-form-required-field">*</span>
            </label>
            <input
              type="text"
              maxLength={14}
              placeholder="123.456.789-10"
              className="home-form-input"
              {...register("cpf")}
            />
            {errors.cpf && <p className="form-error">{errors.cpf.message}</p>}
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">
              Cor<span className="home-form-required-field">*</span>
            </label>
            {loadingColors ? (
              <Loading />
            ) : (
              <select id="home-form-select" className="home-form-input" {...register("id_color")}>
                <option value={0}>Selecione uma cor</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            )}
            {errors.id_color && <p className="form-error">{errors.id_color.message}</p>}
          </div>

          <div className="home-form-field-container">
            <label className="home-form-label">Observações</label>
            <textarea
              rows={4}
              placeholder="Digite observações que achar necessárias"
              className="home-form-input"
              {...register("observations")}
            />
            {errors.observations && <p className="form-error">{errors.observations.message}</p>}
          </div>

          <button id="home-form-button" type="submit" disabled={submitting}>
            {submitting ? <Loading /> : "Cadastrar"}
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
