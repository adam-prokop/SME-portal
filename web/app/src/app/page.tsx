"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout, { Content } from "antd/es/layout/layout";
import theme from "./themeConfig";
import Container from "@/components/Container";
import Link from "next/link";
import ConfigProvider from "antd/es/config-provider";

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Header></Header>
        <Content className="flex flex-col items-stretch w-full mx-auto lg:w-10/12 2xl:w-8/12">
          <Container>
            <div className="flex flex-col">
              <div className="flex flex-row items-center self-center py-6 space-x-6">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width="64"
                  height="64"
                  className="self-center"
                ></Image>
                <h1 className="text-4xl font-bold">SME Portál</h1>
              </div>

              <p className="leading-relaxed">
                Vítejte na SME portálu. Naleznete zde informace o stanicích
                měření emisí, detaily o vozidlech v ČR a predikci rizikovosti 
                závad na základě VIN.
                <Link href="/about">Více o portálu a datech...</Link>
              </p>

              <div className="flex flex-col items-center justify-center my-8 text-center bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Znáte riziko svého vozidla?</h2>
                <Link href="/vehicles" className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-colors">
                  Ověřit VIN v našem modelu
                </Link>
              </div>

              <h2 className="self-start pt-12 text-3xl">Časové řady</h2>
              <div className="w-full py-4 min-h-[300px] border-2 border-dashed border-gray-300 flex items-center justify-center mb-8">
                 <span className="text-gray-400">Zde bude SVG: Všechny průchodnosti</span>
              </div>
              <div className="w-full py-4 min-h-[300px] border-2 border-dashed border-gray-300 flex items-center justify-center mb-8">
                 <span className="text-gray-400">Zde bude SVG: Délky nejrychlejších prohlídek</span>
              </div>

              <h2 className="self-start pt-6 text-3xl">Výsledky měření</h2>
              <div className="w-full py-4 min-h-[300px] border-2 border-dashed border-gray-300 flex items-center justify-center mb-8">
                 <span className="text-gray-400">Zde bude SVG: Výsledky vozidel s možností posunu</span>
              </div>

            </div>
          </Container>
        </Content>
        <Footer></Footer>
      </Layout>
    </ConfigProvider>
  );
}
