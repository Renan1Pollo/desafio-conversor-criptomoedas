import { useEffect, useState } from "react";
import { Button } from "../components/buttons/Button";
import { Card } from "../components/cards/Card";
import { Input } from "../components/inputs/Input";
import { SelectInput } from "../components/inputs/SelectInput";
import { HistoryTable } from "../components/tables/HistoryTable";
import { FavoriteCoins } from "../features/conversion/FavoriteCoins";
import { fetchCryptos } from "../services/cryptoService";
import {
  addFavoriteCrypto,
  removeFavoriteCrypto,
  getFavoriteCryptos,
} from "../services/favoriteCryptoService";
import { buildCryptoOptions } from "../utils/buildCryptoOptions";
import { mapFavoriteToCrypto } from "../utils/mapFavoriteToCrypto";

import type { Crypto } from "../types/Crypto";
import type { Option } from "../components/inputs/SelectInput";

export const Home = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [favoriteCryptos, setFavoriteCryptos] = useState<Crypto[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [quantity, setQuantity] = useState("");
  const [historyItems, setHistoryItems] = useState<any[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [cryptosData, favoritesRaw] = await Promise.all([
        fetchCryptos(),
        getFavoriteCryptos(),
      ]);

      setCryptos(cryptosData);
      setFavoriteCryptos(mapFavoriteToCrypto(favoritesRaw));
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    }
  };

  const selectCryptoBySymbol = (symbol: string) => {
    const found = cryptos.find((crypto) => crypto.coinSymbol === symbol);
    setSelectedCrypto(found || null);
  };

  const toggleFavoriteCrypto = async (symbol: string) => {
    const crypto = cryptos.find((c) => c.coinSymbol === symbol);
    if (!crypto) return;

    const isFavorite = favoriteCryptos.some(
      (f) => f.cryptoId === crypto.cryptoId
    );

    try {
      if (isFavorite) {
        await removeFavoriteCrypto(crypto.cryptoId);
        setFavoriteCryptos((prev) =>
          prev.filter((f) => f.cryptoId !== crypto.cryptoId)
        );
        return;
      }

      await addFavoriteCrypto(crypto);
      setFavoriteCryptos((prev) => [...prev, crypto]);
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };

  const cryptoOptions: Option[] = buildCryptoOptions(cryptos, favoriteCryptos);

  return (
    <div className="p-8 flex flex-col gap-6 items-center bg-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Conversão</h2>

        <FavoriteCoins
          coins={favoriteCryptos}
          selectedCrypto={selectedCrypto?.coinSymbol || ""}
          onSelect={selectCryptoBySymbol}
        />

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <SelectInput
            title="Criptomoeda"
            options={cryptoOptions}
            value={selectedCrypto?.coinSymbol || ""}
            onChange={selectCryptoBySymbol}
            onToggleFavorite={toggleFavoriteCrypto}
          />

          <Input
            id="quantity"
            label="Quantidade"
            name="quantity"
            type="number"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Converter
        </Button>
      </Card>

      <HistoryTable items={historyItems} />
    </div>
  );
};
