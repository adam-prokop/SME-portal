import SearchBox from "./SearchBox";
import Container from "@/components/Container";
import BreadcrumbsContainer from "@/components/BreadcrumbsContainer";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "antd/es/breadcrumb";

export const metadata: Metadata = {
  title: "Rizikovost vozidla - SME Portál",
};

export default function VehiclesPage() {
  return (
    <>
      <BreadcrumbsContainer>
        <Breadcrumb
          items={[
            { title: <Link href="/">SME portál</Link> },
            { title: "Rizikovost vozidla" },
          ]}
        ></Breadcrumb>
      </BreadcrumbsContainer>

      <Container>
        <h1 className="pb-4 text-3xl">Predikce rizikovosti vozidla</h1>
        <p className="pb-8 text-gray-600">Zadejte VIN kód vozidla (17 znaků) pro zjištění jeho rizikové třídy podle modelu stojového učení.</p>

        <SearchBox></SearchBox>
      </Container>
    </>
  );
}
