"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout, { Content } from "antd/es/layout/layout";
import theme from "./themeConfig";
import Container from "@/components/Container";
import Link from "next/link";
import ConfigProvider from "antd/es/config-provider";
import ChartPlaceholder from "@/components/ChartPlaceholder";
import DistributionSliderChart from "@/components/DistributionSliderChart";

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

              <h2 className="self-start pt-12 text-3xl">Úspěšnost stanic</h2>
              <div className="w-full py-4 mb-8">
                <section className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-slate-700">Vývoj průchodnosti podle stanice</h3>
                  <p className="text-slate-600">Graf zobrazuje procentuální podíl vozidel, která nevyhoví emisním limitům. Stanice jsou rozděleny do čtyř skupin na základě jejich dlouhodobých výsledků (10 % a 50 % stanic s nejvyšším počtem nevyhovujících vozidel a 10 % a 50 % stanic s nejnižším počtem). Zobrazení ukazuje statistické rozdíly ve výsledcích kontrol mezi těmito skupinami v čase.</p>
                  <ChartPlaceholder 
                    filename="vyvoj_pruchodnosti_podle_stanice.svg" 
                    altText="Vývoj podílu vozidel, která měření absolvují neúspěšně" 
                  />
                </section>
              </div>

              <h2 className="self-start pt-6 text-3xl">Časová náročnost měření</h2>
              <div className="w-full py-4 mb-8">
                <section className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-slate-700">Délka měření</h3>
                  <p className="text-slate-600">Vizualizace času potřebného k provedení kontroly od jejího zahájení do ukončení. Křivky ukazují běžnou délku měření (medián) a časy nejrychlejších kontrol (nejkratších 10 %, 1 % a 0,1 % měření). Umožňuje srovnání zaznamenaných časů s technologickým minimem potřebným k provedení předepsaných úkonů.</p>
                  <ChartPlaceholder 
                    filename="delka_prohlidky.svg" 
                    altText="Rozložení délky měření emisí v čase (kvantily)" 
                  />
                </section>
              </div>

              <h2 className="self-start pt-6 text-3xl">Vývoj hraničních a mezních hodnot</h2>
              <p className="pt-4 text-slate-600">Přehled měření, u kterých se zaznamenané hodnoty nacházejí na okraji nebo mimo předepsané tolerance, avšak celkový výsledek zkoušky je hodnocen jako vyhovující.</p>
              <div className="w-full py-4 mb-8">
                <section className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-slate-700">Celkové anomálie u měření</h3>
                  <p className="text-slate-600">Sleduje procento úspěšně ukončených kontrol, u kterých systém přijal hrubá data ležící zcela mimo povolené rozmezí. Ukazuje propustnost centrálního informačního systému pro nestandardní vstupy.</p>
                  <ChartPlaceholder 
                    filename="mereni_anomalie_celkove.svg" 
                    altText="Podíl úspěšných měření s hodnotami mimo povolený rozsah" 
                  />
                </section>
                <section className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-slate-700">Krajní hodnoty: Otáčky</h3>
                  <p className="text-slate-600">Časová řada ukazující, jak často se výsledné otáčky motoru (u benzinu i nafty) shodují přesně s hraniční hodnotou povoleného limitu.</p>
                  <ChartPlaceholder 
                    filename="mereni_krajni_hodnoty_otacky.svg" 
                    altText="Podíl měření otáček na hranici povoleného intervalu" 
                  />
                </section>
                <section className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-slate-700">Krajní hodnoty: Akcelerace</h3>
                  <p className="text-slate-600">Časová řada ukazující frekvenci výskytu času akcelerace (u naftových motorů) přesně na limitní hranici.</p>
                  <ChartPlaceholder 
                    filename="mereni_krajni_hodnoty_akcelerace.svg" 
                    altText="Podíl času akcelerace na hranici intervalu" 
                  />
                </section>
              </div>

              <h2 className="self-start pt-6 text-3xl">Detailní rozložení parametrů (Měsíční přehledy)</h2>
              <div className="w-full py-4 mb-8">
                <p className="pb-4 text-slate-600">Detailní distribuce fyzikálních veličin (otáčky, kouřivost, čas akcelerace) u všech měření v daném měsíci. Pro srozumitelnost jsou hodnoty přepočítány na jednotnou stupnici od 0 (spodní limit) do 1 (horní limit). Zobrazuje reálný tvar rozdělení naměřených dat v populaci vozidel a vizualizuje jevy popsané v předchozí sekci – zejména přesné koncentrace výsledků na krajních hodnotách (bod 0 a bod 1).</p>
                <DistributionSliderChart />
              </div>

            </div>
          </Container>
        </Content>
        <Footer></Footer>
      </Layout>
    </ConfigProvider>
  );
}
