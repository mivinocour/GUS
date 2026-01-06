import React, { useState } from 'react';

interface PaymentSuccessScreenProps {
  onDone: () => void;
  totalPaid: number;
}

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({ onDone, totalPaid }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const handleSendEmail = () => {
    setEmailSent(true);
    // Simulate API call
    setTimeout(() => setEmailSent(true), 500);
  };

  const handleSendSMS = () => {
    setSmsSent(true);
    // Simulate API call
    setTimeout(() => setSmsSent(true), 500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full px-6 animate-fade-in bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6">
        
        {/* Success Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative size-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
            <span className="material-symbols-outlined text-white text-[48px] font-bold">check</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-text-light dark:text-text-dark">¡Pago Exitoso!</h2>
          <p className="text-text-muted dark:text-text-muted-dark">
            Tu pago de <span className="font-bold text-text-light dark:text-text-dark">₡{totalPaid.toLocaleString()}</span> ha sido procesado correctamente.
          </p>
        </div>

        {/* Receipt Options Card */}
        <div className="w-full bg-surface-light dark:bg-surface-dark p-6 rounded-3xl shadow-card border border-border-light dark:border-border-dark mt-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-4 text-center">Enviar Recibo</h3>
          
          <div className="space-y-3">
            <button 
              onClick={handleSendEmail}
              disabled={emailSent}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${emailSent ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-slate-50 border-slate-100 hover:border-primary/50 dark:bg-slate-800 dark:border-slate-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-full flex items-center justify-center ${emailSent ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'bg-white dark:bg-slate-700 text-slate-500'}`}>
                  <span className="material-symbols-outlined">{emailSent ? 'mark_email_read' : 'mail'}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-text-light dark:text-text-dark">{emailSent ? 'Enviado' : 'Correo Electrónico'}</p>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">usuario@ejemplo.com</p>
                </div>
              </div>
              {emailSent && <span className="material-symbols-outlined text-green-500">check_circle</span>}
            </button>

            <button 
              onClick={handleSendSMS}
              disabled={smsSent}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${smsSent ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-slate-50 border-slate-100 hover:border-primary/50 dark:bg-slate-800 dark:border-slate-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-full flex items-center justify-center ${smsSent ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'bg-white dark:bg-slate-700 text-slate-500'}`}>
                  <span className="material-symbols-outlined">{smsSent ? 'sms' : 'chat'}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-text-light dark:text-text-dark">{smsSent ? 'Enviado' : 'Mensaje de Texto'}</p>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">8888-8888</p>
                </div>
              </div>
              {smsSent && <span className="material-symbols-outlined text-green-500">check_circle</span>}
            </button>
          </div>
        </div>

        <button 
          onClick={onDone}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold h-14 rounded-2xl shadow-lg active:scale-95 transition-all mt-4"
        >
          Listo, volver al inicio
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccessScreen;