import React, { useState } from 'react';
import { TableUser } from '../types';

interface TableUsersPanelProps {
  currentUserId: string;
  users: TableUser[];
  currentUserName: string;
  onNameChange: (name: string) => void;
  onJoinTable: () => void;
}

const TableUsersPanel: React.FC<TableUsersPanelProps> = ({
  currentUserId,
  users,
  currentUserName,
  onNameChange,
  onJoinTable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState(currentUserName || '');

  const handleNameSubmit = () => {
    if (nameInput.trim()) {
      onNameChange(nameInput.trim());
      setIsOpen(false);
    }
  };

  const isCurrentUser = (userId: string) => userId === currentUserId;
  const currentUser = users.find(u => u.id === currentUserId);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all"
        aria-label="Table users"
      >
        <span className="material-symbols-outlined text-primary">group</span>
        {users.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {users.length}
          </span>
        )}
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-t-3xl shadow-2xl animate-slide-up max-h-[80vh] flex flex-col">
            {/* Handle */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="h-1.5 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            </div>

            {/* Header */}
            <div className="px-6 pb-4 pt-2 flex items-center justify-between border-b border-border-light dark:border-border-dark">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
                Mesa Compartida
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* Name Input Section */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3">
                <label className="text-sm font-bold text-text-light dark:text-text-dark">
                  Tu Nombre
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className="flex-1 px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Guardar
                  </button>
                </div>
                {currentUserName && (
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">
                    Conectado como: <span className="font-semibold">{currentUserName}</span>
                  </p>
                )}
              </div>

              {/* Join Table Button */}
              {users.length === 0 && (
                <button
                  onClick={() => {
                    onJoinTable();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                  Escanear QR para unirse a la mesa
                </button>
              )}

              {/* Users List */}
              {users.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-text-muted dark:text-text-muted-dark mb-3 uppercase tracking-wider">
                    En la Mesa ({users.length})
                  </h3>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center gap-3 p-3 rounded-xl ${
                          isCurrentUser(user.id)
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-slate-50 dark:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <div
                          className={`size-10 rounded-full flex items-center justify-center ${
                            isCurrentUser(user.id)
                              ? 'bg-primary text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <span className="material-symbols-outlined">
                            {isCurrentUser(user.id) ? 'person' : 'person_outline'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-text-light dark:text-text-dark">
                            {user.name}
                            {isCurrentUser(user.id) && (
                              <span className="ml-2 text-xs text-primary">(Tú)</span>
                            )}
                          </p>
                          <p className="text-xs text-text-muted dark:text-text-muted-dark">
                            {new Date(user.joinedAt).toLocaleTimeString('es-CR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableUsersPanel;
