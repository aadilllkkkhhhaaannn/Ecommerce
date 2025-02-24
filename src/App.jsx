import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./Pages/auth/login";
import AuthRegister from "./Pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./Pages/admin-view/dashboard";
import AdminFeatures from "./Pages/admin-view/features";
import AdminOrders from "./Pages/admin-view/orders";
import AdminProducts from "./Pages/admin-view/products";
import NotFound from "./Pages/not-found";
import ShoppingAccount from "./Pages/shopping-view/account";
import ShoppingCheckout from "./Pages/shopping-view/checkout";
import ShoppingHome from "./Pages/shopping-view/home";
import ShoppingListing from "./Pages/shopping-view/listing";
import ShoppingLayout from "./components/shopping-view/layout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./Pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import AdminUsers from "./Pages/admin-view/users";
import PaypalReturnPage from "./Pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./Pages/shopping-view/payment-success";
import SearchProducts from "./Pages/shopping-view/search";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-[800] bg-black h-[600px]" />;
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth
                isAuthenticated={isAuthenticated}
                user={user}
              ></CheckAuth>
            }
          />
          {/* Auth routes with nested paths */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          {/* Admin routes with nested paths */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          {/* Shopping routes with nested paths */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
          </Route>
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
