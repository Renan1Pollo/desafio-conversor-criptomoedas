import { useEffect, useState } from "react";
import { Button } from "../components/buttons/Button";
import { Card } from "../components/cards/Card";
import { Input } from "../components/inputs/Input";
import type { Option } from "../components/inputs/SelectInput";
import { SelectInput } from "../components/inputs/SelectInput";
import { HistoryTable } from "../components/tables/HistoryTable";
import { FavoriteCoins } from "../features/conversion/FavoriteCoins";
import { convertCrypto, getConversionHistory } from "../services/conversionHistoryService";
import { fetchCryptos } from "../services/cryptoService";
import { addFavoriteCrypto, getFavoriteCryptos, removeFavoriteCrypto } from "../services/favoriteCryptoService";
import type { ConversionHistoryResponse } from "../types/ConversionHistoryResponse";
import type { Crypto } from "../types/Crypto";
import { buildCryptoOptions } from "../utils/buildCryptoOptions";
import { mapFavoriteToCrypto } from "../utils/mapFavoriteToCrypto";
import { mapHistoryToTable } from "../utils/mapHistoryToTable";
import { logError } from "../utils/log";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [favoriteCryptos, setFavoriteCryptos] = useState<Crypto[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [quantity, setQuantity] = useState("");
  const [historyItems, setHistoryItems] = useState<ConversionHistoryResponse[]>([]);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [cryptosData, favoritesRaw, historyData] = await Promise.all([
        fetchCryptos(),
        getFavoriteCryptos(),
        getConversionHistory(),
      ]);

      setCryptos(cryptosData);
      setFavoriteCryptos(mapFavoriteToCrypto(favoritesRaw));
      setHistoryItems(historyData);
    } catch (error) {
      logError("Erro ao carregar dados iniciais:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const convertSelectedCrypto = async () => {
    if (!selectedCrypto || !quantity) return;

    const conversionRequest = buildConversionRequest(selectedCrypto, quantity);

    try {
      const newConversion = await convertCrypto(conversionRequest);
      prependNewConversionToHistory(newConversion);
      setQuantity("");
      setConversionError(null);
    } catch (error: any) {
      logError("Erro ao converter:", error);
      if (error?.response?.status === 400 && error.response.data?.error) {
        setConversionError(error.response.data.error);
      } else {
        setConversionError(null);
      }
    }
  }

  const buildConversionRequest = (crypto: Crypto, qty: string) => ({
    cryptoId: crypto.cryptoId,
    cryptoName: crypto.cryptoName,
    coinSymbol: crypto.coinSymbol,
    coinImage: crypto.coinImage,
    priceUSD: crypto.priceUSD,
    priceBRL: crypto.priceBRL,
    quantity: Number(qty),
  });

  const prependNewConversionToHistory = (conversion: ConversionHistoryResponse) => {
    setHistoryItems((prev) => [conversion, ...prev]);
  };

  const updateSelectedCrypto = (symbol: string) => {
    const found = cryptos.find((crypto) => crypto.coinSymbol === symbol);
    setSelectedCrypto(found || null);
  };

  const toggleCryptoFavorite = async (symbol: string) => {
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
      } else {
        await addFavoriteCrypto(crypto);
        setFavoriteCryptos((prev) => [...prev, crypto]);
      }
    } catch (error) {
      logError("Erro ao atualizar favoritos:", error);
    }
  };

  const cryptoOptions: Option[] = buildCryptoOptions(cryptos, favoriteCryptos);

  return (
    <div className="p-8 flex flex-col gap-6 items-center bg-gray-100 min-h-screen">
      <div className="hidden sm:block absolute top-2 right-4">
        <Button variant="danger" onClick={logout}>Sair</Button>
      </div>
      <div className="sm:hidden mb-4 w-full flex justify-end">
        <Button variant="danger" onClick={logout}>Sair</Button>
      </div>

      <Card className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Conversão</h2>

        <FavoriteCoins
          coins={favoriteCryptos}
          selectedCrypto={selectedCrypto?.coinSymbol || ""}
          onSelect={updateSelectedCrypto}
        />

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <SelectInput
            title="Criptomoeda"
            options={cryptoOptions}
            value={selectedCrypto?.coinSymbol || ""}
            onChange={updateSelectedCrypto}
            onToggleFavorite={toggleCryptoFavorite}
          />

          <Input
            id="quantity"
            label="Quantidade"
            name="quantity"
            type="text"
            inputMode="decimal"
            required
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value.replace(",", "."));
            }}
          />
        </div>

        {conversionError && (
          <div className="mb-2 w-full text-red-600 text-sm font-medium text-center">
            {conversionError}
          </div>
        )}

        <Button
          type="button"
          variant="primary"
          className="w-full"
          onClick={convertSelectedCrypto}
        >
          Converter
        </Button>
      </Card>

      <HistoryTable items={mapHistoryToTable(historyItems)} />
    </div>
  );
};
