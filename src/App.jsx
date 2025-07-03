import React from 'react';
import Header from './layouts/Header'; 

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Tailwind CSSを読み込むためのスクリプト */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Interフォントを読み込むためのスクリプト */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      {/* Headerコンポーネントをレンダリング */}
      <Header />

      <main className="container mx-auto p-4 mt-8">
        {/* ここに他のコンテンツを追加できます */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">メインコンテンツ</h2>
        <p className="text-gray-600">ここにダッシュボードの統計やグラフなどのメインコンテンツが表示されます。</p>
      </main>
    </div>
  );
};

export default App;
