import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl flex items-center justify-center">
          Payment is successfull!
        </CardTitle>
      </CardHeader>
      <div className="flex justify-center items-center mt-5">
        <Button
          className=" flex items-center justify-center"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </div>
    </Card>
  );
}

export default PaymentSuccessPage;
