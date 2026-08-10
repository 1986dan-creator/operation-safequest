type ShopItem = {
  avatar: string;
  name: string;
  cost: number;
};

type ShopScreenProps = {
  coins: number;
  items: ShopItem[];
  unlockedAvatars: string[];
  onBuy: (avatar: string, cost: number, name: string) => void;
  onBack: () => void;
};

export function ShopScreen({
  coins,
  items,
  unlockedAvatars,
  onBuy,
  onBack,
}: ShopScreenProps) {
  return (
    <main className="shop-screen">
      <section className="shop-card">
        <p className="section-label">AVATAR SHOP</p>
        <h1>🛍️ Spend your coins</h1>
        <p className="shop-coins">🪙 You have {coins} coins</p>

        <div className="shop-grid">
          {items.map((item) => {
            const isUnlocked = unlockedAvatars.includes(item.avatar);

            return (
              <button
                key={item.name}
                className={
                  isUnlocked
                    ? "shop-item shop-item-owned"
                    : "shop-item"
                }
                onClick={() => onBuy(item.avatar, item.cost, item.name)}
              >
                <span className="shop-avatar">{item.avatar}</span>
                <h2>{item.name}</h2>
                <p>
                  {isUnlocked
                    ? "✓ OWNED — SELECT"
                    : `🪙 ${item.cost} COINS`}
                </p>
              </button>
            );
          })}
        </div>

        <button className="back-button" onClick={onBack}>
          ← BACK TO ARCADE
        </button>
      </section>
    </main>
  );
}