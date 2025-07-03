// Header.jsx
import React from 'react';
import { Home, Settings, BarChart2, List, Search } from 'lucide-react'; 

const Header = () => {
  return (
    <header className="bg-blue-800 text-white p-4 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* ロゴとタイトル部分 */}
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 rounded-md p-2">
        {/* ここも別のコンポーネントに持たせるか迷い中 */}
            <span className="font-bold text-lg">RT</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">RareTECH</h1>
            <p className="text-sm text-blue-200">Qiita記事 → X自動投稿システム</p>
          </div>
        </div>

        {/* 運用管理画面ボタン */}
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
          運用管理画面
        </button>
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="container mx-auto mt-4">
        <ul className="flex space-x-2 md:space-x-4 lg:space-x-6 overflow-x-auto pb-2">
          <li>
            <button className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap">
              <Home size={18} />
              <span>ダッシュボード</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap">
              <List size={18} />
              <span>X投稿履歴</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap">
              <Search size={18} />
              <span>記事検出ログ</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap">
              <Settings size={18} />
              <span>設定</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap">
              <BarChart2 size={18} />
              <span>効果測定</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* システム概要のテキスト */}
      <div className="container mx-auto mt-4 text-blue-200 text-sm">
        <p>システム概要: RareTECH受講生のQiita記事を15分毎に自動検出、テンプレートに基づいてX(旧Twitter)に自動投稿します。投稿には体験授業予約リンクが含まれます。</p>
      </div>
    </header>
  );
};

export default Header;
