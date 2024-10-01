import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ReorderReqCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Reorder Requests</CardTitle>
        <CardDescription>
          Pending requests to reorder items that have fallen below the minimum
          stock level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-blue-500">8</div>
      </CardContent>
    </Card>
  );
};

export default ReorderReqCard