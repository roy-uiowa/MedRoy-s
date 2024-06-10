import TrackPlayer, { Capability, Event, RepeatMode } from "react-native-track-player";

import { meditationTracks } from "../constants/tracks";

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrackIndex()
        isSetup = true
    } catch (error) {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.updateOptions({
            capabilites: [
                Capability.PlayFromId,
                Capability.Play,
                Capability.Pause,
            ],
            compactCapabilites: [
                Capability.PlayFromId,
                Capability.Play,
                Capability.Pause,
            ],
    })
        isSetup = true
    } finally {
        return isSetup
    }
}

export async function addTracks(tracks) {
    await TrackPlayer.add(tracks)
    await TrackPlayer.setRepeatMode(RepeatMode.Off)
}

export async function playbackService () {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })
}