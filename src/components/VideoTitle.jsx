const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute z-1 w-screen aspect-video pt-56 px-20 bg-linear-to-r from-black/80'>
        <h1 className='text-6xl font-bold text-white'>{title}</h1>
        <p className='py-6 text-lg w-1/4 text-white'>{overview}</p>
        <div className='flex gap-2'>
            <button className='bg-white text-black text-lg p-4 px-12 rounded'>  ▶︎ Play</button>
            <button className='bg-gray-500/50 text-white text-lg p-4 px-12 rounded'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;