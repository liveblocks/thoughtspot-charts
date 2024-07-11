"use client";

import styles from "./Header.module.css";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { InboxPopover } from "./InboxPopover";

const AVATAR_SIZE = 36;

export function Header() {
  const others = useOthers();
  const self = useSelf();

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div className={styles.headerRight}>
          {others.map((other) => (
            <img
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              alt={other.info.name}
              src={other.info.avatar}
              className={styles.avatar}
              draggable={false}
            />
          ))}
          <img
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            alt={self.info.name}
            src={self.info.avatar}
            className={styles.avatar}
            draggable={false}
          />
          <InboxPopover />
        </div>
      </header>
      <div className={styles.title}>
        <h1>Analytics</h1>
      </div>
    </>
  );
}

function Logo() {
  return (
    <svg
      height={30}
      width={30}
      version="1.1"
      x="0px"
      y="0px"
      viewBox="147 -51.7 215 214.7"
      fill="white"
    >
      <g id="BG"></g>
      <g id="Art">
        <g>
          <g>
            <circle cx="335.2" cy="136.3" r="26.8"></circle>
            <polygon
              points="360.1,1.6 147,1.6 147,15 220.2,15 220.2,161.4 233.6,161.4 233.6,15 247,15 247,161.4 260.1,161.4 260.1,15
        273.5,15 273.5,161.4 286.9,161.4 286.9,15 360.1,15 			"
            ></polygon>
            <rect x="147" y="-24.9" width="213.1" height="13.4"></rect>
            <rect x="147" y="-51.7" width="213.1" height="13.4"></rect>
          </g>
        </g>
      </g>
    </svg>
  );
}
