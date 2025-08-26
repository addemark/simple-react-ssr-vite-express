import React from "react";
import Home from "./pages/Home";
// const ConfirmReviewPage = lazy(() => import("./pages/ConfirmationReviewPage"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Orders = lazy(() => import("./pages/Orders"));
// const SignUp = lazy(() => import("./pages/SignUp"));
// const PhoneConfirmation = lazy(() => import("./pages/InsertCodePage"));
// const CreateReview = lazy(() => import("./pages/CreateReviewPage"));
// const CreateAudioReview = lazy(() => import("./pages/CreateAudioReviewPage"));
// const CreateTextReview = lazy(() => import("./pages/CreateTextReviewPage"));
import NotFoundPage from "./pages/404/NotFoundPage";
// const EditReview = lazy(() => import("./pages/EditReviewPage"));

export const publicRoutes = [
  {
    path: "/",
    element: () => <Home />,
  },
  // {
  //   path: "/signin",
  //   element: () => <SignUp />,
  // },
  // {
  //   path: "/signup",
  //   element: () => <SignUp />,
  // },
  // {
  //   path: "/phone-confirmation",
  //   element: () => <PhoneConfirmation />,
  // },
  // {
  //   path: "/new-review/:reviewId",
  //   element: () => <CreateReview />,
  // },
  // {
  //   path: "/new-audio-review/:reviewId",
  //   element: () => <CreateAudioReview />,
  // },
  // {
  //   path: "/new-text-review/:reviewId",
  //   element: () => <CreateTextReview />,
  // },
  // {
  //   path: "/save-review/:reviewId",
  //   element: () => <ConfirmReviewPage />,
  // },
  // { path: "/edit-review/:reviewId", element: () => <EditReview /> },
];

// export const privateRoutes = [
//   {
//     path: "/dashboard",
//     element: () => <Dashboard />,
//   },
//   {
//     path: "/orders",
//     element: () => <Orders />,
//   },
// ];

export const notFoundRoute = {
  path: "*",
  element: () => <NotFoundPage />,
};
