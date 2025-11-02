import "./Item.css";

const Item = ({ item }) => {
  if (!item) return <div className="text-center"> المنتج بدون تفاصيل</div>;

  return (
    <div className="text-center">
      <p className="text-sm mb-2">__ {item.description} __</p>
      <img
        src={item.image}
        alt={item.title}
        className="w-full max-h-[250px] object-contain rounded mb-4"
      />

      {item.category !== "Bag" && (
        <div className="text-right text-sm space-y-2">
          <div>
            <b>الهرم العطري</b>
          </div>
          <div>
            <span>القمة__ </span>
            <span>{item.top}</span>
          </div>
          <div>
            <span>القلب__ </span>
            <span>{item.heart}</span>
          </div>
          <div>
            <span>القاعدة__ </span>
            <span>{item.base}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
