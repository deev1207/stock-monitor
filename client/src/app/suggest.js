import './globals.css'

export default function Suggest({ stocks, handleStock }) {
  const handleClick = (stock) => {
    handleStock(stock);
  };
  const stocks_arr = [];
  for (const item of stocks) {
    stocks_arr.push(
      <>
        <div className="test">
          <div className="stock">{item["name"]}</div>
          <div className="stock">{item["symbol"]}</div>
          <button onClick={() => handleClick(item)}>add</button>
        </div>
      </>
    );
  }
  console.log(stocks_arr);

  return (
    <>
      <div className="stocks-container">{stocks_arr}</div>
    </>
  );
}
