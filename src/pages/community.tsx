import React from "react";
import NavbarComponent from "@/components/Navbar";
import Community from "@/components/Community/Community";
import { useQuery } from "react-query";
import { getAllQueries } from "./api/Query";
import Loading from "@/components/Loading";

function community() {
  const {
    status,
    error,
    data: queries,
  } = useQuery({
    queryKey: ["getAllQueries"],
    queryFn: () => getAllQueries(),
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (queries === null || queries === undefined) return <h1>Error</h1>;

  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Community queries={queries.data}></Community>
    </>
  );
}

export default community;
