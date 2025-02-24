import { useDispatch, useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast, useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};
function AdminOrdersDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllOrdersForAdmin());
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center mt-6 justify-between">
              {/* <p className="font-medium">Order ID</p> */}
              {/* <Label>{orderDetails?._id}</Label> */}
            </div>

            <div className="flex items-center mt-2 justify-between">
              {/* <p className="font-medium">Order Price</p> */}
              {/* <Label>₹{orderDetails?.totalAmount}</Label> */}
            </div>
            <div className="flex items-center mt-2 justify-between">
              <p className="font-medium">Order Date</p>
              <Label> {orderDetails?.orderDate?.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>
            <div className="flex items-center mt-2 justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                {" "}
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>
          <Separator />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems?.map((item) => (
                      <li className="flex items-center justify-between">
                        <span>Title: {item?.title}</span>
                        <span>Quantity: {item?.quantity}</span>
                        <span>Price: ₹{item?.price}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Name :-{user.userName}</span>
                <span>Address :-{orderDetails?.addressInfo?.address}</span>
                <span>City :-{orderDetails?.addressInfo?.city}</span>
                <span>Pincode :-{orderDetails?.addressInfo?.pincode}</span>
                <span>Phone :-{orderDetails?.addressInfo?.phone}</span>
                <span>Note :-{orderDetails?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>  
          <div>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default AdminOrdersDetailsView;
