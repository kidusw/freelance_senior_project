import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import './Home.scss'
import { cards } from '../../data'
const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <Slide  cards={cards}/>
    </div>
  )
}
export default Home