import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import { SwiperSlide } from 'swiper/react'
import CatCard from '../../components/catCard/CatCard'
import './Home.scss'
import { cards } from '../../data'
const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <Slide>
      {cards.length !== 0 ?
            cards.map((card) => (
              <SwiperSlide key={card.id}>
                <CatCard
                  title={card.title}
                  desc={card.desc}
                  img={card.img}
                />
              </SwiperSlide>
            )): <h1>cool</h1>}
      </Slide>
    </div>
  )
}
export default Home