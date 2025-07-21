import React from 'react';
// Importa o nosso banco de dados simulado
import { africaDoSulData } from './database.js';

// --- Componentes de Bloco de Conteúdo ---
// Estes são pequenos "tijolos" que usamos para construir a página.

// Componente para renderizar um parágrafo
const Paragrafo = ({ texto }) => texto ? <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: texto }}></p> : null;

// Componente para renderizar um subtítulo
const Subtitulo = ({ texto }) => texto ? <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">{texto}</h3> : null;

// Componente para renderizar um item de lista
const ItemLista = ({ texto }) => texto ? <li className="mb-2 pl-4 border-l-4 border-blue-500" dangerouslySetInnerHTML={{ __html: texto }}></li> : null;

// Componente para renderizar uma Dica OnliPrep
const Dica = ({ titulo, texto }) => (
  titulo && texto ? (
    <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
      <p className="font-bold text-blue-800">{titulo}</p>
      <p className="text-blue-700">{texto}</p>
    </div>
  ) : null
);

// Componente para renderizar um Alerta
const Alerta = ({ titulo, texto }) => (
  titulo && texto ? (
    <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <p className="font-bold text-yellow-800">{titulo}</p>
      <p className="text-yellow-700">{texto}</p>
    </div>
  ) : null
);

// Componente para renderizar as Fontes
const Fonte = ({ titulo, url, url2 }) => (
  titulo && url ? (
    <div className="mt-6 text-sm text-gray-500">
      <p className="font-bold">{titulo}:</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{url}</a>
      {url2 && <a href={url2} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline break-all mt-1">{url2}</a>}
    </div>
  ) : null
);


// --- Componente Principal do App ---
// Este é o componente que monta a página inteira.
export default function App() {
  // Pega os dados do nosso arquivo database.js
  const data = africaDoSulData;

  // Extrai os temas para facilitar o uso
  const tema1 = data.tema_01_pais;
  const tema2 = data.tema_02_cidades;
  const tema3 = data.tema_03_vistos;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800">OnliPrep</h1>
          <p className="text-gray-600">Seu Guia de Intercâmbio Definitivo</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          
          {/* Título Principal do Guia */}
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 pb-4">
            Guia de Intercâmbio: {data.pais}
          </h2>

          {/* Seção Tema 1: O País */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{tema1.titulo}</h2>
            <Paragrafo texto={tema1.p1} />
            <Paragrafo texto={tema1.p2} />
            <Paragrafo texto={tema1.p3} />
            <Dica titulo={tema1.dica_titulo} texto={tema1.dica_texto} />
            <Fonte titulo={tema1.fonte_titulo} url={tema1.fonte_url} />
          </section>

          {/* Seção Tema 2: As Cidades */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{tema2.titulo}</h2>
            <Paragrafo texto={tema2.p1} />
            <Subtitulo texto={tema2.sub_1} />
            <Paragrafo texto={tema2.p2} />
            <Paragrafo texto={tema2.p3} />
            <Paragrafo texto={tema2.p4} />
            <Paragrafo texto={tema2.p5} />
            <Subtitulo texto={tema2.sub_2} />
            <Paragrafo texto={tema2.p6} />
            <Paragrafo texto={tema2.p7} />
            <Paragrafo texto={tema2.p8} />
            <Paragrafo texto={tema2.p9} />
            <Dica titulo={tema2.dica_titulo} texto={tema2.dica_texto} />
          </section>

          {/* Seção Tema 3: Vistos e Imigração */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{tema3.titulo}</h2>
            <Paragrafo texto={tema3.p1} />
            <Paragrafo texto={tema3.p2} />
            <Subtitulo texto={tema3.sub_1} />
            <Paragrafo texto={tema3.p3} />
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <ItemLista texto={tema3.lista_1} />
              <ItemLista texto={tema3.lista_2} />
            </ul>
            <Alerta titulo={tema3.alerta_titulo} texto={tema3.alerta_texto} />
            <Subtitulo texto={tema3.sub_2} />
            <Paragrafo texto={tema3.p4} />
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <ItemLista texto={tema3.lista_3} />
              <ItemLista texto={tema3.lista_4} />
              <ItemLista texto={tema3.lista_5} />
            </ul>
            <Dica titulo={tema3.dica_titulo} texto={tema3.dica_texto} />
            <Fonte titulo={tema3.fonte_titulo} url={tema3.fonte_url} url2={tema3.fonte_2_url} />
          </section>

        </div>
      </main>
    </div>
  );
}
