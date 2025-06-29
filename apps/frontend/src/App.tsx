import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

function cpfMask(value: string): string {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return value;
}

interface Color {
  id: number;
  name: string;
}

interface CustomerFormData {
  name: string;
  email: string;
  cpf: string;
  id_color: string;
  observations: string;
}

export default function CustomerForm() {
  const [form, setForm] = useState<CustomerFormData>({
    name: '',
    email: '',
    cpf: '',
    id_color: '',
    observations: '',
  });

  const [colors, setColors] = useState<Color[]>([]);
  const [loadingColors, setLoadingColors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadColors() {
      setLoadingColors(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/colors'); 
        console.log(response)
        setColors(response.data);
      } catch (err) {
        console.log(err)
        setError('Erro ao carregar cores');
      } finally {
        setLoadingColors(false);
      }
    }
    loadColors();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === 'cpf') {
      setForm((prev) => ({ ...prev, cpf: cpfMask(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const cpfSemMascara = form.cpf.replace(/\D/g, '');

    const payload = {
      ...form,
      cpf: cpfSemMascara,
      id_color: Number(form.id_color),
    };

    try {
      await axios.post('http://localhost:3000/customers', payload);
      setSuccessMsg('Cliente cadastrado com sucesso!');
      setForm({ name: '', email: '', cpf: '', id_color: '', observations: '' });
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(Array.isArray(err.response.data.message) ? err.response.data.message.join(', ') : err.response.data.message);
      } else {
        setError('Erro ao cadastrar cliente');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      {successMsg && <div style={{ color: 'green', marginBottom: 10 }}>{successMsg}</div>}

      <div>
        <label>Nome:</label><br />
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div>
        <label>E-mail:</label><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      <div>
        <label>CPF:</label><br />
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          maxLength={14}
          required
        />
      </div>

      <div>
        <label>Cor:</label><br />
        {loadingColors ? (
          <p>Carregando cores...</p>
        ) : (
          <select name="id_color" value={form.id_color} onChange={handleChange} required>
            <option value="">Selecione uma cor</option>
            {colors.map((c) => (
              <option key={c.id} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label>Observações:</label><br />
        <input type="text" name="observations" value={form.observations} onChange={handleChange} />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
