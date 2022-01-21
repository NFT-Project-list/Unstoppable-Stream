
import ReactPlayer from "react-player";

import { AiOutlineCopy } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

//import ShakaPlayer from "shaka-player-react";

import CeramicClient from "@ceramicnetwork/http-client";
//import ShakaPlayer from "shaka-player-react";

//import { Blob } from "nft.storage";
//import { NFTStorage } from "nft.storage";

import Livepeer from "livepeer-nodejs";
 
export default function Stream() {
    const Livepeer_apiKey = "b2172553-2098-4b0c-b679-3dffba1409c8";
  
  // const ShakaPlayer = dynamic(() => import("shaka-player-react"), {
  //   ssr: false,
  // });
  const livepeerObject = new Livepeer("b2172553-2098-4b0c-b679-3dffba1409c8");
  const [data, setData] = useState(null);
  const [stream, setStream] = useState(null);
  const [show, setShow] = useState(false);
  // eslint-disable-next-line 
  const [streamlog, setStreamLog] = useState();
  const [nftName, setNftName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const [nftUrl, setNftUrl] = useState("");

  const [covData, setCovData] = useState(null);
// eslint-disable-next-line 
  const [ceramicStream, setCeramicStream] = useState(null);

  const content = {
    name: "test_stream",
    profiles: [
      {
        name: "720p",
        bitrate: 2000000,
        fps: 30,
        width: 1280,
        height: 720,
      },
      {
        name: "480p",
        bitrate: 1000000,
        fps: 30,
        width: 854,
        height: 480,
      },
      {
        name: "360p",
        bitrate: 500000,
        fps: 30,
        width: 640,
        height: 360,
      },
    ],
    record: true,
  };
  const startStream = () => {
    livepeerObject.Stream.create(content).then((res) => {
      console.log("stream started");
      setData(res);
      setShow(true);
    });
  };

  const getStreamUrl = async () => {
    const url = `https://livepeer.com/api/session?limit=20&parentId=${data.id}`;
    console.log(data.id);

    const streamLists = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${Livepeer_apiKey}`,
      },
    });
    setTimeout(function () {
      setStreamLog(data.playbackId);
      console.log(data.playbackId);
    }, 5000);
    if (streamLists.data.length === 0) {
      alert("No stream detected");
      return;
    }

    setStream(streamLists.data[0].mp4Url);

    // setStreamLog(streamLists.data[0].playbackId);
    setStreamLog(streamLists.data[0]);
    if (stream === "") alert("stream is currently processing to be streamed");
  };

  const mintStream = async (e) => {
    e.preventDefault();
    if (stream === "") {
      alert("Stream is currently trying ");
      return;
    }
    if (stream === null) {
      alert("No stream detected");
      return;
    }

    alert("Stream is currently being minted ");

    const PortApiKey = "af6d4865-bd49-453f-8f44-5d3d49448b93";
    const mintUrl = "https://api.nftport.xyz/v0/mints/easy/urls";
    const body = {
      chain: "rinkeby",
      name: nftName,
      description: description,
      file_url: stream,
      mint_to_address: address,
    };
    const auth = {
      headers: {
        Authorization: PortApiKey,
      },
    };

    const res = await axios.post(mintUrl, body, auth);
    console.log(stream);

    if (res.status === 200) {
      alert("Successfully minted stream, yeeaah you have an NFT");

      // setNftName("");
      //  setDescription("");
      //  setAddress("");
      setNftUrl(res.data.transaction_external_url);
      

    /*  const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
      });

      await client.storeBlob(
        new Blob([
          {
            chain: res.data.chain,
            contract_address: res.data.contract_address,
            transaction_hash: res.data.transaction_hash,
            description: res.data.description,
            address: res.data.mint_to_address,
          },
        ])
      );
*/
      const covalent =
        "https://api.covalenthq.com/v1/1/address/" +
        address +
        "/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=" +
        process.env.NEXT_PUBLIC_COVALENT_API;
      const covalentRes = await axios.get(covalent);
      setCovData(covalentRes.data.data);
    } else {
      alert("Error with minting of the stream");
    }
  };
  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(covData));
  };
  // eslint-disable-next-line 
  const Ceramic = async () => {
    const API_URL = "https://gateway-clay.ceramic.network";
    const ceramic = new CeramicClient(API_URL);
    // eslint-disable-next-line 
    const stream = await ceramic.loadStream(ceramicStream);
  };
  return(
<>

<div className="grid place-items-center h-screen">
                  <div className="flex flex-row m-3 text-2xl">
                    Stream url: &nbsp;{" "}
                    {stream !== "" && stream !== null ? (
                      <b>
                        {stream}
                        <AiOutlineCopy
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(stream);
                          }}
                        />
                      </b>
                    ) : stream === "" ? (
                      <b className=" text-2xl">stream currently processing</b>
                    ) : (
                      <b className=" text-2xl">No streams created</b>
                    )}
                  </div>

                  {/*https://www.youtube.com/watch?v=ECKyIeiSBT4     test url */}
                  <button
                  style={{ backgroundImage: 'linear-gradient(to right,#3f50b5,#cf2a7b)' }}
                    className="rounded  bg-blue-500 py-2 px-8 text-white m-13"
                    onClick={startStream}
                  >
                    Stream Video
                  </button>
                  {data ? (
                    <div className="m-3">
                      <p className="flex flex-row text-2xl">
                        stream key: {data.streamKey} &nbsp;
                        <AiOutlineCopy
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(data.streamKey);
                          }}
                        />
                      </p>
                      <p className="flex flex-row text-2xl">
                        server: rtmp://rtmp.livepeer.com/live &nbsp;
                        <AiOutlineCopy
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "rtmp://rtmp.livepeer.com/live"
                            );
                          }}
                        />
                      </p>{" "}
                      <p className=" text-2xl">
                        ☝️ Input the above in a streaming software like OBS
                      </p>
                      <p className="text-xl">
                        - If you are finding things difficult check the docs{" "}
                        <a
                        rel="noreferrer"
                          href="https://www.techadvisor.com/how-to/game/use-obs-to-live-stream-3676910/"
                          target="_blank"
                        >
                          here
                        </a>
                      </p>
                      <p className="flex flex-row text-2xl mb-2 mt-2">
                        <p>lounge METAVERSE key: &nbsp;</p>{" "}
                        https://cdn.livepeer.com/hls/
                        {data.playbackId}/index.m3u8
                        <>&nbsp;</>
                        <AiOutlineCopy
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `https://cdn.livepeer.com/hls/${data.playbackId}/index.m3u8`
                            );
                          }}
                        />
                      </p>
                      <p className="text-xl">
                        {" "}
                        - Put The above in the lounge METAVERSE to stream 👆{" "}
                      </p>
                    </div>
                  ) : null}
                  {show ? (
                    <>
                      <button
                      style={{ backgroundImage: 'linear-gradient(to right,#3f50b5,#cf2a7b)' }}
                        className="rounded bg-blue-500 py-2 px-8 text-white m-13"
                        onClick={getStreamUrl}
                      >
                        Play Stream
                      </button>
                      <br />
                    </>
                  ) : null}

                  <div className="m-3 video-container">
                    {stream !== "" && stream != null ? (
                      <>
                        <br />

                        <ReactPlayer controls url={`https://cdn.livepeer.com/hls/${data.playbackId}/index.m3u8`} playing={true} />                      
                        <br />
                        <a
                        rel="noreferrer"
                          href={stream}
                          className="rounded bg-blue-500 py-2 px-8 text-white m-13"
                          target="_blank"
                        >
                          {" "}
                          Download Stream
                        </a>
                        <br />
                      </>
                    ) : (
                      <h3 className="text-2xl">video will appear here </h3>
                    )}
                  </div>

                  {nftUrl !== "" ? (
                    <>
                      <br />
                      <a
                      rel="noreferrer"
                        href={nftUrl}
                        className="rounded m-3 bg-blue-500 py-2 px-8 text-white m-13"
                        target="_blank"
                      >
                        View NFT
                      </a>
                    </>
                  ) : null}

                  <br />
                  <br />
                  <form>
                    <input
                      className="mt-1 border rounded p-3"
                      value={nftName}
                      type="text"
                      placeholder="Name of NFT"
                      onChange={(e) => setNftName(e.target.value)}
                      name="nftName"
                      required
                    />
                    <input
                      className="mt-1 border rounded p-3"
                      value={description}
                      type="text"
                      placeholder="Description of NFT"
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      required
                    />
                    <input
                      className="mt-1 border rounded p-3"
                      value={address}
                      type="text"
                      placeholder="Wallet Address"
                      onChange={(e) => setAddress(e.target.value)}
                      name="address"
                      required
                    />
                    <button
                    style={{ backgroundImage: 'linear-gradient(to right,#3f50b5,#cf2a7b)' }}
                      className="rounded bg-blue-600 py-2 px-12 text-white m-16"
                      onClick={mintStream}
                    >
                      Mint Video
                    </button>
                  </form>
                  {covData !== null ? (
                    <h1 className=" text-2xl">Data 👇</h1>
                  ) : null}

                  <h1 className=" mt-1 mb-7">
                    {" "}
                    {covData !== null ? <p>{JSON.stringify(covData)}</p> : null}
                  </h1>
                  {covData !== null ? (
                    <button
 style={{ backgroundImage: 'linear-gradient(to right,#3f50b5,#cf2a7b)' }}
                      className="rounded bg-blue-500 py-2 px-8 text-white m-13"
                      onClick={() => copyData()}
                    >
                      Copy Data
                    </button>
                  ) : null}
                  {/*   <div>{streamLists.data}</div> */}
                </div>
</>

  )
}