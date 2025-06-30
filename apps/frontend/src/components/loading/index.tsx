import "./style.css";

export default function Loading() {
  return (
    <div className="loading-spinner" aria-label="Carregando...">
      <div className="spinner-circle" />
    </div>
  );
}
