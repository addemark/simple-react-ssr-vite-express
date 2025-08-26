import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Link } from "react-router";
// import { useDispatch } from "react-redux";
// import { addDataToFirebase } from "../redux/actions/projectActions";
// import { ThunkDispatch } from "redux-thunk";
// import { UnknownAction } from "redux";
// import {
//   // getAuth,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { auth, db } from "../config/fbConfig";
// import { doc, getDoc } from "firebase/firestore";

// type DispatchType = ThunkDispatch<
//   DispatchParamType,
//   DispatchParamType,
//   UnknownAction
// >;
const Home = function () {
  const { t, i18n } = useTranslation();

  // const dispatch: DispatchType = useDispatch();
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const docRef = doc(db, "projects", "docId");
  //       const snap = await getDoc(docRef);
  //       console.log(snap.data());
  //     }
  //   });
  // }, []);

  // const addEvent = async () => {
  //   await dispatch<Promise<void>>(addDataToFirebase({}));
  // };
  // function mailAuth() {
  //   createUserWithEmailAndPassword(auth, "razvan.paiusi@gmail.com", "qwerty")
  //     .then((userCredential) => {
  //       // Signed up
  //       const user = userCredential.user;
  //       console.log("[******]", user);

  //       // ...
  //     })
  //     .catch((error: unknown) => {
  //       let errorMessage = "error.message";
  //       const errorCode = (error as { code: string }).code;
  //       if (error instanceof Error) {
  //         errorMessage = error.message;
  //       }
  //       console.log("[******]", errorCode, errorMessage);

  //       // ..
  //     });
  // }
  // function mailLogin() {
  //   signInWithEmailAndPassword(auth, "razvan.paiusi@gmail.com", "qwerty")
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log("[******]", user);
  //       // ...
  //     })
  //     .catch((error: { code: string; message: string }) => {
  //       const errorCode = error.code;
  //       let errorMessage = "error.message";
  //       if (error instanceof Error) errorMessage = error.message;
  //       console.log("[******]", errorCode, errorMessage);
  //     });
  // }
  return (
    <div className="p-6">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4">{t("welcome")}</h1>
      <p className="mb-4">{t("Home.title")}</p>
      <div className="space-y-2">
        <button onClick={() => {}} className="bg-black text-white p-3 block">
          {t("Home.loginButton")}
        </button>
        <button onClick={() => {}} className="bg-black text-white p-3 block">
          {t("Home.addEventButton")}
        </button>
      </div>
      <Link
        to={{ pathname: "/asd", search: `lang=${i18n.language.split("-")[0]}` }}
      >
        404Page
      </Link>
    </div>
  );
};

export default Home;
