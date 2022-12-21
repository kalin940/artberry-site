import { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import wallpaper from '../styles/wallpaper.png';
import logo from '../styles/air_artbbery_m.png';
import dj from '../styles/dj.jpg';
import phone from '../styles/phone.png';
import clients from '../styles/clients.png';
import './Home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import client1 from '../styles/logo_ores.jpg';
import client2 from '../styles/logo_CERACRYL.png';
import client3 from '../styles/logo_CG.png';
import client4 from '../styles/logo_everart.png';
import client5 from '../styles/logo_MA.png';
import client6 from '../styles/logo_PDS.png';
import Footer from '../components/Footer';
import * as utilsService from '../services/UtilsService';

const Home = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    document.removeEventListener('contextmenu', utilsService.handelRightClick);
  }, []);


  const logoClick = () => {
    navigate('../', { replace: true })
  }

  return (
    <div className='home-page'>
     
    
      <div className='home-header' style={{ backgroundImage: `url(${process.env.PUBLIC_URL + wallpaper})` }}>
   
        <div className='home-menu'>
          <div className='home-menu-top'>
            <div className='home-menu-left'>
              <a href="mailto:air@artberry.eu">air@artberry.eu</a>|<a href="tel:+359893383999">+359 893 383 999</a>

            </div>

          </div>
          <div className='home-menu-bottom'>
            <img src={logo} alt="logo" className='logo-left' onClick={logoClick} />
            <div className='home-menu-right'>
              <Link to="../">Начало</Link> <Link to="/music">Слушай</Link>
            </div>
          </div>
        </div>

        <div className='header-title'>ARTBERRY</div>
        <div className='header-sub-title'>Разликата е в музиката!</div>
      </div>
      <div className='home-title'>
        <div className='home-main-text'>
          <div className='small-title'>РАЗЛИКАТА Е В МУЗИКАТА</div>
          <div className='large-title'>ARTBERRY MUSIC</div>
        </div>
        <div className='home-sub-titles'>
          <div className='home-title-left'>
            <div className='small-title-bot'>Музиката</div>
            <div className='large-info'>Специално подбрани плейлисти от професионалисти с над 20 годишен опит.</div>
          </div>
          <div className='home-title-mid'>
            <div className='small-title-bot'>Без реклами</div>
            <div className='large-info info-mid'>Липса на реклами и ненужни коментари</div>
          </div>
          <div className='home-title-right'>
            <div className='small-title-bot'>Атмосфера</div>
            <div className='large-info'>Еднакво ниво на музиката през цялото време. 24 часа без прекъсване.</div>
          </div>
        </div>
      </div>
      <div className='info-div'>
        <img src={dj} alt="img" className='info-img' />
        <div className='info-txt'>
          <div className='info-small-title'>РАЗЛИКАТА Е В МУЗИКАТА</div>
          <div className='info-large-title'>КАКВО Е ARTBERRY MUSIC</div>
          <div className='info-small-text'>Точната музика е много важен фактор за добрата работа на Вашия обект. Правилната музика работи подсъзнателно и създава предпоставки клиентът да се чувства добре, което води коствено до увеличаването на оборота на обекта. Многодишната работа на нашия екип ни дава възможност да създадем този музикален канал така, че срещу минимално заплащане нашите специалсти диджеи и музикални редактори ще Ви предоставят невероятна музикална атмосфера без реклами и ненужни коментари. Предлагаме и възможност за индивидуално излъчване и добавяне на промоции, Ваши реклами и друг вид корпоративна информация. Има възможност и за свързване между Вашите обекти.</div>
        </div>
      </div>
      <div className='info-txt-hidden'>
          <div className='info-small-title'>РАЗЛИКАТА Е В МУЗИКАТА</div>
          <div className='info-large-title'>КАКВО Е ARTBERRY MUSIC</div>
          <div className='info-small-text'>Точната музика е много важен фактор за добрата работа на Вашия обект. Правилната музика работи подсъзнателно и създава предпоставки клиентът да се чувства добре, което води коствено до увеличаването на оборота на обекта. Многодишната работа на нашия екип ни дава възможност да създадем този музикален канал така, че срещу минимално заплащане нашите специалсти диджеи и музикални редактори ще Ви предоставят невероятна музикална атмосфера без реклами и ненужни коментари. Предлагаме и възможност за индивидуално излъчване и добавяне на промоции, Ваши реклами и друг вид корпоративна информация. Има възможност и за свързване между Вашите обекти.</div>
      </div>
      <div className='phone-div'>        
        <div className='phone-info'>
          <div className='phone-small-title'>РАЗЛИКАТА Е В МУЗИКАТА</div>
          <div className='phone-title'>Фонова музика за бар, кафе,
            ресторант, магазин, фитнес зала, хотел.</div>
          <ul className='phone-list'>
            <li>Професионално подготвени музикални плейлисти.</li>
            <li>Ежедневно обновяване на плейлистите.</li>
            <li>Музиката е съобразена с темптото на деня.</li>
            <li>Еднакво ниво на музиката през цялото време</li>
            <li>Няма реклами</li>
          </ul>
          <br />
          <a className='home-link-brown'>МУЗИКАЛНА СЕЛЕКЦИЯ, КОЯТО НЕ МОЖЕМ ДА ОПИШЕМ, ПРОСТО СЛУШАЙТЕ...</a>
        </div>
        <img src={phone} alt="img" className='phone-img' />
      </div>

      <div className='subscriptions'>
          <div className='phone-small-title'>РАЗЛИКАТА Е В МУЗИКАТА</div>
          <div className='phone-title'>Ценови планове</div>
          <div className='prices-div'>
             <div className='subscription'>
                  <h6 class="h6-title">AIR ARTBERRY</h6>
                  <span className='duration-span'>МЕСЕЦ</span>
                  <br/>
                  <span className='price-span'>BGN 39</span>
                  <div className='subscription-info'>
                  1 акаунт
За всеки следващ акаунт се доплаща 30лв. месечно.

Получавате online достъп до ARTBERRY музикален канал за един месец.

*Необходима е интернет връзка Wifi, Lan мрежа или 4G модем.
                  </div>
             </div>
             <div className='subscription'>
                  <h6 class="h6-title">AIR ARTBERRY 12</h6>
                  <span className='duration-span'>ГОДИНА</span>
                  <br/>
                  <span className='price-span'>BGN 429</span>
                  <div className='subscription-info'>
                  1 акаунт  – 12 месеца
За всеки следващ акаунт се доплаща 330лв годишно.

Получавате online достъп до ARTBERRY музикален канал за една година.

*Необходима е интернет връзка Wifi, Lan мрежа или 4G модем.
                  </div>
             </div>
             <div className='subscription'>
                  <h6 class="h6-title">ARTBERRY MUSIC BOX</h6>
                  <span className='duration-span'>ГОДИНА</span>
                  <br/>
                  <span className='price-span'>BGN 429+250</span>
                  <div className='subscription-info'>
                  1 акаунт
За всеки следващ акаунт се доплаща 330лв. Получавате online достъп до ARTBERRY музикален канал за една година чрез ARTBERRY MUSIC BOX. Устройството е на стойност 250лв. и се заплаща еднократно за всеки акаунт.
*Необходима е интернет връзка Wifi, Lan мрежа или 4G модем.
                  </div>
             </div>
          </div>
      </div>

       <div className='feedback' style={{paddingBottom:'1%', paddingTop:'5%'}}>
           {/* <img src={clients} alt="feedback" className='clients-img'/> */}
          
           <div style={{marginBottom:'3%'}}>
              <div className='info-large-title' style={{marginBottom:'2%', color:'black'}}>“Идеалното решение за музикално оформление, подходящо за всички наши обекти.”</div>
              <div className='info-large-title' style={{color:'black'}}>Десислава Фераджиева</div>
              <div className='phone-small-title'> 
                СОБСТВЕНИК НА HOMECARE HOTELS
              </div>
            </div>
          
           <div style={{marginBottom:'3%'}}>
              <div className='info-large-title' style={{marginBottom:'2%', color:'black'}}>“Точната музика за всеки момент от деня.”</div>
              <div className='info-large-title' style={{color:'black'}}>Илия Стоев</div>
              <div className='phone-small-title'> 
                 СОБСТВЕНИК НА РЕСТОРАНТ ТОЦИНИ
              </div>
            </div>

            <div style={{marginBottom:'3%'}}>
              <div className='info-large-title' style={{marginBottom:'2%', color:'black'}}>“Богата селекция на музика без реклами.”</div>
              <div className='info-large-title' style={{color:'black'}}>Емилия Петкова</div>
                <div className='phone-small-title'> 
              УПРАВИТЕЛ НА ЗАВЕДЕНИЯ
              </div>
            </div>
           
      </div> 

      <div className='clients'>
              <Carousel autoPlay={true} infiniteLoop={true} >
                <div>
                    
                    <img src={client1} alt="carosel" className='carosel-img'/>
                </div>
                <div>
                    <img src={client2} alt="carosel" className='carosel-img'/>
                </div>
                <div>
                    <img src={client3} alt="carosel" className='carosel-img'/>
                </div>
                <div>
                    <img src={client4} alt="carosel" className='carosel-img'/>
                </div>
                <div>
                    <img src={client5} alt="carosel" className='carosel-img'/>
                </div>
                <div>
                    <img src={client6} alt="carosel" className='carosel-img'/>
                </div>
            </Carousel>
      </div>


     <Footer/>
    </div>
  );
};

export default Home;