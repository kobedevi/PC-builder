
const PriceCalc = ({info, setTotalPrice=null}) => {
  const totalPrices = [0.00]
  Object.entries(info).map(([key, value], i) => {
    if (!key.startsWith("id") && !key.startsWith("name")){
      if(!Array.isArray(value) && Object.keys(value).length > 0) {
        totalPrices.push( isNaN(parseFloat(value?.price)) ? 0 : parseFloat(value?.price))
      } if(Array.isArray(value) && value.length > 0) {
        value.map((val) => {
          return (
            totalPrices.push( isNaN(parseFloat(val?.price)) ? 0 : parseFloat(val?.price))
          )
        })
      }
    } 
    return;
  })
  
  const numOr0 = n => isNaN(n) ? 0 : n
  
  let totalPrice = 0.00;
  totalPrices.map((itemPrice) => {
    totalPrice = parseFloat(totalPrice) + parseFloat(numOr0(itemPrice));
    if(setTotalPrice) {
      return setTotalPrice(totalPrice);
    }
    return;
  })
  
  return (
      <div className="item">
        <p style={{margin:0, padding:".5rem 1rem"}}>
          <b className='price'>Total: €{parseFloat(totalPrice).toFixed(2)}</b>
        </p>
      </div>
  )
}

export default PriceCalc