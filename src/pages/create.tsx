import React, { useState, useEffect } from "react";
import CreateQuery from "@/components/CreateQuery";
import NavbarComponent from "@/components/Navbar";
import { useGlobalStore } from "./api/Global";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { getData } from "./api/Global";
import { Data } from "@/types/data";

function CreateQueryBody({ globalData }: { globalData: Data }) {
  const GlobalData = useGlobalStore((state) => state.data);
  const setGlobalData = useGlobalStore((state) => state.setData);
  useEffect(() => {
    if (GlobalData === null && globalData !== undefined)
      setGlobalData(globalData);
  }, [globalData]);
  if (GlobalData === null) return <div></div>;
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <CreateQuery></CreateQuery>
    </>
  );
}

function create() {
  const globalData = useGlobalStore((state) => state.data);

  const {
    status,
    error,
    data: data,
  } = useQuery({
    queryKey: ["getData"],
    queryFn: () => getData(),
    enabled: globalData === null,
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (data === null || data === undefined) return <h1>Error</h1>;

  return (
    <>
      <CreateQueryBody globalData={data.data}></CreateQueryBody>
    </>
  );
}

export default create;
