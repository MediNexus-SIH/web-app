import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ExpiryCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>
          Items that will expire within the next 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-yellow-500">12</div>
      </CardContent>
    </Card>
  );
};

export default ExpiryCard