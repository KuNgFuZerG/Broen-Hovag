import React, { useState } from 'react';
import { X, Heart, CheckCircle2, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const DonateModal: React.FC = () => {
  const { activeExploreModal, setActiveExploreModal } = useAppStore();

  const [amount, setAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>('takkoffer');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (activeExploreModal !== 'gi') return null;

  const quickAmounts = [50, 100, 200, 500];

  const purposes = [
    {
      id: 'kirkeoffer',
      label: 'Høvåg sokn & Takkoffer',
      entity: 'Høvåg kirke',
      vippsNummer: '12 12 18',
      desc: 'Dagens gudstjenesteoffer og kirkelig arbeid'
    },
    {
      id: 'bedehus',
      label: 'Høvåg Bedehus Sti',
      entity: 'Høvåg bedehus',
      vippsNummer: '12 12 18 (valg: Bedehus)',
      desc: 'Drift, lys og varme (Stiftelsen Høvåg Bedehus Sti)'
    },
    {
      id: 'push',
      label: 'PUSH Ungdomsarbeid',
      entity: 'PUSH',
      vippsNummer: '12 12 18 (valg: PUSH)',
      desc: 'Ungdomskvelder, leirer og PUSH Junior/Kafé'
    },
    {
      id: 'madagaskar',
      label: 'Misjon: Madagaskar (NMS)',
      entity: 'Misjon',
      vippsNummer: '12 12 18 (valg: Misjon)',
      desc: 'Tsarafototra landbruksskole & Mangarano'
    },
    {
      id: 'stefanus',
      label: 'Stefanusalliansen (Egypt)',
      entity: 'Misjon',
      vippsNummer: '12 12 18 (valg: Håpløpet)',
      desc: 'Mama Maggie & Stephen’s Children i Kairo'
    },
    {
      id: 'bladet',
      label: 'Menighetsbladet i Høvåg',
      entity: 'Menighetsblad',
      vippsNummer: 'Konto 3000.50.50169',
      desc: 'Gave til trykk og distribusjon i soknet'
    }
  ];

  const selectedPurpose = purposes.find((p) => p.id === selectedPurposeId) || purposes[0];

  const handlePay = () => {
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) return;

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveExploreModal(null);
    }, 2800);
  };

  const currentFinalAmount = customAmount ? parseInt(customAmount) || 0 : amount;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-modal-title"
        className="bg-[#f8fafc] w-full max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-200/80 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-orange-600 text-orange-600" />
            </div>
            <div>
              <h2 id="donate-modal-title" className="text-lg font-black text-gray-900 tracking-tight">
                Gi / Kollekt
              </h2>
              <p className="text-xs text-gray-700 font-semibold">Rask og trygg gave via Vipps</p>
            </div>
          </div>
          <button
            onClick={() => setActiveExploreModal(null)}
            aria-label="Lukk giverpanel"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-white">
          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Tusen hjertelig takk!</h3>
              <p className="text-xs text-gray-700 font-semibold max-w-xs mx-auto">
                Din gave på <span className="font-bold text-gray-900">{currentFinalAmount} kr</span> til{' '}
                <span className="font-bold text-orange-700">{selectedPurpose.label}</span> er registrert.
              </p>
            </div>
          ) : (
            <>
              {/* Purpose Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Velg formål
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {purposes.map((p) => {
                    const isSelected = selectedPurposeId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPurposeId(p.id)}
                        className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-orange-50 border-orange-600 text-orange-950 font-bold shadow-sm ring-1 ring-orange-500'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-extrabold text-gray-900">{p.label}</span>
                          <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                            #{p.vippsNummer}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium leading-tight">{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount Selector */}
              <div>
                <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Velg beløp
                </span>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {quickAmounts.map((val) => {
                    const isSelected = amount === val && !customAmount;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          setAmount(val);
                          setCustomAmount('');
                        }}
                        className={`py-3 min-h-[46px] rounded-xl text-sm font-black flex items-center justify-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'border-2 border-orange-600 bg-orange-50 text-orange-950 shadow-sm'
                            : 'border border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        {val} kr
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Eller valgfritt beløp (kr)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-gray-50 border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-600/50"
                  />
                  <span className="absolute right-4 top-3 text-xs font-extrabold text-gray-500">kr</span>
                </div>
              </div>

              {/* Vipps Direct Button */}
              <div className="pt-2">
                <button
                  onClick={handlePay}
                  disabled={currentFinalAmount <= 0}
                  className="w-full py-3.5 min-h-[48px] rounded-2xl bg-[#ff5b24] hover:bg-[#e04c18] disabled:opacity-50 text-white text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-orange-950/15 transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Vipps {currentFinalAmount} kr til #{selectedPurpose.vippsNummer}</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-600 mt-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Gaven går uavkortet til {selectedPurpose.label}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

