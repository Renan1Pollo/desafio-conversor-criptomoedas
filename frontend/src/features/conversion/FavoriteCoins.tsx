import type { FC } from "react";
import { FaStar } from "react-icons/fa";
import type { Crypto } from "../../types/Crypto";

interface FavoriteCoinsProps {
  coins: Crypto[];
  selectedCrypto: string;
  onSelect: (id: string) => void;
}

export const FavoriteCoins: FC<FavoriteCoinsProps> = ({
  coins,
  selectedCrypto,
  onSelect,
}) => {
  const getCoinClasses = (coinId: string) => {
    const baseClasses = "relative flex items-center gap-2 px-3 py-1 pr-7 rounded-full text-sm font-medium cursor-pointer";
    const selectedClasses = "border border-blue-500 shadow-sm bg-white text-black";
    const defaultClasses = "bg-gray-100 text-black hover:bg-gray-200";

    return `${baseClasses} ${
      selectedCrypto === coinId ? selectedClasses : defaultClasses
    }`;
  };

  return (
    <section className="mb-4" aria-labelledby="favorites-heading">
      <h2 id="favorites-heading" className="font-medium mb-2 text-base">
        Favoritos
      </h2>
      <ul className="flex flex-wrap gap-2">
        {coins.map(({ cryptoId, cryptoName, coinSymbol, coinImage }) => (
          <li key={cryptoId}>
            <button
              type="button"
              className={getCoinClasses(coinSymbol)}
              onClick={() => onSelect(coinSymbol)}
              aria-pressed={selectedCrypto === coinSymbol}
              aria-label={`Selecionar ${cryptoName}`}
            >
              <img
                src={coinImage}
                alt={`${cryptoName} logo`}
                className="w-5 h-5 rounded-full"
              />
              <span>
                {cryptoName} ({coinSymbol.toUpperCase()})
              </span>

              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-yellow-400">
                <FaStar size={16} aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
