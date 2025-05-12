import { Card } from '../cards/Card';

interface HistoryItem {
  date: string;
  crypto: string;
  quantity: string;
  usdValue: string;
  brlValue: string;
}

interface HistoryTableProps {
  items: HistoryItem[];
}

export const HistoryTable = ({ items }: HistoryTableProps) => {
  return (
    <Card className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Histórico de Conversões</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 border-gray-200 text-sm text-gray-600 font-medium">
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Criptomoeda</th>
              <th className="px-4 py-3">Quantidade</th>
              <th className="px-4 py-3">Valor (USD)</th>
              <th className="px-4 py-3">Valor (BRL)</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.crypto}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{item.usdValue}</td>
                <td className="px-4 py-3">{item.brlValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};