import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import FullScreenLoader from "./ui/FullScreenLoader";
import AppLayout from "./ui/AppLayout";
import { workerMenuItems, customerMenuItems } from "./ui/menuItems";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Error = lazy(() => import("./ui/Error"));
const ForgotPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// worker components
import WorkerDashboardPage from "./components/Worker/DashboardPage";
import ReviewsPage from "./components/Worker/ReviewsPage";
import WorkerProfilePage from "./components/Worker/ProfilePage";
import WorkerOrdersPage from "./components/Worker/OrdersPage";
// customer components
import CustomerDashboardPage from "./components/Customer/DashboardPage";
import CustomerOrders from "./components/Customer/CustomerOrders";
import CustomerProfilePage from "./components/Customer/ProfilePage";
import SearchWorkersPage from "./components/Customer/SearchWorkersPage";
import WorkerPage from "./components/Customer/WorkerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<FullScreenLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<FullScreenLoader />}>
        <Login />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<FullScreenLoader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<FullScreenLoader />}>
        <Register />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<FullScreenLoader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/forgetPassword",
    element: (
      <Suspense fallback={<FullScreenLoader />}>
        <ForgotPassword />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<FullScreenLoader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/resetPassword/:token",
    element: (
      <Suspense fallback={<FullScreenLoader />}>
        <ResetPassword />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<FullScreenLoader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/worker-dashboard",
    element: <AppLayout menuItems={workerMenuItems} userType="worker" />,
    children: [
      {
        index: true,
        element: <WorkerDashboardPage />,
      },
      {
        path: "orders",
        element: <WorkerOrdersPage />,
      },
      {
        path: "profile",
        element: <WorkerProfilePage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "*",
        element: <WorkerDashboardPage />,
      },
    ],
  },
  {
    path: "/customer-dashboard",
    element: <AppLayout menuItems={customerMenuItems} userType="customer" />,
    children: [
      {
        index: true,
        element: <CustomerDashboardPage />,
      },
      {
        path: "orders",
        element: <CustomerOrders />,
      },
      {
        path: "profile",
        element: <CustomerProfilePage />,
      },
      {
        path: "search",
        element: <SearchWorkersPage />,
      },
      {
        path: "worker/:workerId",
        element: <WorkerPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
