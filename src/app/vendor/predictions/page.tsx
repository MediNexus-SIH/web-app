import { PredictionTable, PredictionItem } from "../components/prediction-table";
import { Button } from "@/components/ui/button";

const samplePredictions: PredictionItem[] = [
  {
    id: "1",
    name: "Paracetamol",
    currentStock: 105,
    predictedDemand: 500,
    recommendedOrder: 395,
    recommendedOrderDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Endoscope",
    currentStock: 10,
    predictedDemand: 15,
    recommendedOrder: 5,
    recommendedOrderDate: "2023-06-20",
  },
  {
    id: "3",
    name: "Antacid",
    currentStock: 500,
    predictedDemand: 1000,
    recommendedOrder: 500,
    recommendedOrderDate: "2023-06-18",
  },
  {
    id: "4",
    name: "Barium Swallow",
    currentStock: 100,
    predictedDemand: 150,
    recommendedOrder: 50,
    recommendedOrderDate: "2023-06-25",
  },
  {
    id: "5",
    name: "Colonoscope",
    currentStock: 5,
    predictedDemand: 8,
    recommendedOrder: 3,
    recommendedOrderDate: "2023-07-01",
  },
];

export default function PredictionsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/40">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Order Predictions</h2>
        <div className="flex items-center space-x-2">
          <Button>Refresh Predictions</Button>
        </div>
      </div>
      <PredictionTable data={samplePredictions} />
    </div>
  );
}
