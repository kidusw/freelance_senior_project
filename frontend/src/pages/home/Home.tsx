import Featured from '../../components/featured/Featured'
import Features from '../../components/Features'
import Slide from '../../components/slide/Slide'
import './Home.scss'
import { cards } from '../../data'
const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <Slide  cards={cards}/>
      <Features />
    </div>
  )
}
export default Home