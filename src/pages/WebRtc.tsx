import React, { useEffect, useRef } from "react";

const WebRtc: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const startWebRTC = async () => {
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Attach remote stream to video element
      pc.ontrack = (event: RTCTrackEvent) => {
        if (videoRef.current && event.streams.length > 0) {
          console.log("event =>", event);
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // ✅ Correct WebRTC signaling flow
      //   const offer = await pc.createOffer();
      //   await pc.setLocalDescription(offer);

      const offerResponse = await fetch("http://127.0.0.1:5004/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdp: pc.localDescription?.sdp,
          type: pc.localDescription?.type,
        }),
      });

      const offer = await offerResponse.json();
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
    };

    startWebRTC();

    return () => {
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h2>Live Stream (WebRTC)</h2>
      <video ref={videoRef} autoPlay playsInline width="800" />
      {/* <div style={{ width: "600px", height: "300px" }}>
        <iframe
          src="http://127.0.0.1:5004/"
          style={{ width: "600px", height: "300px", border: "none" }}
          allow="camera; microphone" // Required if the embedded page uses media
          title="Live Stream"
        />
      </div> */}

      <div>
        <h2>Live Stream</h2>
        <img
          src="http://127.0.0.1:5004/video_feed"
          alt="Live Stream"
          width="800"
        />
      </div>
    </div>
  );
};

export default WebRtc;

// import React, { useEffect, useRef, useState } from "react";

// const WebRtc = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null); // Reference for video element
//   const pcRef = useRef(new RTCPeerConnection()); // WebRTC PeerConnection reference
//   const [error, setError] = useState<string | null>(null); // State to handle errors

//   useEffect(() => {
//     const createOffer = async () => {
//       try {
//         // Send offer to Flask server
//         const offerResponse = await fetch("http://localhost:5004/offer", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             sdp: "", // Offer (empty initially)
//             type: "offer",
//           }),
//         });

//         if (!offerResponse.ok) {
//           throw new Error(
//             `Failed to get SDP offer: ${offerResponse.statusText}`
//           );
//         }

//         const offer = await offerResponse.json();
//         console.log("Received offer response:", offer);

//         // Set the remote description (received offer)
//         await pcRef.current.setRemoteDescription(
//           new RTCSessionDescription(offer)
//         );

//         // Create an answer and set it as the local description
//         const answer = await pcRef.current.createAnswer();
//         await pcRef.current.setLocalDescription(answer);
//       } catch (error: any) {
//         // Handle any errors in the offer-answer process
//         console.error("Error during WebRTC offer creation:", error);
//         setError(`Error: ${error?.message}`);
//       }
//     };

//     // Handle the incoming video track and attach it to videoRef
//     pcRef.current.ontrack = (event) => {
//       if (event.track.kind === "video") {
//         if (videoRef.current) {
//           videoRef.current.srcObject = event.streams[0];
//         }
//       }
//     };

//     // Start the offer creation process
//     createOffer();

//     // Cleanup when component is unmounted
//     return () => {
//       pcRef.current.close(); // Close the peer connection
//     };
//   }, []);

//   return (
//     <div>
//       <h1>WebRTC Video Stream</h1>
//       {error && <div style={{ color: "red" }}>Error: {error}</div>}{" "}
//       {/* Show any errors */}
//       <video ref={videoRef} autoPlay muted /> {/* Display the video stream */}
//     </div>
//   );
// };

// export default WebRtc;

// import { useEffect, useRef } from "react";

// const WebRtc = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null); // To reference the video element
//   const pcRef = useRef(new RTCPeerConnection()); // To store the RTCPeerConnection

//   useEffect(() => {
//     console.log("hit api");
//     // Function to create an offer
//     const createOffer = async () => {
//       try {
//         // Fetch the offer from the server (Flask)
//         const offerResponse = await fetch("http://127.0.0.1:5003/offer", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ sdp: "", type: "offer" }),
//         });

//         const offer = await offerResponse.json();
//         await pcRef.current.setRemoteDescription(
//           new RTCSessionDescription(offer)
//         );

//         const answer = await pcRef.current.createAnswer();
//         await pcRef.current.setLocalDescription(answer);
//       } catch (error) {
//         console.log("error =>", error);
//       }
//     };

//     // When a track is added to the peer connection, set it as the video stream source
//     pcRef.current.ontrack = (event) => {
//       if (event.track.kind === "video") {
//         if (videoRef.current) {
//           videoRef.current.srcObject = event.streams[0];
//         }
//       }
//     };

//     // Start the offer process
//     createOffer();

//     return () => {
//       pcRef.current.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>WebRTC Video Stream</h1>
//       <video ref={videoRef} autoPlay muted />
//     </div>
//   );
// };

// export default WebRtc;
