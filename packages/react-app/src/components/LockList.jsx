import { Web3Service } from "@unlock-protocol/unlock-js";
import { SubgraphService } from "@unlock-protocol/unlock-js";
import { QueriesOptions, useQueries, useQuery } from "@tanstack/react-query";
import { Card, Drawer } from "antd";
// import { gql, useQuery } from "@apollo/client";
import { NETWORKS } from "../constants";
import { useState, useEffect } from "react";

const LocksByNetwork = ({ isLoading, locks, selectedItem, setDrawer }) => {
  // const networks = NETWORKS;
  // const { name: networkName } = networks[network];
  // let networkArr = Object.keys(networks).map(k => networks[k]);
  // debugger;

  console.log("lock data for displaying: ", locks);

  return (
    // <div className="w-full">
    //   <div>
    //     <div className="flex flex-col gap-2">
    //       <div className="flex items-center justify-between w-full outline-none ring-0">
    //         <h2 className="text-lg font-bold text-brand-ui-primary">{networkName}</h2>
    //         <div className="fill-brand-ui-primary" size={24} />
    //       </div>
    //       <div>
    //         <div className="flex flex-col gap-6">
    //           {locks?.map((lock, index) => (
    //             <>
    //               {/* <LockCard key={index} lock={lock} network={network} /> */}
    //               <div>{lock.id}</div>
    //               <div>{lock.network}</div>
    //             </>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {locks?.map((lock, index) => (
        <>
          <div
            key={index}
            className="lock-card site-card-border-less-wrapper"
            style={{ margin: "5px", padding: "5px" }}
          >
            <Card
              title={lock.name}
              bordered={true}
              onClick={() => {
                selectedItem(index);
                setDrawer(true);
              }}
            >
              <p>{lock.id}</p>
              <p>{lock.network}</p>
            </Card>
          </div>
        </>
      ))}
    </div>
  );
};

const GetLocksByNetwork = async address => {
  // debugger;
  // const service = new SubgraphService();
  // return await service.locks(
  //   {
  //     first: 1000,
  //     where: {
  //       lockManagers_contains: [address.address],
  //     },
  //     orderBy: "createdAtBlock",
  //     orderDirection: "desc",
  //   },
  //   {
  //     networks: network,
  //   },
  // );
  const service = new SubgraphService();
  const locksOnMainnetAndGoerli = await service.locks({
    first: 100,
    where: { lockManagers_contains: [address.address] },
  });
  // setisLoading(true);
  // const locksOnAllNetworks = await service.locks({ first: 1000 });
  return locksOnMainnetAndGoerli;
};

const LockList = address => {
  // const { networks } = useConfig();
  const projectNetworks = NETWORKS;
  const [locks, setlocks] = useState(undefined);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  // const [isLoading, setisLoading] = useState(false);

  // if (isLoading) return <LocksByNetworkPlaceholder />
  if (locks?.length === 0) return null;

  useEffect(() => {
    if (address && locks === undefined && address.address !== undefined) {
      GetLocksByNetwork(address).then(data => {
        // console.log("locks: ", data);
        setlocks(data);
        // setisLoading(false);
      });
    }
  }, [address]);

  // const networkItems =
  //   Object.entries(projectNetworks ?? {})
  //     // ignore localhost
  //     .filter(([network]) => network !== "31337") ?? [];

  //   debugger;

  // const queries = networkItems.map(([network]) => {
  //   const lockName = projectNetworks[network]?.name;
  //   if (address && network) {
  //     const service = new SubgraphService();
  //     return {
  //       queryKey: ["getLocks", network, address],
  //       queryFn: service.locks(
  //         {
  //           first: 1000,
  //           where: {
  //             lockManagers_contains: [address],
  //           },
  //           orderBy: "createdAtBlock",
  //           orderDirection: "desc",
  //         },
  //         {
  //           networks: [network],
  //         },
  //       ),
  //       refetchInterval: false,
  //       onError: () => {
  //         console.log(`Can't load locks from ${lockName} network.`);
  //       },
  //     };
  //   }
  // });

  //   const { loading, data } = useQuery(queries, { pollInterval: 2500 });
  //   console.log("LOCKS: ", data);

  // const newQuery = queries[8];

  //   const results = useQueries({
  //     newQuery,
  //   });

  // const result = useQuery({ newQuery });

  // console.log("LOCKS: ", result);

  //   const isLoading = result?.some(({ isLoading }) => isLoading);

  const isLoading = locks ? true : false;

  return (
    <>
      {locks ? (
        <div>
          <Drawer
            visible={settingsVisible}
            onClose={() => {
              setSettingsVisible(false);
            }}
            width={500}
          >
            <p>{locks[selectedItem].id}</p>
            <p>{locks[selectedItem].network}</p>
          </Drawer>

          <div className="grid gap-20">
            {/* {locks
        ? networkItems.map(([network], index) => {
            const locksByNetwork = locks || [];
            return <LocksByNetwork isLoading={isLoading} key={network} network={network} locks={locksByNetwork} />;
          })
        : null} */}
            <LocksByNetwork isLoading={isLoading} locks={locks} selectedItem={setSelectedItem} setDrawer={setSettingsVisible}/>
          </div>
        </div>
      ) : null}
    </>
  );

  // await retrieveLocks(Web3Service, address, addToLocks, setLoading, network);
};

export default LockList;
