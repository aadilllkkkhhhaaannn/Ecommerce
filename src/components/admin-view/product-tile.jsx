import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
function AdminProductTile({
  product,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  setFormData,
  handleDelete,
}) {
  return (
    <>
      <Card>
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
          <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`₹{
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ₹{product?.price}
              </span>

              <span className="text-lg font-bold">₹{product?.salePrice}</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}

export default AdminProductTile;
