import { useToast } from "@/hooks/use-toast";

export const useShowToast = () => {
  const { toast } = useToast();

  const showToast = (
    title: string,
    description: string,
    variant: "default" | "destructive" = "default"
  ) => {
    toast({
      title,
      description,
      variant,
      duration: 3000,
      className: `${
        variant === "destructive" ? "bg-red-500" : "bg-green-500"
      } text-white`,
    });
  };

  return { showToast };
};
