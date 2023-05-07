import "../Style/Confirmpage.css";
import styles from "../Style/Bantuanpage.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevronDown from "../Photo/chevron-down.svg";

const Bantuancomp = (props) => {
    const menus = props.menu;
    const location = useLocation();
    const { url } = location.state;
    const AccordionItem = ({ header, ...rest }) => (
        <Item
          {...rest}
          header={
            <>
              {header}
              <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
            </>
          }
          className={styles.item}
          buttonProps={{
            className: ({ isEnter }) =>
              `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
          }}
          contentProps={{ className: styles.itemContent }}
          panelProps={{ className: styles.itemPanel }}
        />
      );
  return (
    <div className="App">
    <br></br>
    <br></br>
    <div>
      <br></br>
      <div class="d-grid  col-9 mx-auto mt-6">
        <button
          type="submit"
          className="button-konfir-pesanan"
          disabled="true"
        >
          BANTUAN
        </button>
      </div>
    </div>
   <div className={styles.app}>
      <Accordion transition transitionTimeout={250}>
        <AccordionItem header="Saya tidak dapat menggunakan Cafeasy" initialEntered>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionItem>
    <br></br>

        <AccordionItem header="Terjadi kendala ketika konfirmasi pembayaran">
          Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
          erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae.
        </AccordionItem>

        <br></br>
        <AccordionItem header="Saya tidak dapat menggunakan Cafeasy">
          Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
          Fusce vulputate purus sed tempus feugiat.
        </AccordionItem>
      </Accordion>
    </div>

    <div>
        <br></br>
        <Link to={`/Berandapage/${url}`}>
        <button className="button-proses-pembayaran">Kembali</button>
        </Link>
      </div>
    </div>
  );
};

export default Bantuancomp;
