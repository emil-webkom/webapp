import { Header } from "./header";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { BackButton } from "./back-button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Mauritz har gjort noe galt :(" />
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </CardContent>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
