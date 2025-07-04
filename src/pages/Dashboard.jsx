const Dashboard = () => {
    return (
      <main className="container mx-auto p-6">
        {/* 
            統計カード 
            後でカードコンポーネントに入れる
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
            <div className="text-gray-600">今月の投稿数</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">234</div>
            <div className="text-gray-600">総クリック数</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3.2%</div>
            <div className="text-gray-600">CTR</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">エラー件数</div>
          </div>
        </div>
  
        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 自動投稿botの状況 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              🤖 自動投稿botの状況
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Qiita記事チェック</span>
                <span className="text-blue-600">15分毎実行</span>
              </div>
              <div className="flex justify-between items-center">
                <span>X API接続</span>
                <span className="text-green-600">正常</span>
              </div>
              <div className="flex justify-between items-center">
                <span>今日の投稿記事</span>
                <span className="text-blue-600">3件</span>
              </div>
              <div className="flex justify-between items-center">
                <span>投稿済み</span>
                <span className="text-blue-600">2件</span>
              </div>
            </div>
          </div>
  
          {/* 直近の投稿効果 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              📊 直近の投稿効果
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">14:30</div>
                  <div className="font-medium">AWS Lambda入門</div>
                  <div className="text-sm text-gray-500">田中一郎さん</div>
                </div>
                <div className="text-blue-600">クリック23件</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">11:20</div>
                  <div className="font-medium">React Hook活用</div>
                  <div className="text-sm text-gray-500">山田太郎さん</div>
                </div>
                <div className="text-blue-600">クリック18件</div>
              </div>
            </div>
          </div>
        </div>
  
        {/* システム概要 */}
        <div className="bg-blue-50 p-4 rounded-lg mt-8">
          <div className="flex items-start space-x-2">
            <div className="text-blue-600 mt-1">💡</div>
            <div className="text-sm text-blue-800">
              <strong>システム概要:</strong> RareTECH受講生のQiita記事を15分毎に自動検出し、テンプレートに基づいてX（旧Twitter）に自動投稿します。投稿には体験授業予約リンクが含まれます。
            </div>
          </div>
        </div>
      </main>
    );
};

export default Dashboard;