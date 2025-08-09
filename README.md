# RareTECH フロント
## 使用技術
- [x] React 
- [x] React Router v7
- [x] Tailwindscc v4
- [x] bun
- [x] Biome


ローカルで動かすには？
bun install
bun run dev


EC2で動かすには？
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
bun install
bun run dev -- --host 0.0.0.0