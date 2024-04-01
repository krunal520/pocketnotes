import React from "react";
import styles from "./homepage.module.css";
import image from "../../assets/pocket-notes-svg.png";
import { BiSolidLock } from "react-icons/bi";
function HomePage() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
        <div>Pocket Notes</div>
        <p>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <p>
        <BiSolidLock />
        end-to-end encrypted
      </p>
    </div>
  );
}

export default HomePage;
