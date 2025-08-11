import React, { useEffect, useState } from "react";
import HospitalLogin from "../components/HospitalLogin";
import HospitalDashboard from "../components/HospitalDashboard";

const Hospital = () => {
  const [hospitalLoggedIn, setHospitalLoggedIn] = useState(false);

  useEffect(() => {
    const hospitalData = localStorage.getItem("hospitalData");
    if (hospitalData) setHospitalLoggedIn(true);
  }, []);

  return (
    <>
      {hospitalLoggedIn ? <HospitalDashboard /> : <HospitalLogin />}
    </>
  );
};

export default Hospital;
