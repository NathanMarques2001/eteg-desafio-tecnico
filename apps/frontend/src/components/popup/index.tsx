import "./style.css";

type PopupProps = {
  type: "error" | "success";
  message: string;
  onClose: () => void;
};

export default function Popup({ type, message, onClose }: PopupProps) {
  return (
    <div id="popup-overlay" onClick={onClose}>
      <div id={`popup-card-${type}`} onClick={(e) => e.stopPropagation()} className="popup-card">
        <p className="popup-card-title" id={`popup-card-title-${type}`}>
          {type == "success" ? "Formulário Enviado" : "Ocorreu um Erro"}
        </p>
        <p id="popup-card-message">{message}</p>
        <button id="popup-card-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
