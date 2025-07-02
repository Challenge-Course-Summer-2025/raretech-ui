import { useState } from 'react'
import './App.css'
import Button from './components/TestClsx'

function App() {
  const [button, setButton] = useState(false);

  const handleButtonClick = () => {
    setButton(!button); 
    // alert(`ボタンの状態が ${button ? "非アクティブ" : "アクティブ"} に変わりました！`);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-sky-900">
      <div className="bg-white p-8 rounded-lg shadow-md justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hello!
        </h1>
        <p className="text-gray-600 mb-4">
          開発環境が正常に構築されました。
        </p>
        
        <Button isActive={button} onClick={handleButtonClick}>

        </Button>
      </div>
    </div>
  )
}

export default App