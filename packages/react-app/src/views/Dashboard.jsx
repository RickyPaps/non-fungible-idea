// import { Select } from "antd";
import { Card, Button, Drawer } from "antd";
import { CreateLock, UnlockVariables, LockList, Swap } from "../components/";
import React, { useState } from "react";
// import { utils } from "ethers";

import { useTokenList } from "eth-hooks/dapps/dex";
// import { Address, AddressInput, CreateLock, LockedContent, UnlockVariables } from "../components";
import { LockedContent } from "../components";

export default function Dashboard({ publicLock, price, unlock, targetNetwork, address }) {

  return (
    <div style={{ padding: 30 }}>
      {/* <Button
        type="primary"
        onClick={() => {
          setSettingsVisible(true);
        }}
      >
        Open
      </Button> */}
      <div style={{ padding: 8, marginTop: 32, margin: "auto" }}>
        <Card title="My Locks">{address ? <LockList address={address} /> : null}</Card>
        <Card title="Locked Content">
          <div style={{ padding: 8 }}>YOU NOW HAVE ACCESS TO THE LOCKED CONTENT</div>
          {/* <UnlockVariables targetNetwork={targetNetwork} /> */}
          <CreateLock price={price} unlock={unlock} />
        </Card>
      </div>
      <LockedContent
        address={address}
        publicLock={publicLock}
        targetNetwork={targetNetwork}
        price={price}
        unlock={unlock}
      />
    </div>
  );
}
