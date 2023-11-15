# Youtube audio only Button - Firefox/Chrome Extension

Chrome and Firefox extension for turning off video on youtube upon a button push, and grabbing only the audio stream.

99% of the actual code comes from [Youtube Audio](https://github.com/craftwar/youtube-audio), who figured out some of the parameters to remove, which I could not actually find any official documentation on.

Was curious about how these kinds of programs worked, found one that worked pretty well so I walked myself through it and understood how most of it worked. Added a button to enable it, it's not fully fleshed out, but I'm planning on making a similar button for twitch.

It could also be possible to implement a "download" button in which the audio could be saved as a weba format audio file.

My SVG is quite ugly, most of this was me walking through how they accomplished this task and poking and prodding at it until I understood.

To do: Update the SVG

Add additional functionality to the button: Right now it's a one way button instead of a toggle

Download button: Allow user to Download the video as a .weba, we could convert this to an mp3 or something else using FFMPEG.

Add comments on what is doing what, to explain how this works.
