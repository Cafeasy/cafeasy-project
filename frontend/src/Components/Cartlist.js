import { useEffect, useState } from "react";
import "../Style/Cartlist.css";
function CartList({ cart }) {
  const [CART, setCART] = useState([]);

  useEffect(() => {
    setCART(cart);
  }, [cart]);

  return (
    <div>
      {CART?.map((cartItem, cartindex) => {
        return (
          <div>
            <span className="tittle"> {cartItem.namaMenu} </span>
            <button
              className="tittle"
              onClick={() => {
                const _CART = CART.map((item, index) => {
                  return cartindex === index
                    ? {
                        ...item,
                        quantity: item.quantity > 0 ? item.quantity - 1 : 0,
                      }
                    : item;
                });
                setCART(_CART);
              }}
            >
              -
            </button>
            <span className="tittle"> {cartItem.quantity} </span>
            <button
              className="tittle"
              onClick={() => {
                const _CART = CART.map((item, index) => {
                  return cartindex === index
                    ? { ...item, quantity: item.quantity + 1 }
                    : item;
                });
                setCART(_CART);
              }}
            >
              +
            </button>
            <span className="tittle">
              {" "}
              Rp. {cartItem.hargaMenu * cartItem.quantity}{" "}
            </span>
          </div>
        );
      })}

      <p>
        {" "}
        <ul class="fw-bold">
          Total.
          {CART.map((item) => item.hargaMenu * item.quantity).reduce(
            (total, value) => total + value,
            0
          )}
        </ul>
      </p>
    </div>
  );
}

export default CartList;
