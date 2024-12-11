const IndicatorLabel = ({
  color,
  attribute,
}: {
  color: string;
  attribute: string;
}) => {
  return (
    <div className="flex space-x-4 group hover:bg-muted/50 p-2 rounded-md transition-colors">
      <div className={`flex h-2 w-2 translate-y-1.5 rounded-full ${color}`} />
      <div className="flex flex-col space-y-1 flex-1">
        <p className="text-sm text-muted-foreground">{attribute}</p>
      </div>
    </div>
  );
};

export default IndicatorLabel;
