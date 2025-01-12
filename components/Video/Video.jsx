"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { BsFullscreen } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Video.module.css";
import images from "../../img";
import videos from "../../public/videos";

const Video = () => {
  const [playingStates, setPlayingStates] = useState({});
  const videoRefs = useRef({});
  const timeoutRef = useRef(null);

  const videoArray = [
    {
      id: 1,
      title: "Futuristic NFT World",
      description: "Explore the digital art revolution",
      thumbnail: images.thumbnail,
      videoUrl: videos.nftVideo1,
      creator: "CyberArtist",
      avatar: images.user1,
      views: "15.7K"
    },
    {
      id: 2,
      title: "Digital Art Creation",
      description: "Behind the scenes of NFT making",
      thumbnail: images.thumbnail,
      videoUrl: videos.nftVideo2,
      creator: "ArtMaster",
      avatar: images.user2,
      views: "12.3K"
    },
    {
      id: 3,
      title: "NFT Trading Guide",
      description: "Learn the basics of NFT trading",
      thumbnail: images.thumbnail,
      videoUrl: videos.nftVideo3,
      creator: "CryptoGuru",
      avatar: images.user3,
      views: "18.2K"
    }
  ];

  const handlePlayPause = useCallback(async (videoId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const videoElement = videoRefs.current[videoId];
      if (!videoElement) return;

      try {
        if (playingStates[videoId]) {
          await videoElement.pause();
        } else {
          // Pause all other videos first
          await Promise.all(
            Object.entries(videoRefs.current).map(async ([id, video]) => {
              if (id !== videoId && video) {
                try {
                  await video.pause();
                  setPlayingStates(prev => ({ ...prev, [id]: false }));
                } catch (error) {
                  console.log(`Error pausing video ${id}:`, error);
                }
              }
            })
          );

          await videoElement.play();
        }
        setPlayingStates(prev => ({ ...prev, [videoId]: !prev[videoId] }));
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Video playback was interrupted');
        } else {
          console.error('Error playing/pausing video:', error);
        }
      }
    }, 200); // 200ms debounce
  }, [playingStates]);

  const handleFullscreen = useCallback((videoId) => {
    const videoElement = videoRefs.current[videoId];
    if (!videoElement) return;

    try {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  }, []);

  return (
    <div className={Style.video}>
      <div className={Style.video_box}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎬 Featured NFT Videos
        </motion.h2>

        <div className={Style.video_box_frame}>
          {videoArray.map((item, i) => (
            <motion.div
              className={Style.video_box_frame_container}
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className={Style.video_box_frame_container_video}>
                <video
                  ref={el => videoRefs.current[item.id] = el}
                  poster={item.thumbnail}
                  className={Style.video_player}
                  playsInline
                  preload="metadata"
                  onClick={() => handlePlayPause(item.id)}
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className={Style.video_box_frame_container_info}>
                  <div className={Style.video_box_frame_container_info_profile}>
                    <Image
                      src={item.avatar}
                      alt={`${item.creator}'s profile`}
                      width={40}
                      height={40}
                      className={Style.creator_avatar}
                    />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.creator}</p>
                    </div>
                  </div>
                  <p className={Style.views}>{item.views} views</p>
                </div>

                <div className={Style.video_controls}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause(item.id);
                    }} 
                    className={Style.play_button}
                  >
                    {playingStates[item.id] ? <TbPlayerPause /> : <TbPlayerPlay />}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFullscreen(item.id);
                    }} 
                    className={Style.fullscreen_button}
                  >
                    <BsFullscreen />
                  </button>
                </div>
              </div>
              <p className={Style.video_description}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;