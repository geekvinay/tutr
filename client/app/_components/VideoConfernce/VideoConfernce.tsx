"use client";
// import { useEffect, useState } from "react";
// import { AgoraRTCProvider, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRTCClient, useRemoteAudioTracks, useRemoteUsers, RemoteUser, LocalVideoTrack } from "agora-rtc-react";
// import AgoraRTC from "agora-rtc-sdk-ng";

// const VideoConference = () => {
//     const client = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }) as any);
//     const [channelName, setChannelName] = useState("test");
//     const [AppID, setAppID] = useState("d6142be0ea214254ac841ca355b56927");
//     const [token, setToken] = useState('');
//     const [InCall, setInCall] = useState(false);

//     function Videos(props: { channelName: string; AppID: string; token: string; }) {
//         const { AppID, channelName, token } = props;
//         const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
//         const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
//         const remoteUsers = useRemoteUsers();
//         const { audioTracks } = useRemoteAudioTracks(remoteUsers);

//         usePublish([localMicrophoneTrack, localCameraTrack]);
//         useJoin({
//             appid: AppID,
//             channel: channelName,
//             token: token === "" ? null : token,
//         });

//         audioTracks.map((track) => track.play());
//         const deviceLoading = isLoadingMic || isLoadingCam;
//         if (deviceLoading) return <div>Loading devices...</div>;

//         return (
//             <div>
//                 <LocalVideoTrack track={localCameraTrack} play={true} />
//                 {remoteUsers.map((user) => (
//                     <RemoteUser key={1} user={user} />
//                 ))}
//             </div>
//         );
//     }

//     function Form() {
//         return (
//             <div>
//                 <p>Please enter your Agora AppID and Channel Name</p>
//                 <label htmlFor="appid">Agora App ID: </label>
//                 <input id="appid" type="text" value={AppID} onChange={(e) => setAppID(e.target.value)} placeholder="required" />
//                 <br /><br />
//                 <label htmlFor="channel">Channel Name: </label>
//                 <input id="channel" type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="required" />
//                 <br /><br />
//                 <label htmlFor="token">Channel Token: </label>
//                 <input id="token" type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="optional" />
//                 <br /><br />
//                 <button onClick={() => AppID && channelName ? setInCall(true) : alert("Please enter Agora App ID and Channel Name")}>
//                     Join
//                 </button>
//             </div>
//         );
//     }


//     return (
//         <div>
//             <h1>Agora React Videocall</h1>
//             {
//                 <AgoraRTCProvider client={client}>
//                     <Videos channelName={channelName} AppID={AppID} token={token} />
//                     <Form></Form>
//                 </AgoraRTCProvider>
//             }
//         </div>
//     );
// };

// export default VideoConference;

"use client";

import AgoraRTC, {
    AgoraRTCProvider,
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import { useEffect, useState } from "react";

function Call() {
    const client = useRTCClient(
        AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
    );

    return (
        <AgoraRTCProvider client={client}>
            <Videos channelName={"temp"} AppID={"82601215e6c84538896fb180aa485654"} />
            <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                <a
                    className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
                    href="/"
                >
                    End Call
                </a>
            </div>
        </AgoraRTCProvider>
    );
}

function Videos(props: { channelName: string; AppID: string; }) {
    const { AppID, channelName } = props;
    const { isLoading: isLoadingMic, localMicrophoneTrack } =
        useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack]);
    useJoin({
        appid: AppID,
        channel: channelName,
        token: null,
    });

    useEffect(() => {
        audioTracks.map((track) => track.play());
    });
    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading)
        return (
            <div className="flex flex-col items-center pt-40">Loading devices...</div>
        );
    const unit = "minmax(0, 1fr) ";

    return (
        <div className="flex flex-col justify-between w-full h-screen p-1">
            <div
                className={`grid  gap-1 flex-1`}
                style={{
                    gridTemplateColumns:
                        remoteUsers.length > 9
                            ? unit.repeat(4)
                            : remoteUsers.length > 4
                                ? unit.repeat(3)
                                : remoteUsers.length > 1
                                    ? unit.repeat(2)
                                    : unit,
                }}
            >
                <LocalVideoTrack
                    track={localCameraTrack}
                    play={true}
                    className="w-full h-full"
                />
                {remoteUsers.map((user) => (
                    <RemoteUser key={user.uid} user={user} />
                ))}
            </div>
        </div>
    );
}

export default Call;