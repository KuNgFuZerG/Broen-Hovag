import React, { useRef, useState, useEffect } from 'react';
import { Camera, Check, RotateCcw } from 'lucide-react';

interface ProfileAvatarUploaderProps {
  name: string;
  avatar?: string;
  onAvatarChange: (newAvatarDataUrl: string) => void;
  size?: 'md' | 'lg';
}

export const ProfileAvatarUploader: React.FC<ProfileAvatarUploaderProps> = ({
  name,
  avatar,
  onAvatarChange,
  size = 'lg',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgError, setImgError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setImgError(false);
  }, [avatar]);

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('');

  const sizeClass = size === 'lg' ? 'w-[72px] h-[72px]' : 'w-16 h-16';

  const triggerFilePicker = () => {
    setErrorMessage(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Velg en bildefil (JPG, PNG, WebP).');
      e.target.value = '';
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();

      img.onload = () => {
        try {
          const maxDim = 400;
          let targetW = img.width;
          let targetH = img.height;

          if (targetW > maxDim || targetH > maxDim) {
            if (targetW > targetH) {
              targetH = Math.round((targetH * maxDim) / targetW);
              targetW = maxDim;
            } else {
              targetW = Math.round((targetW * maxDim) / targetH);
              targetH = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.drawImage(img, 0, 0, targetW, targetH);
            const compressedUrl = canvas.toDataURL('image/jpeg', 0.85);
            onAvatarChange(compressedUrl);
          } else {
            onAvatarChange(rawDataUrl);
          }

          setJustUpdated(true);
          setTimeout(() => setJustUpdated(false), 2500);
        } catch {
          onAvatarChange(rawDataUrl);
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setIsProcessing(false);
        setErrorMessage('Kunne ikke lese bildefilen.');
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMessage('Kunne ikke åpne bildefilen.');
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const hasValidImage = Boolean(avatar) && !imgError;

  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative">
        <button
          type="button"
          onClick={triggerFilePicker}
          aria-label="Endre profilbilde"
          className={`${sizeClass} rounded-full bg-gradient-to-br from-orange-600 to-amber-700 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-orange-950/15 border-2 border-white overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-transform active:scale-95`}
        >
          {hasValidImage ? (
            <img
              src={avatar}
              alt={`Profilbilde for ${name}`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
            />
          ) : (
            <span>{initials || 'U'}</span>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center rounded-full">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>

        {/* Camera Upload Button */}
        <button
          type="button"
          onClick={triggerFilePicker}
          aria-label="Last opp nytt profilbilde med kamera eller bildebibliotek"
          title="Last opp profilbilde"
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-orange-600 hover:bg-orange-700 text-white border-2 border-white shadow-md flex items-center justify-center cursor-pointer active:scale-90 transition-all"
        >
          {justUpdated ? (
            <Check className="w-3.5 h-3.5 stroke-[2.8]" />
          ) : (
            <Camera className="w-3.5 h-3.5 stroke-[2.2]" />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Clear / Reset action when avatar is set */}
      {hasValidImage && (
        <button
          type="button"
          onClick={() => onAvatarChange('')}
          aria-label="Fjern profilbilde"
          className="mt-1.5 text-[10px] font-bold text-gray-500 hover:text-rose-600 flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Fjern</span>
        </button>
      )}

      {justUpdated && (
        <span className="mt-1 text-[10px] font-extrabold text-emerald-700">
          Oppdatert!
        </span>
      )}

      {errorMessage && (
        <span className="mt-1 text-[10px] font-bold text-rose-600 max-w-[90px] text-center leading-tight">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
