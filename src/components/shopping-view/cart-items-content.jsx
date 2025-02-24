import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

function UserCartItemsContent({ cartItems }) {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // for delete
  function handleCartItemDelete(getCartItem) {
    toast({
      title: "Product deleted!",
    });
    if (!getCartItem || !getCartItem.productId) {
      console.error("Error: getCartItem is missing!");
      return;
    }

    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem.productId })
    );
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ₹{getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        <img
          src={cartItems?.image}
          alt={cartItems?.title}
          className="w-20 h-20 rounded object-cover mt-2"
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItems?.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              disabled={cartItems?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItems, "minus")}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartItems?.quantity}</span>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              // onClick={IncreaseValue}
              onClick={() => handleUpdateQuantity(cartItems, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            ₹
            {(
              (cartItems?.price > 0
                ? cartItems?.salePrice
                : cartItems?.salePrice) * cartItems?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCartItemDelete(cartItems)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </>
  );
}

export default UserCartItemsContent;
