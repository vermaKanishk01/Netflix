import lang from '../utils/languageConstant'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
  return (
    <div className='pt-[8%] flex justify-center'>
        <form className='w-[50%] py-1 bg-black flex gap-4 items-center justify-center'>
            <input className='w-[72%] p-4 m-1 bg-white text-black rounded' type="text" placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className='py-4 px-16 rounded bg-red-600 text-white'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar