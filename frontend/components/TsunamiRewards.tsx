import React, { useState } from 'react';

interface TsunamiRewardsProps {
  isTsunami?: boolean;
}

const TsunamiRewards: React.FC<TsunamiRewardsProps> = ({ isTsunami = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [accountNumber, setAccountNumber] = useState('300045782');
  const [isEditingAccount, setIsEditingAccount] = useState(false);

  // Hardcoded rewards data for demo
  const rewardsData = {
    memberName: 'Michelle',
    accountNumber: accountNumber,
    currentBalanceCRC: 1500, // ₡1,500 credit
    cashbackRate: 3 // 3% cashback for tsunami rewards
  };

  if (!isTsunami) return null;

  return (
    <div className="mx-5 mb-3 mt-3">
      <div
        className={`bg-[#003580] text-white rounded-xl shadow-md transition-all duration-300 ${
          isExpanded ? 'pb-3' : ''
        }`}
      >
        {/* Header - Always Visible */}
        <div
          className="px-3 py-2.5 cursor-pointer flex items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2.5">
            <div className="size-8 bg-white/15 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">waves</span>
            </div>
            <div>
              <p className="font-bold text-sm">¡Hola {rewardsData.memberName}!</p>
              <p className="text-white/85 text-xs">Tsunami Rewards</p>
            </div>
          </div>
          <div className="text-right flex items-center gap-2">
            <div>
              <p className="text-white/85 text-[10px]">Crédito disponible</p>
              <p className="font-bold text-sm">₡{rewardsData.currentBalanceCRC.toLocaleString()}</p>
            </div>
            <span className={`material-symbols-outlined text-white/70 text-[20px] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-3 pb-2 space-y-2.5 animate-fade-in-up">
            <div className="bg-white/10 rounded-lg p-2.5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/90 text-xs font-medium">Número de cuenta</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingAccount(!isEditingAccount);
                  }}
                  className="text-white/70 hover:text-white text-[10px] font-medium"
                >
                  {isEditingAccount ? 'Guardar' : 'Editar'}
                </button>
              </div>
              {isEditingAccount ? (
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-white/20 text-white placeholder-white/50 rounded-md px-2.5 py-1.5 text-xs font-mono"
                  placeholder="Ingresa tu número de cuenta"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <p className="text-white font-mono text-sm">{accountNumber}</p>
              )}
            </div>

            <div className="text-white/85 text-xs px-0.5 leading-relaxed">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[14px]">percent</span>
                <span>Ganas {rewardsData.cashbackRate}% por tu compra.</span>
              </div>
              <div className="pl-5">
                <span>Acumula y usa tus puntos en Tsunami Sushi, Fogo Rodizio, The Surfer House y Ponte Vecchino</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TsunamiRewards;